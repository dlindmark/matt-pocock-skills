## What it does

`$implement` works from an agreed specification, ticket, or sufficiently detailed request. A small, well-defined task can start from the request. If you supply a ticket reference, the Skill fetches it from the configured tracker and states the title.

## Workflow

1. Record the starting Git ref, the scope, and any existing edits.
2. For testable behavior, load [tdd](../../skills/engineering/tdd/SKILL.md) and agree on the public test seams. Work in small red-green-refactor cycles.
3. Run focused tests and typechecking as you go. Run the appropriate full suite at the end. For documentation-only changes, use checks suited to the change.
4. Load [code-review](../../skills/engineering/code-review/SKILL.md) to review the working-tree changes against the agreed requirements and project standards.

The changes stay in the working tree unless you request a commit. Ticket status and acceptance checkboxes are managed separately.
