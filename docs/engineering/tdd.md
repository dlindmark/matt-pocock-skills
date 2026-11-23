## What it does

`$tdd` builds a feature or fixes a bug in small vertical slices. Each test exercises observable behavior through a public interface. Agree on test seams before starting.

## The loop

1. **Red.** Write one failing test for the next behavior. Run it and check that it fails for the reason you expect.
2. **Green.** Write the smallest implementation that passes that test and rerun it.
3. **Refactor.** Make small behavior-preserving improvements when the slice reveals a concrete need. Rerun tests before moving on.

When the interface or test seam is in question, the Skill reads [codebase-design](../../skills/engineering/codebase-design/SKILL.md) for the shared vocabulary. [Implement](../../skills/engineering/implement/SKILL.md) uses this loop by default when the work has testable behavior.
