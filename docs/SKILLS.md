# Codex Skills — SUBTALE

Five upstream skills copied **unmodified** into `.agents/skills/` on 2026-10-24. They are public source versions, **not verified byte-for-byte copies** of the older local prototype skills.

| Skill | Purpose | Origin |
|---|---|---|
| `animate` | Implement animation of an approved interaction | Emil Kowalski |
| `review-animations` | Review implemented motion | Emil Kowalski |
| `better-typography` | Typography and font-rendering QA | Jakub Krehel |
| `better-interface` | Interface review orchestration | Jakub Krehel |
| `explain-interface` | Study effects/reference sites | Jakub Krehel |

Pinned origins (copied at exact revisions):
- https://github.com/emilkowalski/skills — `2d228630ba1446365f614a108cb8252f1feda202`
- https://github.com/jakubkrehel/skills — `019ab7c199154f4509b55f12d84a4f5b578dc606`

Original MIT notices: `docs/third-party/emil-kowalski-skills-LICENSE`, `docs/third-party/jakub-krehel-skills-LICENSE`.

## Known limitations

- `better-interface` is an orchestrator: only `better-typography` is installed among its six required domain reviewers. The remaining accessibility, layout, writing, color and UI domains **must be marked Not reviewed**, not guessed or implied as checked.
- `animate` mentions `improve-animations`, `find-animation-opportunities`, `animate-expo`, and `pick-ui-library`; none is installed. These are optional task routes, not app dependencies.
- `explain-interface` describes browser inspection tooling that may require setup in the Codex runtime. Do not claim browser-backed verification if no browser was used.
- Some skills offer prescriptive general UI timings and motion advice. SUBTALE is an editorial longread: approved design and interactive story requirements govern intentional exceptions, while a11y and performance still need testing.

**Token policy:** invoke the single relevant skill per atomic task; load references only when needed. Do not batch-run full cross-domain reviews by default. No code, packages, assets or legacy UI were migrated in this step.
