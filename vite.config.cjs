import { defineConfig } from "vite";
import path from "path";
import packageJson from "./package.json";

const getPackageName = () => {
  return "bangle-io-config-template";
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
};

export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageName(),
      formats: ["es", "cjs"],
      fileName: (format) => fileName[format],
    },
  },
});
