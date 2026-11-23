# Maintaining the Codex Skills fork

This fork keeps Matt Pocock’s engineering workflows and adapts a curated set of Skills for Codex. Keep `main` aligned with `upstream/main` and do fork work on `codex-personal`. `origin` is the personal fork. Commit or push only when requested.

Keep the upstream Skill folder layout. Preserve the workflow and supporting files when adapting a Skill. Keep compatibility edits distinct from personal preferences in the diff where practical.

Every Skill starts with an explicit `$skill-name` invocation and has `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. An explicitly invoked Skill may read the `SKILL.md` files of dependencies it declares, from the same collection. Keep dependency lookup instructions in the Skills so installations work independently of this repository’s guidance.

## Incorporate upstream updates

Use a clean working tree. To synchronize the fork’s `main` manually, run `git fetch upstream`, `git switch main`, and `git merge --ff-only upstream/main`. Check that `git rev-parse main upstream/main` prints the same object ID twice before running `git push origin main`. If the fast-forward fails or the IDs differ, inspect the divergence first.

To review updates on the curated branch, switch to `codex-personal` and run `git merge --no-ff --no-commit main`. Inspect `git status` and the staged diff, including any newly added Skills. Keep exclusions intentional. For conflicts in retained Skills, compare both branch versions, carry over applicable upstream improvements, and reapply the Codex policy, dependency reads, and personal workflow choices. Run the checks below before completing the merge. Use `git merge --abort` to abandon the review.

To add a Skill deliberately, restore its full folder from `main` with `git restore --source=main -- skills/<bucket>/<name>`. Restore its guide if present. Inspect its dependencies, preserve required resources, adapt runtime instructions, set the explicit-only policy, and update the bucket index and installation dependency table as needed.

## Validate

Run `npm ci`, `npm run check-frontmatter`, `bash scripts/list-skills.sh`, and `git diff --check`. Review the inventory against the bucket indexes and check each declared dependency. Follow the [Codex smoke tests](.agents/invocation.md#checks) for dependency reads and explicit-only invocation.
