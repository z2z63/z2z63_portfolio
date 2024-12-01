import { Center } from "@/app/Center";
import { marked } from "marked";
import * as fs from "node:fs/promises";
import path from "node:path";

export default async function Home() {
  const filePath = path.join(process.cwd(), "portfolio.md");
  let content: string;
  try {
    const data = await fs.readFile(filePath, "utf8");
    content = await marked(data, {
      async: true,
      gfm: true,
      breaks:true
    });
  } catch (err) {
    console.error("Error reading file:", err);
    content = "read portfolio.md failed";
  }
  return <Center rawHtml={content} />;
}
