---
title: D&D、CoC 与 Narrative 完成垂直仓库收敛
titleEn: D&D, CoC, and Narrative complete vertical repository convergence
date: 2026-08-19
tag: ARCHITECTURE
summary: 三条领域链路现在分别在一个仓库内共同版本化 Domain、MCP、Skills、UI（如有）与创作流程；旧拆分仓库已归档为只读历史。
summaryEn: Each domain path now versions Domain, MCP, Skills, UI where present, and authoring workflows in one repository; the former split repositories are archived read-only history.
---

`sagasmith-dnd`、`sagasmith-coc` 与 `sagasmith-narrative` 现在分别作为一条
完整领域链路的唯一源码入口。每个仓库共同版本化确定性 Domain、权威 MCP、Agent
Skills、领域 UI（如有）和对应的 Pack/项目创作流程，同时继续保持各组件的运行时
职责与权限边界。

原独立 MCP、Skills、UI 和通用 Module Generator 仓库已经归档。它们仍可用于历史
审计，但不再接收当前 Issue、发布或集成，也不会被 Agent、SagaSmith Web 或安装器作为
兼容回退。

`sagasmith-core`、`SagaSmith-agent`、`SagaSmith-Web`（当时名为 `SagaSmith-service`）、内容目录、官网与组织文档
继续独立。开发者页、活跃仓库 README 与 SagaSmith Web 组件锁只把当前 vertical
仓库作为发布和集成输入；归档仓库的入口文档应仅重定向到对应 vertical 仓库。
