---
title: PC、NPC、怪物与结构化模组进入统一分享格式
titleEn: Unified sharing for PCs, NPCs, monsters, and structured modules
date: 2026-08-02
tag: CONTENT
summary: 统一角色卡、SRD 默认怪物预设包与自包含 Scene Atlas 模组包现在共用可校验、可迁移的内容边界。
summaryEn: Unified actor cards, bundled SRD creature presets, and self-contained Scene Atlas modules now share a validated migration boundary.
---

PC、NPC 和怪物现在使用同一个 checksum-bound portable actor card。导入会创建
新的 Character identity，并且不会携带来源数据库 id、权限或 actor knowledge。
2014 与 2024 SRD 怪物/NPC 由默认 preset pack 提供，而不是写死在 Host 或遭遇
驱动器里。

结构化模组可以打包标准化来源、Scene Atlas、地图与其他资产、审核内容、NPC、
怪物、预设 PC 及其稳定场景关联，再通过公开 MCP 工具在另一安装中重新导入。
内容包不是战役存档：进度、世界状态、记忆、随机流、分支与 Snapshot 继续留在
各自的权威运行时账本中。
