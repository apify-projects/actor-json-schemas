# AI Agent Maintenance Rules

This repository allows contributions from humans and AI agents. To keep documentation in sync with the code and project configuration, follow these rules for every change.

The rules below are mandatory for PRs and must be verified during reviews.

## 1) When json-schemas-urls.txt changes

Trigger: Any addition, removal, or modification in `json-schemas-urls.txt`.

Required updates:
- Root README.md
  - Update the "Available schemas" section to reflect newly added or removed schemas and their public URLs.
  - Ensure links use the final GitHub Pages URLs produced by the workflow (see Local development section of README for context).
- Related package READMEs (if applicable)
  - If a package README references specific schemas or examples affected by the change, update those references as well.
- Commit message/PR title
  - Mention "update schemas list" and include a brief summary of added/removed files.

Review checklist:
- [ ] `json-schemas-urls.txt` entries are valid, unique, and reachable.
- [ ] Root README "Available schemas" list matches the final `./output/` names/URLs.
- [ ] Any examples/snippets referencing the changed schemas were updated.

## 2) When code changes (new features or behavior changes)

Trigger: Any change within `json-schema-bundler`, `json-schema-modificator`, or scripts that alters behavior, adds features, or changes usage.

Required updates:
- Package README(s)
  - Update usage instructions, CLI flags, environment requirements, and examples in the corresponding package `README.md`.
- Root README.md (if user-facing behavior changes)
  - If the change affects how contributors run local workflows (download/describe/bundle), update relevant sections.

Review checklist:
- [ ] Updated examples reflect current behavior and Node/npm requirements.
- [ ] New features or flags are documented where users expect to find them.
- [ ] Breaking changes are clearly called out in the PR description and READMEs.

## 3) When GitHub workflow files change

Trigger: Any modification under `.github/workflows/`.

Required updates:
- Root README.md
  - Reflect changes in the "Local development" section so local scripts mirror the updated CI steps.
  - Mention any new prerequisites or environment variables introduced by the workflow.

Review checklist:
- [ ] README instructions can reproduce the GH workflow locally (using `run-all.sh` or scripts/ equivalents).
- [ ] Any new outputs/paths are documented (e.g., still `./output/`).

## General PR checklist (apply to all changes)

- [ ] All related README files are updated (root and package-level) according to the rules above.
- [ ] If schemas were added/removed, the root README "Available schemas" matches current reality.
- [ ] Scripts and examples in docs were validated locally.
- [ ] Commit messages and PR description summarize the scope and call out any breaking changes.

## Notes for maintainers and AI agents

- The final bundled schemas are expected in `./output/` after running local steps from the root README.
- The GitHub Pages URLs must correspond to what the workflow publishes; keep version query parameters consistent with the project conventions.
- If uncertain which README to update, prioritize:
  1) Root `README.md` (user-facing overview and quick start)
  2) Package-specific `README.md` under the changed package directory
- Feel free to open a follow-up PR to improve documentation if a change is large.
