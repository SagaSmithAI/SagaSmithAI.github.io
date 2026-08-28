export const repositories = [
  {
    key: 'agent',
    name: 'SagaSmith-agent',
    url: 'https://github.com/SagaSmithAI/SagaSmith-agent',
    roleZh: 'Agent host、Channels、MCP consumer、Local Agent Kit 与 Hosted worker 基础',
    roleEn: 'Agent host, channels, MCP consumer, Local Agent Kit, and the shared Hosted worker base',
  },
  {
    key: 'web',
    name: 'SagaSmith-Web',
    url: 'https://github.com/SagaSmithAI/SagaSmith-Web',
    roleZh: '浏览器/PWA、API/BFF、托管控制面、协作、Forge、Module Studio 与运维',
    roleEn: 'Browser/PWA, API/BFF, hosted control plane, collaboration, Forge, Module Studio, and operations',
  },
  {
    key: 'core',
    name: 'Sagasmith-core',
    url: 'https://github.com/SagaSmithAI/Sagasmith-core',
    roleZh: '系统无关持久化、文档导入、检索、分支、知识与事务语义',
    roleEn: 'System-neutral persistence, document ingestion, retrieval, branches, knowledge, and transactions',
  },
  {
    key: 'dnd',
    name: 'Sagasmith-dnd',
    url: 'https://github.com/SagaSmithAI/Sagasmith-dnd',
    roleZh: 'D&D 5e Domain、权威 MCP、Skills、Workbench 与模组生成',
    roleEn: 'D&D 5e Domain, authoritative MCP, Skills, Workbench, and module authoring',
  },
  {
    key: 'coc',
    name: 'Sagasmith-coc',
    url: 'https://github.com/SagaSmithAI/Sagasmith-coc',
    roleZh: 'CoC 7e Domain、权威 MCP、Skills、Workbench 与模组生成',
    roleEn: 'CoC 7e Domain, authoritative MCP, Skills, Workbench, and module authoring',
  },
  {
    key: 'narrative',
    name: 'sagasmith-narrative',
    url: 'https://github.com/SagaSmithAI/sagasmith-narrative',
    roleZh: '系统无关 Narrative Domain、权威 MCP、Skills 与项目生成',
    roleEn: 'System-neutral Narrative Domain, authoritative MCP, Skills, and project authoring',
  },
  {
    key: 'library',
    name: 'SagaSmith-dnd-content-library',
    url: 'https://github.com/SagaSmithAI/SagaSmith-dnd-content-library',
    roleZh: '逐包许可约束的 Pack、来源/资产 blob 与 checksum 索引',
    roleEn: 'Rights-aware Packs, source/asset blobs, and checksum index',
  },
  {
    key: 'profile',
    name: '.github',
    url: 'https://github.com/SagaSmithAI/.github',
    roleZh: '组织 Profile、贡献指南、行为准则与公共安全入口',
    roleEn: 'Organization profile, contribution guide, code of conduct, and public security entry point',
  },
] as const;

export const systemStatus = [
  {
    name: 'D&D 5e',
    status: 'Early Alpha',
    tone: 'live',
    zh: '端到端参考路径：规则、内容、场景、角色知识、战斗与 Workbench。',
    en: 'End-to-end reference path across rules, content, scenes, actor knowledge, combat, and Workbench.',
  },
  {
    name: 'Call of Cthulhu 7e',
    status: 'In testing',
    tone: 'testing',
    zh: '调查、检定、SAN、追逐、角色知识边界与参考战役路径。',
    en: 'Investigation, checks, SAN, chases, actor-knowledge boundaries, and a reference campaign path.',
  },
  {
    name: 'Narrative',
    status: 'Alpha',
    tone: 'alpha',
    zh: '系统无关长线叙事、权威 stdio MCP、Skills 与项目生成。',
    en: 'System-neutral long-form play, authoritative stdio MCP, Skills, and project authoring.',
  },
  {
    name: 'Extended ruleset import',
    status: 'Experimental',
    tone: 'experimental',
    zh: '保留来源的解析、质量报告与 Pack 校验；不等于任意规则书可直接运行。',
    en: 'Source-preserving parsing, quality reports, and Pack validation—not arbitrary rulebook execution.',
  },
] as const;

export const localProfiles = [
  ['dnd-only', 'D&D 5e'],
  ['coc-only', 'Call of Cthulhu 7e'],
  ['narrative-only', 'Narrative'],
  ['multi-system', 'D&D + CoC + Narrative'],
] as const;
