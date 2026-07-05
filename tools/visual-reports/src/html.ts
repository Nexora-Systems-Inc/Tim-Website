import type { CommitInfo, ReportMetadata, RouteComparison } from "./types.js";
import { formatDisplayTimestamp } from "./utils.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderRoutePair(route: RouteComparison): string {
  const before = route.beforeFile
    ? `<img src="${escapeHtml(route.beforeFile)}" alt="${escapeHtml(route.name)} before" loading="lazy" />`
    : `<div class="missing">No before capture</div>`;
  const after = route.afterFile
    ? `<img src="${escapeHtml(route.afterFile)}" alt="${escapeHtml(route.name)} after" loading="lazy" />`
    : `<div class="missing">No after capture</div>`;

  return `
    <section class="route-card">
      <header>
        <h3>${escapeHtml(route.name)}</h3>
        <p class="meta">${escapeHtml(route.category)} · <code>${escapeHtml(route.path)}</code></p>
      </header>
      <div class="comparison-grid">
        <figure>
          <figcaption>Before</figcaption>
          ${before}
        </figure>
        <figure>
          <figcaption>After</figcaption>
          ${after}
        </figure>
      </div>
    </section>
  `;
}

function renderSingleScreen(
  route: RouteComparison,
  label: "Before" | "After",
): string {
  const file = label === "Before" ? route.beforeFile : route.afterFile;
  const image = file
    ? `<img src="${escapeHtml(file)}" alt="${escapeHtml(route.name)}" loading="lazy" />`
    : `<div class="missing">No capture</div>`;

  return `
    <section class="route-card single">
      <header>
        <h3>${escapeHtml(route.name)}</h3>
        <p class="meta">${escapeHtml(route.category)} · <code>${escapeHtml(route.path)}</code></p>
      </header>
      <figure>
        <figcaption>${label}</figcaption>
        ${image}
      </figure>
    </section>
  `;
}

function renderSection(
  title: string,
  routes: RouteComparison[],
  mode: "pair" | "before" | "after",
): string {
  if (routes.length === 0) {
    return "";
  }

  const cards =
    mode === "pair"
      ? routes.map(renderRoutePair).join("")
      : routes
          .map((route) =>
            renderSingleScreen(route, mode === "before" ? "Before" : "After"),
          )
          .join("");

  return `
    <section class="report-section">
      <h2>${escapeHtml(title)}</h2>
      <div class="route-list">${cards}</div>
    </section>
  `;
}

export function generateHtmlReport(
  metadata: ReportMetadata,
  afterCommit: CommitInfo,
  beforeCommit: CommitInfo,
  generatedAt: Date,
): string {
  const comparedSection = renderSection(
    "Compared Routes",
    metadata.routes.compared,
    "pair",
  );
  const newSection = renderSection("New Screens", metadata.routes.new, "after");
  const removedSection = renderSection(
    "Removed Screens",
    metadata.routes.removed,
    "before",
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(metadata.reportId)} — Visual Report</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f6f4ef;
      --panel: #ffffff;
      --text: #1f1b16;
      --muted: #6f675d;
      --border: #ddd4c7;
      --accent: #5c4d3c;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #171411;
        --panel: #211c18;
        --text: #f6f1ea;
        --muted: #b7aea3;
        --border: #3a332c;
        --accent: #d8c4aa;
      }
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }

    header.report-header {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem 1.75rem;
      margin-bottom: 2rem;
    }

    header.report-header h1 {
      margin: 0 0 1rem;
      font-size: 1.75rem;
      letter-spacing: 0.02em;
    }

    dl.meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem 1.5rem;
      margin: 0;
    }

    dl.meta-grid div {
      margin: 0;
    }

    dl.meta-grid dt {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin-bottom: 0.25rem;
    }

    dl.meta-grid dd {
      margin: 0;
      font-size: 0.95rem;
    }

    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }

    .summary span {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 0.35rem 0.85rem;
      font-size: 0.85rem;
    }

    .report-section {
      margin-bottom: 2.5rem;
    }

    .report-section h2 {
      font-size: 1.25rem;
      margin: 0 0 1rem;
      color: var(--accent);
    }

    .route-list {
      display: grid;
      gap: 1.25rem;
    }

    .route-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }

    .route-card header {
      padding: 1rem 1.25rem 0.75rem;
      border-bottom: 1px solid var(--border);
    }

    .route-card h3 {
      margin: 0;
      font-size: 1.05rem;
    }

    .route-card .meta {
      margin: 0.35rem 0 0;
      color: var(--muted);
      font-size: 0.85rem;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0;
    }

    figure {
      margin: 0;
      border-right: 1px solid var(--border);
    }

    figure:last-child {
      border-right: none;
    }

    figcaption {
      padding: 0.65rem 1rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      background: #fff;
    }

    .missing {
      min-height: 240px;
      display: grid;
      place-items: center;
      color: var(--muted);
      background: var(--bg);
      font-style: italic;
    }

    .route-card.single figure {
      border-right: none;
    }

    @media (max-width: 900px) {
      .comparison-grid {
        grid-template-columns: 1fr;
      }

      figure {
        border-right: none;
        border-bottom: 1px solid var(--border);
      }

      figure:last-child {
        border-bottom: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="report-header">
      <h1>Visual Report · ${escapeHtml(metadata.reportId)}</h1>
      <dl class="meta-grid">
        <div>
          <dt>Visual Report ID</dt>
          <dd>${escapeHtml(metadata.reportId)}</dd>
        </div>
        <div>
          <dt>Commit</dt>
          <dd><code>${escapeHtml(afterCommit.short)}</code></dd>
        </div>
        <div>
          <dt>Previous Commit</dt>
          <dd><code>${escapeHtml(beforeCommit.short)}</code></dd>
        </div>
        <div>
          <dt>Commit Title</dt>
          <dd>${escapeHtml(afterCommit.title)}</dd>
        </div>
        <div>
          <dt>Generated</dt>
          <dd>${escapeHtml(formatDisplayTimestamp(generatedAt))}</dd>
        </div>
      </dl>
      <div class="summary">
        <span>${metadata.summary.compared} compared</span>
        <span>${metadata.summary.new} new</span>
        <span>${metadata.summary.removed} removed</span>
      </div>
    </header>
    ${comparedSection}
    ${newSection}
    ${removedSection}
  </div>
</body>
</html>`;
}
