---
title: CoC 7e 调查链路进入可测试阶段
titleEn: The CoC 7e investigation path is now testable
date: 2026-07-15
tag: COC 7E
summary: CoC 7e 已能保存调查进度、角色各自掌握的线索与战役状态，当前仍处于测试阶段。
summaryEn: CoC 7e can now preserve investigation progress, character-specific clues, and campaign state while the experience remains in testing.
---

`SagaSmith-coc-mcp` 让 CoC Agent 不再依赖 CLI 拼接或复制 D&D 工具表。真实 stdio 客户端测试验证了目录级发现、按 session 加载和 `exposure_call` fallback；多人测试验证了 PC 知识互相隔离，并在重启后保留战役、模组、Snapshot 与知识状态。

`SagaSmith-coc-mcp` removes the need for CoC agents to compose CLI commands or copy the D&D tool catalogue. A real stdio client test covers discovery, per-session loading, and the `exposure_call` fallback, while the multiplayer vertical test preserves campaign, scenario, snapshot, and actor-knowledge state across restart.
