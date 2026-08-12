---
title: claude-video-vision
date: '2026-08-12'
tags: ['resources-save']
draft: false
summary: '让 Claude Code 直接读取视频画面与带时间戳的音频转写内容的插件，支持本地文件和 YouTube 链接。'
---

<TOCInlineWithSticky toc={props.toc} />

## 项目链接

- [jordanrendric/claude-video-vision](https://github.com/jordanrendric/claude-video-vision)
- [项目 README](https://github.com/jordanrendric/claude-video-vision/blob/main/README.md)

## 这是做什么的

`claude-video-vision` 是一个 Claude Code 插件，为 Claude 增加视频感知能力。

它会用 `ffmpeg` 从视频中提取画面帧，并将音频交给 Gemini、Whisper 或 OpenAI API 转写。Claude 最终拿到的是画面图片和带时间戳的音频文本，因此可以基于视频内容回答问题、定位片段或总结视频。

项目定位为“感知层”，而不是替 Claude 预先解释视频：插件负责把视频转为可供模型理解的多模态材料，具体分析仍由 Claude 根据任务完成。

## 主要能力

- 支持本地视频文件与 YouTube URL；YouTube 视频通过 `yt-dlp` 下载，并尽量保留来源元数据与字幕。
- 根据问题自适应选择抽帧参数，例如帧率、时间范围和分辨率。
- 支持三种音频后端：Gemini API、本地 Whisper（`whisper.cpp` 或 `openai-whisper`）、OpenAI Whisper API。
- 本地 Whisper 可离线运行，模型首次使用时自动下载。
- 提供交互式配置向导，用于选择后端、检查依赖和调整帧提取选项。
- 支持按时间点进一步查看视频细节，并复用已提取的片段缓存。

## 使用方式

安装后可以用斜杠命令分析视频：

```text
/watch-video path/to/video.mp4
/watch-video tutorial.mp4 "这个教程使用了什么语言？"
/watch-video https://www.youtube.com/watch?v=... "总结这个视频"
```

也可以在普通对话中直接提及视频文件或 YouTube 链接。Claude 会根据问题调整参数：例如查看某一秒的屏幕文字时使用更高分辨率和更窄的时间范围；总结一小时课程时则使用较低帧率覆盖全片。

首次配置可运行：

```text
/claude-video-vision:setup-video-vision
```

## 实现思路

整体流程可以概括为：

```text
视频文件或 YouTube URL
        ↓
ffmpeg 抽取画面帧 ──┐
                    ├── Claude Code 获取图片、时间戳与音频文本
音频 / 字幕转写 ────┘
```

视频画面始终由 `ffmpeg` 提取；音频则可以按隐私、成本和环境选择后端：

| 后端 | 特点 | 适合场景 |
| --- | --- | --- |
| Gemini API | 可处理语音及非语音音频事件，有免费额度 | 希望快速接入云端能力 |
| 本地 Whisper | 免费、离线处理 | 视频不便上传或希望控制成本 |
| OpenAI API | 使用 Whisper API 转写 | 已有 OpenAI API 工作流 |

对于 YouTube 视频，插件优先使用人工字幕，其次使用自动字幕；若字幕缺失、为空或覆盖不足，再调用配置的音频后端转写。转写结果会标明来源，便于 Claude 区分人工字幕和自动字幕的可靠程度。

## 依赖与注意点

- MCP 服务需要 Node.js 20+。
- 所有模式都依赖 `ffmpeg`。
- 分析 YouTube 链接时还需要 `yt-dlp`。
- 云端后端分别需要对应的 Gemini 或 OpenAI API Key；本地模式需要安装 Whisper 运行环境。
- 默认会限制提取帧数；分析很长的视频时，应先明确想看的时间范围或问题，以减少处理量与上下文占用。

## 适合关注的场景

- 让 Claude Code 协助分析录屏、演示视频、线上课程或 bug 复现视频。
- 根据时间点检查 UI、字幕、操作步骤或异常现象。
- 总结公开视频，并将画面信息与口述内容结合起来。
- 在本地视频资料不能上传时，以本地 Whisper 完成离线转写。

## 我的理解

这个项目的价值不只在于“让模型看视频”，而在于把视频拆成 Claude 已经擅长处理的输入形式：图片和带时间语义的文本。相比直接将整个视频交给模型，它把抽帧密度、时间范围与转写后端交给任务意图驱动，因而更适合在 Claude Code 的实际工作流中定位和分析具体问题。
