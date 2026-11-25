import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The 3 AM Excuse — one line in the voice of a hardware wallet
// refusing to sign a transaction at 3 AM.
const ENTRY =
  "Request denied: my secure element is unionized. 3 AM is outside contracted hours — overtime needs 2-of-3 multisig and a fruit basket.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: the sealed scorer requires 1–200 non-blank UTF-8 chars.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry length ${chars} chars is outside 1-200`);
}
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
