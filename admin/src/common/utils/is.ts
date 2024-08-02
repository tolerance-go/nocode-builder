import { ProjectTypeEnum } from '@/_gen/models';
import {
  DirectoryTreeNodeTypeEnum,
  ProjectDetailBase,
  ProjectTreeNodeData,
  ProjectTreeNodeFileData,
  ViewProjectDetail,
} from '@/modules/界面状态仓库模块';

export const projectDetailIsViewProjectDetail = (
  projectDetail: ProjectDetailBase,
): projectDetail is ViewProjectDetail => {
  return projectDetail.type === ProjectTypeEnum.View;
};

export const projectTreeNodeDataIsProjectTreeNodeFileData = (
  node: ProjectTreeNodeData,
): node is ProjectTreeNodeFileData => {
  return node.type === DirectoryTreeNodeTypeEnum.File;
};
