import { ProjectTypeEnum } from '@/_gen/models';
import {
  ProjectDetailBase,
  ProjectTreeNodeData,
  ViewProjectDetail,
} from '../../界面状态仓库模块/types';

export function 节点是不是文件夹(node: ProjectTreeNodeData): boolean {
  return node.type === 'folder';
}

export function 节点是不是文件(node: ProjectTreeNodeData): boolean {
  return node.type === 'file';
}

export const projectDetailIsViewProjectDetail = (
  projectDetail: ProjectDetailBase,
): projectDetail is ViewProjectDetail => {
  return projectDetail.type === ProjectTypeEnum.View;
};
