## What it does

`$code-review` examines changes along two axes. Standards checks the project’s documented rules and a baseline of Fowler code smells. Spec checks that the change implements the originating requirements without scope creep.

## Choose the comparison

- To review committed changes since a branch, tag, or commit, supply the reference. The review compares its merge-base to `HEAD`.
- To review uncommitted changes, ask for a working-tree review. It includes staged, unstaged, and in-scope new files. [Implement](../../skills/engineering/implement/SKILL.md) uses this mode and provides the starting ref, requirements, and any pre-existing changes.

The axes use separate fresh-context subagents when delegation is available and allowed. Otherwise, the agent performs two passes directly. The report keeps Standards and Spec findings distinct. The Spec axis needs an issue, a spec, or agreed requirements.
