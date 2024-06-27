import { ProjectTreeDataNode } from "@/types";

export function nodeIsFolder(node: ProjectTreeDataNode): boolean {
  return node.type === "folder";
}

export function nodeIsFile(node: ProjectTreeDataNode): boolean {
  return node.type === "file";
}
