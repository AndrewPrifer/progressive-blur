import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/main.tsx"],
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  format: ["esm", "cjs"],
});
