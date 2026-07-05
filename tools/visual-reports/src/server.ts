import http from "node:http";
import handler from "serve-handler";

export interface StaticServer {
  port: number;
  close: () => Promise<void>;
}

async function listenOnPort(
  server: http.Server,
  port: number,
): Promise<number> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to determine server port.");
  }

  return address.port;
}

function createStaticServer(rootDir: string): http.Server {
  return http.createServer((request, response) => {
    return handler(request, response, {
      public: rootDir,
      cleanUrls: true,
      trailingSlash: false,
    });
  });
}

export async function startStaticServer(
  rootDir: string,
  preferredPort: number,
): Promise<StaticServer> {
  const portsToTry = preferredPort > 0 ? [preferredPort, 0] : [0];
  let lastError: unknown;

  for (const port of portsToTry) {
    const server = createStaticServer(rootDir);

    try {
      const boundPort = await listenOnPort(server, port);
      return {
        port: boundPort,
        close: () =>
          new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
          }),
      };
    } catch (error) {
      lastError = error;
      server.close();
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to start static server.");
}

export function buildBaseUrl(port: number): string {
  return `http://127.0.0.1:${port}`;
}

export function resolveStaticRoot(
  appRoot: string,
  buildOutputDir: string,
): string {
  return path.join(appRoot, buildOutputDir);
}
