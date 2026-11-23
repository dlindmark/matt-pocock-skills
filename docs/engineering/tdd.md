## What it does

`tdd` builds a feature or fixes a bug test-first: one failing test, then just enough code to pass it, then the next behaviour. It carries the standards that make that loop produce tests worth keeping: what a good test is, where tests go, what mocks are for, and the three anti-patterns that make a suite worthless.

It writes no test at a seam you have not agreed to first. Before any test exists, it names the public boundaries it intends to test at and stops for your confirmation. Testing effort is finite, and this step spends it on the critical paths instead of on every edge case. `tdd` is also a **reference**, not a driver. It contains the rules of the loop, and something else (you, or [implement](implement.md)) runs the [session](https://www.aihero.dev/ai-coding-dictionary/session) that applies them.

## When to reach for it

Type `$tdd` to work test-first. When you explicitly start [implement](implement.md), it also reads this Skill for changes with meaningfully testable behavior.

Reach for it when there is a concrete behaviour to build, with an input and an observable output, and you want tests that survive a refactor.

| Your situation | Where to go |
| --- | --- |
| A behaviour with defined inputs and outputs (business logic, a request/response contract, a transformation, validation) | `tdd` |
| The behaviour isn't pinned down yet | [to-spec](to-spec.md), which also agrees the test seams before any code is written |
| The question is really the shape of the interface, not the tests | [codebase-design](codebase-design.md) |
| You have a [spec](https://www.aihero.dev/ai-coding-dictionary/spec) or [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) and want the whole build run for you | [implement](implement.md), which drives `tdd` per ticket |
| Config, wiring, glue, type annotations, straight CRUD delegation | Use checks suited to the change, unless there is meaningful behavior to test |

The Skill helps decide *where* to test. If the change has no independent source of truth to assert against, a test can end up restating the implementation. That is the tautological anti-pattern reached from the other direction. Use verification suited to the change when the loop adds little value.

## Prerequisites

Install [codebase-design](codebase-design.md) alongside `tdd`. In v1.0 it became the shared source for deep-module and interface-design guidance. `tdd` reads it when the shape of the interface or seam is in question.

## The loop, and the seam it runs at

The skill rests on three terms.

**Red-green-refactor.** Write one test and run it to confirm that it fails for the expected reason. Write only enough code to pass it. Once green, make small behavior-preserving improvements when the slice reveals a concrete need, then rerun the relevant tests.

**Vertical slice.** Write one test at one seam, then the minimal implementation, then repeat. The first cycle is a **tracer bullet** that proves a single path end to end. The opposite is horizontal slicing: all the tests first, then all the code. Tests written in bulk verify *imagined* behaviour. They check the shape of things rather than what a user does, and they commit you to a test structure before you understand the implementation.

**Pre-agreed seam.** A seam is the public boundary you observe behaviour at without reaching inside. The rule has no exceptions. No test goes at an unconfirmed seam. In the full chain the seams are agreed earlier, during [to-spec](to-spec.md): "`$tdd` is told to only work at pre-agreed test seams, `$code-review` checks that only agreed-upon test seams were used." Invoked on its own, `tdd` asks you directly.

The three anti-patterns it is written to prevent:

| Anti-pattern | The tell |
| --- | --- |
| Implementation-coupled | The test breaks when you rename an internal function, though behaviour did not change. Mocked internal collaborators, asserted call counts, database queries used to verify instead of the interface. |
| Tautological | The expected value is computed the way the code computes it, so the test passes by construction. Expected values have to come from somewhere else: a known-good literal, a worked example, the spec. |
| Horizontal slicing | A batch of tests landed before any implementation. |

Mocks are for system boundaries only: external APIs, time, randomness, sometimes the filesystem or the database. Never mock your own modules.

## Common questions

**How much should it refactor after each test?**

Keep the work local to the slice while the tests are green. [Code-review](code-review.md) is where the workflow surfaces broader refactoring opportunities.

**It asked me to choose a test seam and I had no idea which to pick.**

Seam selection is a common source of friction ([issue #607](https://github.com/mattpocock/skills/issues/607)). The Skill should tell you what each proposed seam catches and what it misses. If you still have to choose between labels, ask what the broader seam would catch and what it would cost. In the full chain, `to-spec` can agree the seams while the whole feature is in view.

**It wrote the implementation before the test, even though the skill says red first.**

It happens. One user pushed the [model](https://www.aihero.dev/ai-coding-dictionary/model) on it and got an unusually honest answer: "I knew the skill said 'one test at a time, watch it fail for the right reason'. I read it. I just defaulted to my normal habit." If strict adherence matters for a particular slice, verify in the trace that the test failed for the expected reason before the implementation.

**Should it write browser or end-to-end tests first?**

Browser tests can be slow enough to undermine the feedback loop. A user reported the agent writing a Playwright test first, then repeatedly debugging the test for a feature that did not exist yet. Use the fastest public seam that proves the behavior you need. Record any project convention in `AGENTS.md`.

**Does `$tdd` replace `$implement`, or the course's `/do-work`?**

`$tdd` gives you the test-first methodology. `$implement` drives the work, runs the checks, and reads `code-review` before finishing. Together the three cover the course’s original `/do-work` step. Start with `$implement` when you want an agreed ticket built and reviewed.

**Where did the deep-modules and interface-design guidance go?**

Into [codebase-design](codebase-design.md) in v1.0, generalised so several skills share one vocabulary. `refactoring.md` left at the same time. [Code-review](code-review.md) carries the Fowler smell baseline and surfaces broader issues after implementation.

**Does it know about my other tickets?**

No. Run against one ticket, it can propose work that belongs to a sibling ticket, because it has no view of the rest of the issue graph ([issue #129](https://github.com/mattpocock/skills/issues/129)). This is not `tdd`'s job. Passing the spec alongside the ticket helps; right-sizing the tickets in the first place helps more.

## It's working if

- It stops and names the seams it intends to test at, and waits, before any test file exists.
- One test appears, goes red, gets just enough code to pass, and only then does the next test appear, not a batch of tests followed by a batch of code.
- Test names read as capabilities ("user can checkout with valid cart"), not as internals ("checkout calls paymentService.process").
- Expected values in assertions are literals you can trace to the spec, not values recomputed the way the code computes them.
- Renaming an internal function breaks nothing in the suite.
- Mocks appear only at external boundaries (the payment API, the clock) and never around your own modules.

## Where it fits

`tdd` runs inside the build step of the main chain; it is not a step of its own:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

[To-spec](to-spec.md) agrees the test seams up front, [implement](implement.md) reads `tdd` for testable behavior, and [code-review](code-review.md) checks the resulting work. The shared vocabulary for seams and deep modules lives in [codebase-design](codebase-design.md). You can also use `$tdd` on its own whenever there is a concrete behaviour to build.
