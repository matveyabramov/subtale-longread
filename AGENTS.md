# SUBTALE — working rules for Codex

- This is a **fresh implementation**, not a refactor of the old Echo prototype. Legacy repository and documentation are read-only references; never copy old UI/CSS or assumptions by default.
- The **current approved Figma frames** are the source of truth for visuals and screen content. No frame URLs or node IDs are confirmed in this repository yet; collect them during the Figma audit. Do not invent assets, copy, layout decisions or source attribution.
- Work in small, explicitly scoped stages. Do not implement the next stage automatically. For Figma work, read only the relevant frames/files; avoid repeated full-project audits.
- Planned sequence: Figma/asset audit; static 1920px desktop; desktop adaptation including 1440px; functional interactions; motion; desktop QA; tablet; mobile; final QA/deployment.
- The only designed viewport currently available is 1920px. Treat all other viewport designs as proposals to review, not as automatic uniform scaling. Preserve content and interaction meaning.
- Motion should be documented before implementation; design with accessible keyboard/touch behavior and prefers-reduced-motion support. Do not introduce scroll hijacking without approval.
- Technical direction (not yet initialized): Vite, React, TypeScript, CSS Modules, GSAP/ScrollTrigger where needed, Playwright for QA. Validate choices during project setup; do not install anything without a stage request.
- Keep task reports concise: changes, checks performed, blockers, and next step. Avoid unnecessary dependency installs, broad refactors and unrelated changes.
- Never modify, archive, or delete the legacy repository as part of this project.

## Skill usage and context budget

- Five upstream skills are vendored in `.agents/skills/`. See `docs/SKILLS.md` for pinned sources and limitations.
- Load **only the skill directly relevant to the current task**, and its auxiliary files as needed; do not read all skill documents every turn.
- Prefer `animate` for implementing motion, `review-animations` for motion QA, `better-typography` for type QA, `explain-interface` for references, and `better-interface` for scoped interface critique.
- Missing cross-referenced skills are **not installed**. Never claim the corresponding review domains were covered; mark them Not reviewed.
- Some upstream rules target generic applications. Do not let a skill override approved Figma compositions, editorial narrative, or project-specific motion decisions; explain substantive trade-offs.
