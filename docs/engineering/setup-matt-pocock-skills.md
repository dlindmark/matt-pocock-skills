## What it does

`$setup-matt-pocock-skills` inspects a project, proposes a setup, and writes an `## Agent skills` section in its `AGENTS.md` once you confirm. It creates or updates three files under `docs/agents/`.

| File | Contains |
| --- | --- |
| `issue-tracker.md` | GitHub, GitLab, local Markdown under `.scratch/`, or a workflow you describe |
| `triage-labels.md` | The mapping for `ready-for-agent`, plus the full label vocabulary if the project uses triage |
| `domain.md` | Where to find the glossary and ADRs |

GitHub and GitLab require authenticated `gh` and `glab` access respectively. Setup can create missing labels included in the confirmed setup. Local Markdown uses status lines instead. You can edit the generated Markdown directly as the project evolves.
