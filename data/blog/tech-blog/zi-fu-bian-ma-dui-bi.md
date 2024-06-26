---
title: 字符编码对比
date: '2023-12-19'
tags: ['common','original','AI']
draft: false
summary: ""
---

<TOCInlineWithSticky toc={props.toc} />

## 不同字符编码对比

| 特征       | UTF-8 编码                                                                                         | ASCII 编码                                                                                   | Unicode（UTF-16 编码）                                                          |
| ---------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 编码形式   | UTF-8 是变长字节编码，编码长度从 1 字节到 4 字节不等。                                             | ASCII 是固定长度的编码，每个字符都用一个字节来表示。                                         | UTF-16 是固定长度 2 个字节或 4 个字节表示每个字符。                             |
| 字符范围   | UTF-8 编码可以表示世界上绝大多数的文字和符号，共 106 万多字符的编码范围。                          | ASCII 编码只表示本民族的文字，数字、和一些符号，共 128 个编码。                              | 同样可以表示全世界所有的文字和符号，与 UTF-8 的范围相同。                       |
| 编码复杂性 | UTF-8 编码相比于 ASCII 编码更复杂，需要处理变长字节和多字节字符。                                  | ASCII 编码非常简单，仅使用 7 位来表示一个字符。                                              | UTF-16 固定编码长度相对简单，但需要处理字节序问题（Big Endian/Little Endian）。 |
| 空间效率   | 对于 ASCII 字符，UTF-8 和 ASCII 的效率相同。但对于包括其他语言的字符，UTF-8 编码会使用更多的字节。 | ASCII 编码对于它能表示的字符来说非常高效，每个字符仅需要 1 字节。                            | 具有中等空间效率。所有字符至少需要 2 个字节，对于 ASCII 字符来说可能显得浪费。  |
| 兼容性     | UTF-8 完全兼容 ASCII，也即任何有效的 ASCII 文件也都是有效的 UTF-8 文件。                           | ASCII 文件可以直接被 UTF-8 读取，但如果文件包含除 ASCII 外的其他字符，它们将无法被正确解译。 | UTF-16 和 ASCII 编码及 UTF-8 编码都不兼容。它有自己独特的表示方式。             |

## 互相兼容的情况

- UTF-8 与 ASCII 编码是完全兼容的，也就是说，任何有效的 ASCII 文件也都是有效的 UTF-8 文件。所有的 ASCII 字符在 UTF-8 中的表示方式和 ASCII 编码中完全一样。
- UTF-16 并不与 ASCII 和 UTF-8 编码兼容。对于只包含 ASCII 字符的文档，虽然 UTF-8 和 ASCII 可以相互转换，但这对 UTF-16 并不适用。UTF-16 有自己独特的字符表示方式。

## 字节差异

| 编码方式               | 字节数   |
| ---------------------- | -------- |
| UTF-8 编码             | 3 字节   |
| ASCII 编码             | 无法表示 |
| UTF-16 编码（Unicode） | 2 字节   |

1. 在 UTF-8 编码中，一个中文汉字通常被编码为 3 个字节。
2. ASCII 编码无法表示中文汉字，因为它仅包含基本的拉丁字母、数字和一些符号，共 128 个编码。
3. 在 UTF-16 编码中，绝大多数中文汉字可以使用 2 个字节编码。

## 具体案例

以“中”字为例

| 编码方式            | 字符表示 | 字节数量 | 二进制表示                 |
| ------------------- | -------- | -------- | -------------------------- |
| UTF-8               | E4 B8 AD | 3 字节   | 11100100 10111000 10101101 |
| ASCII               | 无法表示 | --       | --                         |
| UTF-16 (Big Endian) | 4E 2D    | 2 字节   | 01001110 00101101          |