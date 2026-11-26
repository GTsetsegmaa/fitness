import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Setup follows node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md, except
// "@/..." imports use Vite's built-in tsconfig paths support instead of vite-tsconfig-paths.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom", // a fake browser (document, window) running inside Node
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
