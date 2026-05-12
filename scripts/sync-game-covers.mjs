import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const covers = [
  { slug: "assault-time", sourceImage: "assault-time" },
  { slug: "warfare-area-3", sourceImage: "warfare-area-3" },
  { slug: "bullet-fury-2", sourceImage: "bullet-fury-2" },
  { slug: "connect-2-cars", sourceImage: "connect-2-cars" },
  { slug: "jewel-legend", sourceImage: "jewel-legend" },
  { slug: "gummy-blocks-evolution", sourceImage: "gummy-blocks-evolution" },
  { slug: "truck-loader-5", sourceImage: "truck-loader-5" },
  { slug: "construct-a-bridge", sourceImage: "construct-a-bridge" },
  { slug: "the-cargo-2", sourceImage: "the-cargo-2" },
  { slug: "park-the-taxi-3", sourceImage: "park-the-taxi-3" },
  { slug: "lob-master-2021", sourceImage: "lob-master-2021" },
  { slug: "basket-swooshes", sourceImage: "basket-swooshes" },
];

const outputDir = path.resolve("public/game-covers");
const tempDir = mkdtempSync(path.join(tmpdir(), "gamenest-covers-"));

mkdirSync(outputDir, { recursive: true });

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

function runSips(args) {
  execFileSync("sips", args, { stdio: "pipe" });
}

try {
  for (const cover of covers) {
    const sourceUrl = `https://1000webgames.com/arcade/img/${cover.sourceImage}.jpg`;
    const rawFile = path.join(tempDir, `${cover.slug}-raw.jpg`);
    const outputFile = path.join(outputDir, `${cover.slug}.jpg`);

    writeFileSync(rawFile, await fetchBuffer(sourceUrl));
    runSips(["-s", "format", "jpeg", rawFile, "--out", rawFile]);
    runSips(["-z", "480", "756", rawFile, "--out", outputFile]);
    console.log(`synced ${cover.slug}`);
  }
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
