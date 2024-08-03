import { ProjectTypeEnum } from '@/_gen/models';
import {
  DirectoryTreeNodeTypeEnum,
  ProjectDetailBase,
  ProjectTreeNodeData,
  ProjectTreeNodeFileData,
  ViewProjectDetail,
  WidgetSlotTreeNodeData,
  WidgetTreeNodeData,
  WidgetTreeNodeDataBase,
  WidgetTreeNodeType,
} from '@/modules/ui/界面状态仓库模块';

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

export const widgetTreeNodeDataBaseIsWidgetTreeNodeData = (
  node: WidgetTreeNodeDataBase,
): node is WidgetTreeNodeData => {
  return node.type === WidgetTreeNodeType.Widget;
};

export const widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData = (
  node: WidgetTreeNodeDataBase,
): node is WidgetSlotTreeNodeData => {
  return node.type === WidgetTreeNodeType.Slot;
};
