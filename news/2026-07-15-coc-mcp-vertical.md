---
title: "CoC 独立 MCP 垂直链路可实测"
titleEn: "The independent CoC MCP vertical slice is testable"
date: "2026-07-15"
tag: "MCP"
summary: "CoC 7e 现在拥有 MCP-owned 存储、Lobby/Play/Combat session exposure、角色知识授权、调查模组 scene index 与规则判定入口。"
summaryEn: "CoC 7e now has MCP-owned persistence, Lobby/Play/Combat session exposure, actor-scoped knowledge, scenario scene indexes, and rules-resolution tools."
---

`SagaSmith-coc-mcp` 让 CoC Agent 不再依赖 CLI 拼接或复制 D&D 工具表。真实 stdio 客户端测试验证了目录级发现、按 session 加载和 `exposure_call` fallback；多人测试验证了 PC 知识互相隔离，并在重启后保留战役、模组、Snapshot 与知识状态。

`SagaSmith-coc-mcp` removes the need for CoC agents to compose CLI commands or copy the D&D tool catalogue. A real stdio client test covers discovery, per-session loading, and the `exposure_call` fallback, while the multiplayer vertical test preserves campaign, scenario, snapshot, and actor-knowledge state across restart.
