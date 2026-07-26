---
title: D&D Workbench 打通 Scene Atlas 与临时战斗地图
titleEn: D&D Workbench connects the Scene Atlas and temporary combat maps
date: 2026-07-15
tag: D&D 5E
summary: D&D 工作台现在能把冒险场景、来源证据与临时战斗地图放进同一条战役流程。
summaryEn: The D&D Workbench now connects adventure scenes, source evidence, and temporary combat maps in one campaign flow.
---

D&D UI 现在区分三类数据：按模组顺序组织的 Scene Index、只表达来源证据的 Scene Spatial，以及战斗开始时创建的临时五尺格 Combat Map。背景占位素材不携带墙体、掩体或视线等机械含义。

本地 principal-aware Gateway 通过 MCP 工具投影场景、进度与战斗状态，并用 SSE 通知 campaign revision 变化。拖动 Token 只提出移动请求，最终仍由 MCP 验证权限、分支、幂等、距离、阻挡与反应窗口。
