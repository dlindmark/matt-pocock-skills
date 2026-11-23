## What it does

`implement` builds work that has already been decided. You point it at a [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), a [spec](https://www.aihero.dev/ai-coding-dictionary/spec), or sufficiently detailed requirements, and it writes the code, drives [tdd](tdd.md) where appropriate, typechecks as it goes, and runs [code-review](code-review.md) at the end.

The agreed work is the input. The Skill carries it through implementation and review, then commits to the current branch.

## When to reach for it

Start it by typing `$implement` yourself. For a set of tickets from [to-tickets](to-tickets.md), invoke it on each ticket as it becomes ready.

Where the work currently lives decides whether this is the right skill:

| The work is… | Reach for |
| --- | --- |
| A ticket on the tracker | `$implement #42`, one ticket per [session](https://www.aihero.dev/ai-coding-dictionary/session), [clearing](https://www.aihero.dev/ai-coding-dictionary/clearing) context between tickets |
| A spec, not yet split up, and the build spans sessions | [to-tickets](to-tickets.md) first, then `$implement` per ticket |
| A spec, and the build is small | `$implement` directly against the spec |
| Only in the conversation you just had, and it's still small | `$implement` right there, in the same window |
| The requirements still need to be agreed | [grill-with-docs](grill-with-docs.md) for a codebase, or [grilling](../productivity/grilling.md) for a plain interview |
| One concrete behaviour you want test-first, with no spec | [tdd](tdd.md) directly |
| Already built, and you want it checked | [code-review](code-review.md) directly |

The same-session case includes small, well-defined tasks. If the plan lives only in the thread, point to that plan when you invoke the Skill.

## Prerequisites

Check that you are on the branch where you want the change. The Skill records the starting ref and any existing edits so its review can focus on the current task.

If the tickets came from [to-tickets](to-tickets.md), [setup-matt-pocock-skills](setup-matt-pocock-skills.md) configures the tracker they live on. `implement` passes the originating requirements to `code-review` at close-out.

## What one run does

A run has five steps, in order:

1. Read the ticket, spec, or requirements and identify the public test seams.
2. For testable behavior, read [tdd](tdd.md) and work at the pre-agreed seams, one red-green-refactor slice at a time. Use appropriate checks for changes such as documentation edits.
3. Typecheck often, run single test files as it goes.
4. Run the full test suite once, at the end.
5. Run [code-review](code-review.md), then commit to the current branch.

When working from tickets, start with one ready ticket per session. The tickets [to-tickets](to-tickets.md) produces are tracer-bullet vertical slices sized to fit a single fresh [context window](https://www.aihero.dev/ai-coding-dictionary/context-window). Each ticket is self-contained, so you can discard the previous ticket's context.

## Pre-agreed seams

The skill's central idea is the **seam**, the public boundary you observe behaviour at without reaching inside. Tests live at seams. When the seam is agreed before any code exists, the tests last, and you can rewrite the implementation underneath without changing them.

The "pre-agreed" part matters, and it is also the skill's weakest point. Nothing inside `implement` agrees the seams. `tdd` is the skill that asks, and it refuses to write a test at an unconfirmed seam. So in practice the agreement happens either upstream in the spec, or in the first exchange of the run. If it happens nowhere, the run becomes "just write the code" and nothing warns you. Naming the seams in the spec is what stops that.

## Common questions

**It finished, but my ticket is still open and the acceptance criteria are still unchecked.**

`implement` leaves ticket status and acceptance checkboxes for you to reconcile. This matters most on a dependency chain, because `to-tickets` defines the frontier as tickets whose blockers are all closed.

**Can I point it at all my tickets at once, or run several in parallel?**

For ticketed work, use one ready ticket per invocation. Parallel sessions in the same checkout share the working directory, index, and HEAD, so one session's edits can show up in another's diff. Separate worktrees isolate those files and indexes, while refs such as the stash remain shared.

**Can it open a pull request instead of committing?**

`implement` commits to the current branch after review. Request a pull request separately.

**`code-review` says it cannot see my changes.**

Check the comparison mode. A working-tree review includes staged and unstaged tracked edits plus in-scope untracked files. A committed review with `git diff <fixed-point>...HEAD` only sees commits. `implement` uses the working-tree mode.

An agent reviewing the code it just wrote carries the assumptions that shaped it. For a separate review, run [code-review](code-review.md) in a fresh session and specify the same requirements and comparison. When delegation is available, the Skill also uses fresh-context subagents for its two axes.

**One ticket burned 150k tokens. Am I using it wrong?**

Probably not. The ticket is more likely too big. A run does codebase exploration, a red-green-refactor loop for testable changes, a full suite, and a review. Right-size the tickets in [to-tickets](to-tickets.md) so each fits one fresh window. If a single ticket keeps going over, split it.

**`$implement #2` in a fresh session worked on something completely unrelated.**

The agent resolved `#2` against another numbered list in context, such as a todo file or checklist, rather than the configured tracker. `implement` now fetches a passed reference from the issue tracker and states its title before starting, and asks when the reference is ambiguous. Check that title matches the ticket you meant; passing the issue URL or `owner/repo#2` removes the ambiguity entirely.

## It's working if

- The session opens by identifying the ticket, spec, or agreed requirements.
- For testable behavior, the trace shows a read of `tdd/SKILL.md` and a meaningful failing test before the implementation.
- Relevant typechecks and focused tests run during the work, and the full suite runs near the end.
- The closing review covers the changes in the working tree, then the Skill commits to the current branch.
- The diff stays within the agreed scope.

## Where it fits

`implement` is the build step of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

Its neighbours are [to-tickets](to-tickets.md), which produces the tickets and blocking edges, [tdd](tdd.md), which it uses for implementation, and [code-review](code-review.md), which checks the resulting diff. It sits downstream of the planning skills and trusts the work it was handed, so the quality and granularity of the requirements matter.
