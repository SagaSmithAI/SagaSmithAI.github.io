---
title: 托管 Service 与当前内容目录进入公开开发
titleEn: Hosted Service and the current content catalog enter public development
date: 2026-08-18
tag: PLATFORM
summary: SagaSmith Service、D&D/CoC 多系统房间与当前 46 个 Content Pack 的校验和目录现已公开可见，同时继续保留明确的状态与内容权利边界。
summaryEn: SagaSmith Service, hosted D&D/CoC rooms, and the checksum catalog for 46 current Content Packs are now publicly visible with explicit state and content-rights boundaries.
---

`SagaSmith-service` 现在公开展示托管账户、配额、战役房间、主持身份、Agent
调度、统一 Web 与多系统 MCP 编排。Service 不拥有 D&D 或 CoC 的权威游戏状态；
每一次领域操作仍交给对应 MCP 重新做权限、revision、阶段和角色范围校验。

托管房间现在可以把 Agent 输出拆成公开叙述、角色演绎、提示与权威
`resolution_ref`。D&D 与 CoC MCP 返回按受众过滤的 resolution presentation，
前端只渲染服务端已经允许的骰点、结果和待选择项。

`SagaSmith-dnd-content-library` 同时改为公开仓库，机器索引记录当前 46 个不可变
Pack 的身份、依赖、大小和校验和。公开可见不等于开放内容许可：每个 Pack、来源、
角色图和其他资产继续保留自己的许可、署名与分发限制，使用者必须自行确认授权。

Service 的公开仓库仍以其专有 `LICENSE` 为准；SagaSmith 的 Apache-2.0 运行时、
Skills、UI 与网站也继续按各自仓库的许可证发布。
