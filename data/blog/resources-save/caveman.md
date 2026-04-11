---
title: caveman
date: '2026-04-11'
tags: ['resources-save']
draft: false
summary: '一个通过约束 LLM 表达方式来压缩输出与上下文 token 的 AI agent 插件，核心是语言冗余压缩、结构保留校验与三臂对照评测。'
---

<TOCInlineWithSticky toc={props.toc} />

## 项目链接

- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)
- [caveman README](https://github.com/JuliusBrussee/caveman/blob/main/README.md)
- [caveman-compress README](https://github.com/JuliusBrussee/caveman/blob/main/caveman-compress/README.md)
- [Brevity Constraints Reverse Performance Hierarchies in Language Models](https://arxiv.org/abs/2604.00025)

## 这是做什么的

`caveman` 本质上不是传统算法库，而是一个给 AI 编程代理使用的“语言压缩插件 / 技能包”。

它主要做两件事：

1. 让代理用更短的方式回答问题  
   删除大量不承载技术信息的自然语言冗余，比如冠词、客套话、缓冲词、重复解释，只保留关键技术判断、因果和下一步动作。

2. 压缩代理每次会自动读取的上下文文件  
   比如 `CLAUDE.md`、todo、偏好说明等自然语言记忆文件，把内容改写成更高信息密度的版本，同时保留 `.original.md` 备份，降低每次会话启动时的 token 成本。

项目目标不是让模型“想得更少”，而是让模型“说得更短、读得更省”。

## 背后的核心机制

### 1. 输出压缩

仓库中的 `skills/caveman/SKILL.md` 通过系统提示约束模型的表达方式，核心规则包括：

- 删除 filler words、pleasantries、hedging
- 尽量去掉冠词与冗余连接词
- 允许短句和片段式表达
- 技术术语必须准确保留
- 代码块和精确错误文本不改写

它本质上是把“高信息密度表达”固化成一个稳定的输出协议。

### 2. 上下文压缩

`caveman-compress` 会把自然语言文档交给 LLM 改写，再用本地脚本验证压缩结果是否破坏了关键信息。

整体流程大致是：

1. 检测文件是否属于自然语言文档，而不是代码或配置
2. 调用 Claude / Anthropic API 做一次压缩改写
3. 用本地 Python 校验 headings、code blocks、URLs、paths、bullets
4. 若校验失败，只把错误项反馈给模型做定向修补
5. 成功后写回压缩版，并保留 `.original.md` 备份

这不是“纯 prompt 技巧”，而是“LLM 改写 + 确定性规则校验”的工程化组合。

## 背后的算法原则

### 语言冗余压缩

很多技术回答里的 token 实际不承载核心信息，只是在模拟自然对话习惯，例如：

- `sure / happy to help`
- `probably / likely / basically`
- 冠词 `a / an / the`
- 为了显得自然的重复转述

`caveman` 的第一原则，就是只压缩这部分“表达冗余”，而尽量不碰“技术语义”。

### 语义不变，形式变短

它强调压缩的是表述，不是约束本身。以下内容被视为高风险结构，原则上必须原样保留：

- code block
- inline code
- URL
- 标题
- 文件路径
- 命令
- 技术术语
- 日期、版本号、数值

这对应的是一种很典型的信息压缩思路：  
优先压缩自然语言层的冗余，避免压缩结构化、可执行、可引用的信息单元。

### 生成式压缩 + 规则兜底

项目没有试图只靠正则或手工规则来压缩，因为自然语言改写本身适合交给 LLM。

但它也没有完全信任 LLM 输出，而是在后面加了一层确定性校验，检查：

- heading 数量和顺序
- fenced code block 是否完全一致
- URL 是否有缺失或新增
- 路径是否变化
- bullet 数量变化是否过大

这背后体现的是一个很实用的工程原则：

> 生成模型负责“变短”，规则系统负责“别弄坏”。

### 用正确对照组评测

项目的评测不是简单比较：

- 普通回答
- caveman 回答

而是三臂对照：

1. `baseline`：不加任何系统提示
2. `terse`：只加 `Answer concisely.`
3. `terse + skill`：在简洁回答基础上再叠加 caveman 规则

这样测出来的，是 caveman 相对“普通简洁回答”额外提供了多少压缩收益，而不是把“请简洁一点”这种通用提示的收益也算进来。

这个实验设计比常见的营销式 benchmark 更可信。

## 为什么这个思路有效

### 对 AI agent 来说，信息密度通常比自然口语更重要

人写给人的文本经常追求自然、礼貌、顺滑。

但 agent 场景里，很多时候更重要的是：

- 快速读到结论
- 保留技术判断
- 降低上下文占用
- 减少无效输出

因此，“更像电报”未必更差，很多时候反而更适合开发工作流。

### 简洁约束未必损害准确率

仓库引用了一篇 2026-03-11 提交到 arXiv 的论文：[Brevity Constraints Reverse Performance Hierarchies in Language Models](https://arxiv.org/abs/2604.00025)。

论文的核心观察是：在某些任务上，对模型施加简洁约束，不只是减少 token，还可能提升正确率。作者甚至提到在部分 benchmark 上出现了性能排序反转。

无论这个结论未来是否会被进一步修正，它至少支持了一个方向：  
**更长的回答并不天然代表更好的回答。**

## 我的理解

如果用一句话总结，这个项目是在工程上系统化地实践：

> 保持技术语义不变，尽可能提高每个 token 的信息密度。

它依赖的不是复杂新算法，而是几个非常朴素但有效的原则：

- 技术回答里存在大量可压缩的语言冗余
- 高风险结构必须单独保护
- LLM 适合做自然语言重写
- 规则校验适合做结果兜底
- 评测时应该把“普通简洁回答”当作基线

## 适合关注的场景

- AI coding agent 的 system prompt / skill 设计
- 长期加载的项目记忆文件压缩
- 提高代码审查、故障排查、命令建议的输出密度
- 在成本、速度、可读性之间寻找更高性价比的交互风格

## 补充备注

这个项目更接近“prompt protocol + 压缩工作流”而不是“新模型算法”。

如果后续我自己要借鉴它，最值得抄的不是“caveman”这个风格本身，而是下面这套方法论：

- 先定义什么能删、什么绝不能动
- 用 LLM 处理自然语言重写
- 用本地规则校验关键结构
- 用合理基线做评测，而不是只做前后对比
