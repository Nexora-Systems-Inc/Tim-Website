# Project Documentation

This directory is the permanent engineering record for this website project. It follows the **Nexora Website Documentation Standard** — a reusable framework for requirements traceability, client communication, and project close-out across all Nexora website projects.

## Structure

| Directory | Purpose |
|-----------|---------|
| [`baseline/`](baseline/) | Original client requirements, scope definition, and source-of-truth documents |
| [`progress/`](progress/) | Periodic project status reports during active development |
| [`completion/`](completion/) | Final project handoff documentation |
| [`meeting-notes/`](meeting-notes/) | Meeting summaries and client conversations |

## Standard Workflow

This is the intended documentation workflow for every Nexora website project:

1. **Populate Baseline** — Create `baseline/baseline.md` at project kickoff. Record the executive summary, project status, client emails, requirements matrix, decisions, open items, and source documents.
2. **Record every client email** — Log each communication as a numbered entry (`E-001`, `E-002`, …) in the Client Communications Log. Include **Action Taken** on every entry to maintain a living engineering record.
3. **Update Requirements Matrix** — Create a requirement ID (`WEB-001`, …) for every actionable item. Track priority, status, and sprint completion as work progresses.
4. **Produce Progress Reports** — Add status reports to `progress/reports/` at agreed intervals. Reference requirement IDs and open items from the baseline.
5. **Produce Completion Report** — Fill in `completion/completion.md` at project delivery. Cross-reference baseline requirements, decisions, and handoff details.

Supporting material (screenshots, PDFs, client markups) is stored in `baseline/appendix/` and indexed from the baseline document.

## Baseline Sections

The baseline document (`baseline/baseline.md`) is the central engineering record. Standard sections include:

| Section | Purpose |
|---------|---------|
| Executive Summary | Project overview from client communications |
| Project Status | Phase checklist — current position in the project lifecycle |
| Project Timeline | Key milestones and dates |
| Client Communications Log | Numbered email entries with Action Taken |
| Requirements Matrix | Traceable requirement IDs linked to sources |
| Commercial Discussions | Pricing and service conversations |
| Client Decisions | Decisions made by the client |
| Engineering Decisions | Decisions made by Nexora |
| Open Items | Blockers split by owner (client vs. Nexora) |
| Source Documents | Lookup table for all reference emails |
| Appendix | Supporting files and figure index |

## Conventions

- Use Markdown (`.md`) for all narrative documentation.
- Store supporting files in `baseline/appendix/` and reference them from baseline documents.
- Do not modify application code from this documentation tree — documentation is a separate engineering record.
- Do not invent requirements — every matrix entry must trace to a client communication or documented decision.
- Update **Action Taken** and **Open Items** whenever project state changes.

## How to Use by Phase

| Phase | Primary documents |
|-------|-------------------|
| Kickoff | `baseline/baseline.md`, `baseline/revisions.md` |
| Active development | `baseline/baseline.md`, `progress/reports/`, `meeting-notes/` |
| Delivery | `completion/completion.md`, final baseline revision |
