import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");

async function appendLine(file, record) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(path.join(DATA_DIR, file), `${JSON.stringify(record)}\n`, "utf8");
}

export async function appendEvent(record) {
  return appendLine("events.jsonl", record);
}

export async function appendEnquiry(record) {
  return appendLine("enquiries.jsonl", record);
}

export async function readLines(file) {
  try {
    const contents = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return contents
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}
