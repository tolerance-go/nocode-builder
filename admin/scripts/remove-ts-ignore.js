import { promises as fs } from "fs";
import path from "path";

async function removeTsIgnoreFromFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await removeTsIgnoreFromFiles(fullPath);
    } else if (file.isFile() && fullPath.endsWith(".ts")) {
      let content = await fs.readFile(fullPath, "utf-8");

      // 只移除开头的第一个 // @ts-ignore 注释
      content = content.replace(/^(\/\/\s*@ts-ignore\s*\n?)/, "");

      await fs.writeFile(fullPath, content, "utf-8");
      console.log(`Processed ${fullPath}`);
    }
  }
}

const targetDirectory = path.resolve('src/services/api'); // 替换为你的 TypeScript 文件所在目录

removeTsIgnoreFromFiles(targetDirectory)
  .then(() => console.log("All files processed successfully."))
  .catch((err) => console.error("Error processing files:", err));
