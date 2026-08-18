---
title: 角色、结构化模组与扩展规则进入统一分享格式
titleEn: Unified sharing for actors, structured modules, and extension rules
date: 2026-08-02
tag: CONTENT
summary: 统一角色卡、SRD 预设、Scene Atlas 模组与来源绑定扩展规则包现在共用可校验、可迁移的内容边界。
summaryEn: Unified actor cards, SRD presets, Scene Atlas modules, and source-bound extension rule packs now share a validated migration boundary.
---

PC、NPC 和怪物现在使用同一个 `sagasmith.actor-card.v3`。导入会创建
新的 Character identity，并且不会携带来源数据库 id、权限或 actor knowledge。
2014 与 2024 的怪物/NPC 由默认 preset 内容包提供，而不是写死在 Host 或遭遇
驱动器里。

核心规则、Addon、模组和预设现在全部使用 `sagasmith.content-package` v2 的
`.sagasmith-pack` 归档。结构化模组可以打包标准化原文、Scene Atlas、地图与其他
内容寻址资产、审核内容、NPC、怪物、预设 PC、角色图及其稳定场景关联，再通过公开 MCP
工具在另一安装中重新导入。
内容包不是战役存档：进度、世界状态、记忆、随机流、分支与 Snapshot 继续留在
各自的权威运行时账本中。

经过审核的扩展规则包现在可以连同完整索引来源一起导出。本地 source/chunk id
会转换为稳定引用，目标端校验 system、edition、依赖 version 与不受本地 UUID
影响的 definition checksum 后用新 id 重建。规则内容的安装不会自动进行分支启用；
Addon 与模组激活仍需独立的 Owner/DM 操作。旧 portable JSON、松散角色卡、release
manifest 与 `.sagasmith-module` 已退出公开协议，不存在静默兼容路径。

内容包的技术可迁移性不代表内容获得了再分发授权。完整规则书、模组原文与从其页面
提取的角色图必须继续服从各自许可。2026-08-18 起当前目录仓库公开可见，但这只公开
索引与仓库状态，不会把任何 Pack 自动变成开放内容；下载、导入和再分发仍需逐包核对
`license_evidence`、署名、资产许可与来源授权。
