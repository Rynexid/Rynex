import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__dirname:", __dirname);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

try {
  const config = compat.config({
    extends: ["next/core-web-vitals"],
  });
  console.log("Config loaded:", config.length);
} catch (e) {
  console.error("Error:", e.message);
}
