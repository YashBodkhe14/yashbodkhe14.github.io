# Vendored Claude skills

The folders in `.claude/skills/` are copied unchanged from these public repos (snapshot taken 2026-11-20), apart from a few folder renames so each folder matches its skill's `name`. Claude Code loads them automatically when you open this repo.

| Source | Commit | License | Skills |
|---|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | `e4bb5d9` | Apache-2.0 (LICENSE.txt inside each skill) | `academy-guide`, `algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `discernment-nudge`, `doc-coauthoring`, `docx`, `frontend-design`, `internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`, `xlsx` |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `1a2c79d` | MIT (stated in upstream README) | `deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-composition-patterns`, `vercel-optimize`, `vercel-react-best-practices`, `vercel-react-native-skills`, `vercel-react-view-transitions`, `web-design-guidelines`, `writing-guidelines` |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `2de1134` | MIT, see skills-licenses/ | `banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling`, `ui-ux-pro-max` |
| [bencium/bencium-marketplace](https://github.com/bencium/bencium-marketplace) | `5de46a3` | MIT, see skills-licenses/ | `adaptive-communication`, `bencium-aeo`, `bencium-code-conventions`, `bencium-controlled-ux-designer`, `bencium-impact-designer`, `bencium-innovative-ux-designer`, `design-audit`, `eu-ai-act-reviewer`, `human-architect-mindset`, `hungarian-humanizer`, `insurgent-campaign`, `negentropy-lens`, `relationship-design`, `renaissance-architecture`, `ui-typography`, `vanity-engineering-review` |
| [AccessLint/skills](https://github.com/AccessLint/skills) | `2e9d733` | MIT (stated in upstream README and plugin.json) | `accessibility-audit`, `accessibility-diff`, `accessibility-fix`, `accessibility-inspect`, `accessibility-scan`, `shared` |

`shared/` is not a skill: it holds `methodology.md`, which the AccessLint skills link to.

To update, re-clone the upstream repo and copy the skill folders over again.
