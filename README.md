# Matt Pocock’s Skills for Codex

A curated fork of [Matt Pocock’s Skills](https://github.com/mattpocock/skills) for Daniel Lindmark’s Codex workflow. It keeps the original emphasis on shared domain language, small vertical slices, tests through public interfaces, and review against the agreed requirements.

## Install selected Skills

From a checkout of the `codex-personal` branch, copy the full folders for the Skills you want and their dependencies into your project’s `.agents/skills/`. For example, from the curated checkout:

```bash
project=/absolute/path/to/your/project
mkdir -p "$project/.agents/skills"
cp -R skills/engineering/{implement,tdd,code-review,codebase-design} "$project/.agents/skills/"
```

Check for existing folders before copying. Refresh each copy manually after reviewing changes in the fork. Start Codex from the target project and type `$` to choose the desired Skill. If the picker has two copies of a name, choose the project copy by path. In particular, a personal `code-review` can coexist with this collection’s `code-review`.

Each Skill starts with an explicit `$skill-name` invocation. The selected Skill may read its declared dependencies from the same collection as the workflow needs them. Copy all transitive dependencies so these reads work.

| Install this Skill | Also install |
| --- | --- |
| `grill-with-docs` | `grilling`, `domain-modeling` |
| `implement` | `tdd`, `code-review`, `codebase-design` |
| `tdd` | `codebase-design` |
| `retro` | `writing-for-agents` |

Run `$setup-matt-pocock-skills` in the target project if you want to configure its issue tracker, labels, and domain docs. GitHub and GitLab workflows use authenticated `gh` and `glab` respectively. Local Markdown works without either CLI.

## Collection

- [Engineering](skills/engineering/README.md)
- [Productivity](skills/productivity/README.md)

See [AGENTS.md](AGENTS.md) for maintenance and [invocation and validation](.agents/invocation.md) for policy and smoke tests.
