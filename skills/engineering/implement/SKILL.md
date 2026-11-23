---
name: implement
description: "Implement an agreed spec, tickets, or sufficiently detailed requirements with test-driven development and a closing review."
disable-model-invocation: true
---

Implement the work described by the user in a spec, tickets, or sufficiently detailed requirements. A small, well-defined task can start from the request itself.

If the user passes a ticket reference, fetch it using the configured issue tracker and state its title before starting. If the reference is ambiguous, ask.

Before editing, record the starting Git ref and note existing changes. Keep the originating spec, ticket, or agreed requirements available for review.

Use TDD by default when the change has meaningfully testable behavior. Read the declared dependency `tdd` before writing tests. Follow its red → green → refactor loop in small vertical slices at pre-agreed seams. For changes such as documentation edits, use suitable verification instead.

Run focused tests and typechecking regularly where applicable. Run the appropriate full test suite once the implementation is complete.

Read the declared dependency `code-review` and follow its working-tree review workflow before completing the task. Pass the starting ref, the scope of this task including new files, and the agreed requirements. Identify pre-existing edits so the reviewer can distinguish them.

Resolve dependencies from the same collection as this skill. For a project install, look for `<name>/SKILL.md` beside this skill folder. In the source tree, look in the `skills/engineering` and `skills/productivity` buckets of this checkout. If a required dependency is missing, report its name and the expected location.

Leave the changes in the working tree. Commit to the current branch only when the user explicitly requests a commit.
