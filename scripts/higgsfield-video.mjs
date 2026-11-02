// Generates the hero background loop with the Higgsfield API and saves it to inspiration/higgsfield/.
// Run: node --env-file=.env.local scripts/higgsfield-video.mjs ["optional prompt"]
import { mkdir, writeFile } from "node:fs/promises";

const API = "https://api.higgsfield.ai";
// shortcut: endpoint and body follow the Higgsfield quick-start example, not a verified schema; check the model page if the API rejects them.
const MODEL = process.env.HF_MODEL || "bytedance/seedance-2.0/text-to-video";
const PROMPT =
  process.argv[2] ||
  "Seamless looping abstract background. A slow field of tiny glowing particles drifting in gentle waves across near-black space, " +
  "deep navy and cobalt blue light, a faint crimson red glow on one edge, thin vertical light lines fading in and out. " +
  "Very slow, calm, cinematic, shallow depth of field. No text, no people, no logos. Camera locked, start and end frames match.";

const key = process.env.HF_API_KEY?.trim();
if (!key) {
  console.error("HF_API_KEY is empty. Paste your key into .env.local, then run again.");
  process.exit(1);
}
const headers = { Authorization: `Key ${key}`, "Content-Type": "application/json" };

const submit = await fetch(`${API}/${MODEL}`, {
  method: "POST",
  headers,
  body: JSON.stringify({ prompt: PROMPT, resolution: "720p", duration: 5, aspect_ratio: "16:9", generate_audio: false }),
});
const job = await submit.json().catch(() => ({}));
if (!submit.ok || !job.request_id) {
  console.error(`Submit failed (HTTP ${submit.status}):`, JSON.stringify(job));
  process.exit(1);
}
// Not retried on purpose: a second POST would charge for a second video.
console.log(`Queued ${job.request_id}. Checking every 5s (up to 10 min)...`);

const deadline = Date.now() + 10 * 60_000;
let status;
while (Date.now() < deadline) {
  await new Promise((r) => setTimeout(r, 5000));
  const res = await fetch(`${API}/requests/${job.request_id}/status`, { headers });
  status = await res.json().catch(() => ({}));
  if (["completed", "failed", "nsfw", "canceled"].includes(status.status)) break;
  process.stdout.write(`  ${status.status ?? `HTTP ${res.status}`}\n`);
}

if (status?.status !== "completed" || !status.video?.url) {
  console.error(`Did not finish: ${status?.status ?? "timed out"}. Request id: ${job.request_id}`, JSON.stringify(status));
  process.exit(1);
}

await mkdir("inspiration/higgsfield", { recursive: true });
const out = `inspiration/higgsfield/loop-${Date.now()}.mp4`;
const video = await fetch(status.video.url);
if (!video.ok) {
  console.error(`Video finished but download failed (HTTP ${video.status}). URL: ${status.video.url}`);
  process.exit(1);
}
await writeFile(out, Buffer.from(await video.arrayBuffer()));
console.log(`Saved ${out}`);
