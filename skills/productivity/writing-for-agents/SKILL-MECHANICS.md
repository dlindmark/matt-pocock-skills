# Skill mechanics

The skill-specific branch of [`writing-for-agents`](SKILL.md): what changes when the document is a skill (frontmatter, the invocation choice, and router skills). Everything else about writing it is the universal reference in `SKILL.md`.

## Invocation

Keep the required `name` and `description` in `SKILL.md` frontmatter. Write the description as a concise summary for the skill picker. For this collection, set `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. The user starts a skill by typing `$skill-name`.

A skill can declare a dependency in its workflow by naming it and saying when to read its `SKILL.md`. Explicitly invoking the parent authorizes the named dependency at that step. Locate dependencies in the same collection and install their full folders, including supporting references.

## Splitting by invocation

Extract a skill when a distinct workflow deserves its own entry point or multiple skills genuinely need the same reference. Keep supporting detail beside the skill that owns it and link to it from the workflow.

## Router skills

A router can help the user choose a workflow by listing relevant `$skill-name` commands. Suggestions leave the choice to the user.
