import { promises as fs } from "fs";
import path from "path";
import yaml from "js-yaml";

const workspaceFile = "pnpm-workspace.yaml";
const lockFile = "pnpm-lock.yaml";
const packages = [];

async function readYaml(file) {
  const content = await fs.readFile(file, "utf8");
  return yaml.load(content);
}

async function copyFiles(packageDir) {
  const tempDir = path.join(packageDir, "temp");
  await fs.mkdir(tempDir, { recursive: true });
  await fs.copyFile(lockFile, path.join(tempDir, lockFile));
  await fs.copyFile(workspaceFile, path.join(tempDir, workspaceFile));
  console.log(`Copied files to ${tempDir}`);
}

async function main() {
  try {
    const workspace = await readYaml(workspaceFile);

    if (workspace && workspace.packages) {
      for (const pkg of workspace.packages) {
        const dirs = await fs.glob(pkg);
        packages.push(...dirs);
      }

      for (const pkg of packages) {
        if (await fs.stat(pkg).catch(() => false)) {
          await copyFiles(pkg);
        } else {
          console.log(`Directory ${pkg} not found!`);
        }
      }
    } else {
      console.log("No packages found in pnpm-workspace.yaml");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
