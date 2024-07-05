import { ProjectTreeNodeDataRecordItem } from '@/types';

export function 节点是不是文件夹(node: ProjectTreeNodeDataRecordItem): boolean {
  return node.type === 'folder';
}

export function 节点是不是文件(node: ProjectTreeNodeDataRecordItem): boolean {
  return node.type === 'file';
}
