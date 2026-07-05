# Project Baseline

> **Template:** Nexora Website Documentation — Baseline Document  
> **Project:** Galerie à Manon — M Lalonde Artiste Peintre  
> **Client:** Tim Agostinucci  
> **Version:** 1.2  
> **Date:** 2026-07-05  
> **Author:** Nexora Engineering

---

# Executive Summary

Tim Agostinucci initiated a website modification project for **Galerie à Manon** on June 2, 2026. The initial request (`E-001`) covered navigation prominence, homepage introduction replacement, Contact page simplification, About biography replacement, and removal of obsolete sections. Navigation typography work from that request is **partially complete**; remaining content and structural changes are pending client-supplied copy and assets.

On June 4, 2026 (`E-002`), the client requested a website title change to **M Lalonde Artiste Peintre**. Implemented 2026-07-05 (WEB-006).

On June 6, 2026 (`E-003`), the client instructed that the website **must not be presented** until there is a financial commitment. Internal development may continue; client-facing presentation is deferred.

On June 12, 2026 (`E-004`), a photography session was planned. Updated artwork is expected after photography; existing artwork remains in place until replacements are supplied.

On June 19, 2026 (`E-005`), commercial planning began covering website pricing, photography pricing, annual hosting, professional email, and website maintenance. The commercial package remains under development.

---

# Project Status

**Current Phase:** Documentation complete — awaiting client content and commercial package

| Phase | Status |
|-------|--------|
| ☑ Discovery | Complete |
| ☑ Requirements | Complete |
| ☑ Repository Cleanup | Complete |
| ☑ Documentation | Complete |
| ⬜ Client Content | Pending |
| ⬜ Photography | Planned |
| ⬜ Website Modifications | Pending |
| ⬜ Client Review | Deferred per E-003 |
| ⬜ Final Approval | Pending |
| ⬜ Deployment | Pending |
| ⬜ Project Close-out | Pending |

---

# Project Timeline

| Milestone | Target Date | Status | Notes |
|-----------|-------------|--------|-------|
| Initial client request | 2026-06-02 | Complete | E-001 — scope defined via `pages.doc` |
| Website title request | 2026-06-04 | Complete | E-002 — WEB-006 implemented 2026-07-05 |
| Client presentation hold | 2026-06-06 | Active | E-003 — no presentation until financial commitment |
| Photography session | 2026-06-12 | Planned | E-004 — updated artwork expected afterward |
| Commercial planning | 2026-06-19 | In progress | E-005 — package under development |
| Baseline sign-off | — | Pending | |
| Design approval | — | Pending | Deferred per E-003 |
| Development complete | — | Pending | |
| Launch | — | Pending | Deferred per E-003 |

---

# Client Communications Log

---

## E-001

**Date:** 2026-06-02

**Subject:** Info on new website for Manon

**Status:** Partially Complete

**Summary:**  
Initial website modification request outlining navigation, content, and structural changes for the Galerie à Manon website.

**Key Requests:**

- Increase prominence of:
  - Galerie à Manon
  - À PROPOS
  - Collection
- Replace homepage introduction
- Simplify Contact page
- Replace About biography
- Remove obsolete sections

**Attachments:**

- `pages.doc` — Client markup of affected pages → see [Appendix A](#appendix-a--client-markup-index-pagesdoc)

**Action Taken:**

- Requirements WEB-001 through WEB-005 created.
- WEB-001 completed in previous sprint.
- WEB-002 through WEB-005 waiting on client.

**Engineering Notes:**

- Navigation typography has already been completed.
- Remaining requests are still pending.

---

## E-002

**Date:** 2026-06-04

**Subject:** Title for Manon's website

**Status:** Completed

**Summary:**  
Client requested changing the website title.

**Decision:**

- **M Lalonde Artiste Peintre**

**Key Requests:**

- Update website title to **M Lalonde Artiste Peintre**

**Attachments:**

- None

**Action Taken:**

- Requirement WEB-006 created.
- WEB-006 completed 2026-07-05.

**Engineering Notes:**

- Website title updated from **Galerie à Manon** to **M Lalonde Artiste Peintre** across browser title, page metadata, navigation logo, footer branding, copyright, and locale files (`fr.ts`, `en.ts`).
- Centralized title constant added at `website/lib/site.ts` for server-side metadata.

---

## E-003

**Date:** 2026-06-06

**Subject:** Re: Title for Manon's website

**Status:** Closed

**Summary:**  
Client instructed that the website should not be presented until there is a financial commitment.

**Key Requests:**

- Defer client presentation until financial commitment is in place

**Attachments:**

- None

**Action Taken:**

- Client decision recorded (CD-002).
- Client presentation deferred; internal development may continue.

**Engineering Notes:**

- Internal development may continue.
- Client presentation deferred.

---

## E-004

**Date:** 2026-06-12

**Subject:** Re: Title for Manon's website

**Status:** Open

**Summary:**  
Photography session planned. Updated artwork expected after photography.

**Key Requests:**

- Replace artwork following photography session

**Attachments:**

- None

**Action Taken:**

- Requirement WEB-007 created.
- Waiting on client (photography session and updated artwork).

**Engineering Notes:**

- Existing artwork remains until replacements are supplied.

---

## E-005

**Date:** 2026-06-19

**Subject:** Website update

**Status:** Open

**Summary:**  
Commercial planning discussion covering website services and ongoing support.

**Topics:**

- Website pricing
- Photography pricing
- Annual hosting
- Professional email
- Website maintenance

**Attachments:**

- None

**Action Taken:**

- Commercial discussion topics recorded.
- Waiting on Nexora (hosting, professional email, and maintenance proposals).

**Engineering Notes:**

- Commercial package still under development.

---

# Requirements Matrix

| ID | Requirement | Source | Priority | Status | Completed In |
|----|-------------|--------|----------|--------|--------------|
| WEB-001 | Increase navigation typography | E-001 | — | Completed | Prior sprint |
| WEB-002 | Homepage introduction replacement | E-001 | — | Pending | — |
| WEB-003 | Simplify Contact page | E-001 | — | Pending | — |
| WEB-004 | Replace About biography | E-001 | — | Pending | — |
| WEB-005 | Remove obsolete sections | E-001 | — | Pending | — |
| WEB-006 | Update website title | E-002 | — | Completed | 2026-07-05 |
| WEB-007 | Replace artwork after photography | E-004 | — | Waiting on Client | — |

---

# Commercial Discussions

| Date | Topic | Participants | Summary | Outcome |
|------|-------|--------------|---------|---------|
| 2026-06-19 | Website pricing | Tim Agostinucci | Initial commercial planning for website services | Under development |
| 2026-06-19 | Photography pricing | Tim Agostinucci | Pricing for planned photography session | Under development |
| 2026-06-19 | Annual hosting | Tim Agostinucci | Ongoing hosting arrangement for the website | Under development |
| 2026-06-19 | Professional email | Tim Agostinucci | Professional email service for the client | Under development |
| 2026-06-19 | Website maintenance | Tim Agostinucci | Ongoing maintenance offering | Under development |

---

# Client Decisions

Decisions made by the client (Tim Agostinucci).

| ID | Date | Decision | Rationale | Referenced In |
|----|------|----------|-----------|---------------|
| CD-001 | 2026-06-04 | Website title set to **M Lalonde Artiste Peintre** | Client request | E-002, WEB-006 |
| CD-002 | 2026-06-06 | Website must not be presented until financial commitment | Client instruction | E-003 |
| CD-003 | 2026-06-12 | Photography session scheduled; updated artwork to follow | Client planning | E-004, WEB-007 |

---

# Engineering Decisions

Decisions made by Nexora Engineering.

| ID | Date | Decision | Rationale | Referenced In |
|----|------|----------|-----------|---------------|
| ED-001 | — | Existing artwork remains until replacement artwork is supplied | Photography session pending; no new assets yet | E-004, WEB-007 |
| ED-002 | — | Placeholders only where content is unavailable | Avoid presenting incomplete or fabricated client content | Engineering |
| ED-003 | — | Repository reorganized into a single production codebase | Consolidate approved V2 Live source after multi-version archive | Engineering |
| ED-004 | — | `website/` is the only active production source | Single canonical codebase for all future work | Engineering |
| ED-005 | — | Historical versions archived | Preserve prior versions without maintaining parallel active codebases | Engineering |
| ED-006 | — | Previous client feature branch discarded after navigation regression | Clean restart preferred over continued patching on failed branch | Engineering |
| ED-007 | — | Future website modifications implemented one logical feature at a time | Reduce regression risk; enable isolated review and approval | Engineering |

---

# Open Items

Items blocking progress, organized by owner.

## Waiting on Client

| ID | Item | Requested | Status | Related |
|----|------|-----------|--------|---------|
| O-001 | Final biography | 2026-06-02 | Pending | WEB-004, E-001 |
| O-002 | Homepage introduction | 2026-06-02 | Pending | WEB-002, E-001 |
| O-003 | Updated artwork | 2026-06-12 | Pending | WEB-007, E-004 |
| O-004 | Final address | — | Implemented (footer) | WEB-003 |
| O-005 | Final phone number | — | Implemented (temporary placeholder on footer) | WEB-003 |
| O-006 | Final email | — | Pending (client confirmation) | WEB-003 |
| O-007 | Photography session | 2026-06-12 | Planned | E-004, WEB-007 |
| O-008 | Financial commitment | 2026-06-06 | Pending | E-003, CD-002 |
| O-009 | Confirmation of website title (if required) | 2026-06-04 | Resolved | WEB-006, E-002, CD-001 |

## Waiting on Nexora

| ID | Item | Requested | Status | Related |
|----|------|-----------|--------|---------|
| N-001 | Hosting recommendation | 2026-06-19 | Pending | E-005 |
| N-002 | Professional email recommendation | 2026-06-19 | Pending | E-005 |
| N-003 | Maintenance proposal | 2026-06-19 | Pending | E-005 |

---

# Source Documents

Primary documents that informed this baseline.

| Reference | Date | Subject | Attachments |
|-----------|------|---------|-------------|
| E-001 | 2026-06-02 | Info on new website for Manon | `pages.doc` → [`appendix/`](appendix/) |
| E-002 | 2026-06-04 | Title for Manon's website | None |
| E-003 | 2026-06-06 | Re: Title for Manon's website | None |
| E-004 | 2026-06-12 | Re: Title for Manon's website | None |
| E-005 | 2026-06-19 | Website update | None |

---

# Appendix References

Cross-reference of files stored in [`appendix/`](appendix/).

| Ref | Filename | Description | Linked From |
|-----|----------|-------------|-------------|
| A-DOC | `pages.doc` | Client markup document — page screenshots and modification notes | E-001, Source Documents |

---

# Appendix A — Client Markup Index (`pages.doc`)

Source document: **`pages.doc`** (attached to E-001, 2026-06-02)

Images have **not yet been extracted** from `pages.doc`. Each entry below is a placeholder pending extraction to [`appendix/`](appendix/) as `figure-a-01.png` through `figure-a-09.png`.

---

### Figure A-1

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Site navigation — **Galerie à Manon** logo and header branding; client markup requesting increased visual prominence.

**Related requirement:** WEB-001

**Status:** Placeholder — not extracted

---

### Figure A-2

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Site navigation — **À PROPOS** link; client markup requesting increased visual prominence.

**Related requirement:** WEB-001

**Status:** Placeholder — not extracted

---

### Figure A-3

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Site navigation — **Collection** link; client markup requesting increased visual prominence.

**Related requirement:** WEB-001

**Status:** Placeholder — not extracted

---

### Figure A-4

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Homepage — introductory copy marked for replacement.

**Related requirement:** WEB-002

**Status:** Placeholder — not extracted

---

### Figure A-5

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Contact page — layout marked for simplification.

**Related requirement:** WEB-003

**Status:** Placeholder — not extracted

---

### Figure A-6

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** À propos page — biography section marked for replacement.

**Related requirement:** WEB-004

**Status:** Placeholder — not extracted

---

### Figure A-7

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Obsolete page section — first area marked for removal.

**Related requirement:** WEB-005

**Status:** Placeholder — not extracted

---

### Figure A-8

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Obsolete page section — second area marked for removal.

**Related requirement:** WEB-005

**Status:** Placeholder — not extracted

---

### Figure A-9

**Source:** E-001

**Attachment:** `pages.doc`

**Description:** Obsolete page section — third area marked for removal.

**Related requirement:** WEB-005

**Status:** Placeholder — not extracted

---

**Extraction note:** When `pages.doc` is processed, update each figure's **Status** field and save extracted images to [`appendix/`](appendix/).
