import { promises as fs } from "fs";
import path from "path";

async function processFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await processFiles(fullPath);
    } else if (file.isFile() && fullPath.endsWith(".ts")) {
      let content = await fs.readFile(fullPath, "utf-8");

      // 移除开头的第一个 // @ts-ignore 注释
      content = content.replace(/^(\/\/\s*@ts-ignore\s*\n?)/, "");

      // 移除开头的 /* eslint-disable */ 注释
      content = content.replace(/^(\/\*\s*eslint-disable\s*\*\/\s*\n?)/, "");

      // 将 any 类型替换为 unknown
      content = content.replace(/\bany\b/g, "unknown");

      // 将 <any> 替换为 <unknown>
      content = content.replace(/<\s*any\s*>/g, "<unknown>");

      await fs.writeFile(fullPath, content, "utf-8");
      console.log(`Processed ${fullPath}`);
    }
  }
}

const targetDirectory = path.resolve('src/services/api'); // 替换为你的 TypeScript 文件所在目录

processFiles(targetDirectory)
  .then(() => console.log("All files processed successfully."))
  .catch((err) => console.error("Error processing files:", err));
