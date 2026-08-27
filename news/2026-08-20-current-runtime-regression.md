---
title: 最新运行时完成 D&D 与 CoC 并行参考战役回归
titleEn: Current runtime completes parallel D&D and CoC reference regressions
date: 2026-08-20
tag: VALIDATION
summary: 长回归现会从当前 Agent 与领域依赖重建托管栈，以签名身份并发运行 D&D 和 CoC 参考战役，并保存逐战役机器可读证据。
summaryEn: The long regression now rebuilds the hosted stack from the current Agent and domain dependencies, runs D&D and CoC reference campaigns concurrently with signed identity, and preserves machine-readable evidence per campaign.
---

长回归会先从当前 `SagaSmith-agent`、`sagasmith-core`、三个领域仓库与
`SagaSmith-service` 源码重建并重建容器，再开始任何房间动作。SagaSmith Web 使用临时共享
密钥签发带时效的 `sagasmith.auth-context/v1`，Agent 将 principal context 传给
会话作用域 MCP；领域服务仍在实际调用边界重新校验身份、角色、战役与 revision。

2026-08-20 的参考运行以隔离客户端并发完成 D&D 与 CoC 战役，没有记录到回归缺口；
D&D 路径额外记录了一个合法结局。`runtime-refresh.json`、`summary.json` 与逐战役日志
保存了构建 revision、调用结果和缺口列表。

runner 会发现目录中的全部当前模组，并把没有执行的项目与互斥路径写成机器可读
exclusion。这条结果证明当前参考集成边界可以工作，不代表全部 46 个 Pack 或每条剧情
分支都已经完整通关。
