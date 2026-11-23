# Codex invocation and validation

Set `policy.allow_implicit_invocation: false` in every Skill’s `agents/openai.yaml`, preserving the other metadata. The user chooses a Skill with `$skill-name`. See the [OpenAI Skills documentation](https://learn.chatgpt.com/docs/build-skills#optional-metadata).

A Skill’s `SKILL.md` names each dependency at the step where it is needed. The instructions tell Codex to read that Skill from the same collection. Installations place Skill folders side by side. The source checkout keeps the upstream engineering and productivity buckets. A parent Skill may load only the dependencies its workflow declares. The dependency’s own policy still governs its independent discovery.

## Checks

Run `npm ci`, `npm run check-frontmatter`, `bash scripts/list-skills.sh`, and `git diff --check`. Compare the inventory to the two bucket indexes. Verify that each declared dependency and supporting file exists. The Node check validates frontmatter, unique folder-matching names, and explicit-only policy.

For smoke tests, use a disposable Git repository and copy the relevant folders listed in the [installation guide](../README.md#install-selected-skills). Start a fresh Codex session for each case and check the tool trace for reads of the project’s Skill files.

- Select the project copy of `$grill-with-docs` and say “Grill me about how a library should handle holds when a book is returned.” Expect reads of both `grilling/SKILL.md` and `domain-modeling/SKILL.md` and a round of questions. Resolve a term and check for a glossary update.
- Select the project copy of `$implement` in a toy project with a test suite and say “Make the public slug formatter collapse runs of spaces to one hyphen.” Confirm the proposed test seam. Expect a failing test before the fix, focused and full checks, then a read of the project’s `code-review/SKILL.md` and a review of the uncommitted change. Check that HEAD stayed at its starting commit.
- In a fresh session with the same folders installed, ask “How would you test changes to the slug formatter?” without selecting any Skill. Check that the trace contains no reads of the curated Skill files.
