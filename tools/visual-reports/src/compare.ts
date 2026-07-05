import fs from "node:fs";
import path from "node:path";
import type {
  CaptureManifest,
  CaptureResult,
  RouteComparison,
  VisualReportsConfig,
} from "./types.js";
import { copyFileSafe, ensureDir } from "./utils.js";

function resultMap(manifest: CaptureManifest): Map<string, CaptureResult> {
  return new Map(manifest.results.map((result) => [result.routeId, result]));
}

function hasSuccessfulCapture(result: CaptureResult | undefined): boolean {
  return Boolean(result?.success && result.filename);
}

function screenshotExists(captureDir: string, result: CaptureResult): boolean {
  return fs.existsSync(path.join(captureDir, result.filename));
}

export interface ComparisonResult {
  compared: RouteComparison[];
  newRoutes: RouteComparison[];
  removedRoutes: RouteComparison[];
}

export function compareCaptures(
  config: VisualReportsConfig,
  beforeManifest: CaptureManifest,
  afterManifest: CaptureManifest,
  beforeCaptureDir: string,
  afterCaptureDir: string,
  reportDir: string,
): ComparisonResult {
  const beforeById = resultMap(beforeManifest);
  const afterById = resultMap(afterManifest);

  const compared: RouteComparison[] = [];
  const newRoutes: RouteComparison[] = [];
  const removedRoutes: RouteComparison[] = [];

  const beforeDir = path.join(reportDir, "before");
  const afterDir = path.join(reportDir, "after");
  const newDir = path.join(reportDir, "new");
  const removedDir = path.join(reportDir, "removed");

  for (const dir of [beforeDir, afterDir, newDir, removedDir]) {
    ensureDir(dir);
  }

  for (const route of config.routes) {
    const beforeResult = beforeById.get(route.id);
    const afterResult = afterById.get(route.id);

    const beforeOk =
      beforeResult &&
      hasSuccessfulCapture(beforeResult) &&
      screenshotExists(beforeCaptureDir, beforeResult);
    const afterOk =
      afterResult &&
      hasSuccessfulCapture(afterResult) &&
      screenshotExists(afterCaptureDir, afterResult);

    if (beforeOk && afterOk) {
      const beforeFile = `before/${beforeResult.filename}`;
      const afterFile = `after/${afterResult.filename}`;

      copyFileSafe(
        path.join(beforeCaptureDir, beforeResult.filename),
        path.join(reportDir, beforeFile),
      );
      copyFileSafe(
        path.join(afterCaptureDir, afterResult.filename),
        path.join(reportDir, afterFile),
      );

      compared.push({
        id: route.id,
        name: route.name,
        category: route.category,
        path: route.path,
        beforeFile,
        afterFile,
        beforeSuccess: true,
        afterSuccess: true,
      });
      continue;
    }

    if (!beforeOk && afterOk) {
      const afterFile = `new/${afterResult.filename}`;
      copyFileSafe(
        path.join(afterCaptureDir, afterResult.filename),
        path.join(reportDir, afterFile),
      );

      newRoutes.push({
        id: route.id,
        name: route.name,
        category: route.category,
        path: route.path,
        afterFile,
        afterSuccess: true,
      });
      continue;
    }

    if (beforeOk && !afterOk) {
      const beforeFile = `removed/${beforeResult.filename}`;
      copyFileSafe(
        path.join(beforeCaptureDir, beforeResult.filename),
        path.join(reportDir, beforeFile),
      );

      removedRoutes.push({
        id: route.id,
        name: route.name,
        category: route.category,
        path: route.path,
        beforeFile,
        beforeSuccess: true,
      });
      continue;
    }

    if (beforeResult?.filename && screenshotExists(beforeCaptureDir, beforeResult)) {
      copyFileSafe(
        path.join(beforeCaptureDir, beforeResult.filename),
        path.join(removedDir, beforeResult.filename),
      );
    }

    if (afterResult?.filename && screenshotExists(afterCaptureDir, afterResult)) {
      copyFileSafe(
        path.join(afterCaptureDir, afterResult.filename),
        path.join(newDir, afterResult.filename),
      );
    }
  }

  return { compared, newRoutes, removedRoutes };
}
