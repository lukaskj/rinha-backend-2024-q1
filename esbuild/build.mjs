import { esbuildDecorators } from "@anatine/esbuild-decorators";
import * as esbuild from "esbuild";

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  // outfile: "dist/index.mjs",
  bundle: true,
  treeShaking: true,
  minify: false,
  // platform: "node",
  format: "esm",
  // target: "esnext",
  sourcemap: true,
  keepNames: true,
  logLevel: "info",
  plugins: [esbuildDecorators()],
};

await esbuild.build({
  ...sharedConfig,
  format: "cjs",
  platform: "node",
  outfile: "dist/index.js",
});