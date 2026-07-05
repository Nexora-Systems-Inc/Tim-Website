export interface ViewportConfig {
  width: number;
  height: number;
}

export interface AuthConfig {
  enabled: boolean;
  storageStatePath: string;
  reuseFromPlaywright: boolean;
  playwrightStorageStatePaths: string[];
}

export interface RouteConfig {
  id: string;
  name: string;
  category: string;
  path: string;
  waitForSelector?: string;
  waitMs?: number;
}

export interface VisualReportsConfig {
  viewport: ViewportConfig;
  serverPort: number;
  appDir: string;
  buildOutputDir: string;
  auth: AuthConfig;
  routes: RouteConfig[];
}

export interface CommitInfo {
  full: string;
  short: string;
  title: string;
}

export interface CaptureResult {
  routeId: string;
  routeName: string;
  category: string;
  path: string;
  filename: string;
  success: boolean;
  statusCode: number | null;
  error?: string;
}

export interface CaptureManifest {
  revision: string;
  capturedAt: string;
  viewport: ViewportConfig;
  results: CaptureResult[];
}

export interface ReportMetadata {
  reportId: string;
  reportSlug: string;
  commit: CommitInfo;
  previousCommit: CommitInfo;
  generatedAt: string;
  config: {
    viewport: ViewportConfig;
    routeCount: number;
  };
  summary: {
    compared: number;
    new: number;
    removed: number;
  };
  routes: {
    compared: RouteComparison[];
    new: RouteComparison[];
    removed: RouteComparison[];
  };
}

export interface RouteComparison {
  id: string;
  name: string;
  category: string;
  path: string;
  beforeFile?: string;
  afterFile?: string;
  beforeSuccess?: boolean;
  afterSuccess?: boolean;
}

export type CapturePhase = "before" | "after";
