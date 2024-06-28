import { ProjectStructureTreeDataNode } from "@/types";

export function nodeIsFolder(node: ProjectStructureTreeDataNode): boolean {
  return node.type === "folder";
}

export function nodeIsFile(node: ProjectStructureTreeDataNode): boolean {
  return node.type === "file";
}
