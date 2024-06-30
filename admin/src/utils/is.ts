import { ProjectTreeNodeDataRecordItem } from '@/types';

export function nodeIsFolder(node: ProjectTreeNodeDataRecordItem): boolean {
  return node.type === 'folder';
}

export function nodeIsFile(node: ProjectTreeNodeDataRecordItem): boolean {
  return node.type === 'file';
}
