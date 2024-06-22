import { promises as fs } from "fs";
import path from "path";
import yaml from "js-yaml";
import { glob } from "glob";

const workspaceFile = path.resolve("./pnpm-workspace.yaml");
const lockFile = path.resolve("./pnpm-lock.yaml");

async function readYaml(file) {
  const content = await fs.readFile(file, "utf8");
  return yaml.load(content);
}

async function copyFiles(packageDir) {
  const tempDir = path.join(packageDir, "temp");
  await fs.mkdir(tempDir, { recursive: true });
  await fs.copyFile(lockFile, path.join(tempDir, "pnpm-lock.yaml"));
  await fs.copyFile(workspaceFile, path.join(tempDir, "pnpm-workspace.yaml"));
  console.log(`Copied files to ${tempDir}`);
}

async function main() {
  try {
    console.log("Reading workspace configuration...");
    const workspace = await readYaml(workspaceFile);
    console.log("Workspace configuration:", workspace);

    if (workspace && workspace.packages) {
      for (const pkgPattern of workspace.packages) {
        console.log(`Processing pattern: ${pkgPattern}`);
        const dirs = glob.sync(pkgPattern, { cwd: path.resolve("./") });
        console.log(`Matches for pattern ${pkgPattern}:`, dirs);

        for (const dir of dirs) {
          const pkg = path.resolve("./", dir);
          console.log(`Checking directory: ${pkg}`);
          if (await fs.stat(pkg).catch(() => false)) {
            await copyFiles(pkg);
          } else {
            console.log(`Directory ${pkg} not found!`);
          }
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
