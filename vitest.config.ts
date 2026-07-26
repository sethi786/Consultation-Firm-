import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "server-only": path.resolve(root, "test/server-only-stub.ts"),
      "@payload-config": path.resolve(root, "payload.config.ts"),
      "@": root,
    },
  },
  test: {
    environment: "node",
    // Tenancy tests share one Payload instance / DB connection.
    fileParallelism: false,
    testTimeout: 60_000,
    hookTimeout: 60_000,
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
