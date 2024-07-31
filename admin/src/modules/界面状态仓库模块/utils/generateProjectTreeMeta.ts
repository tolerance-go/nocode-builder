import {
  ProjectModelRecord,
  ProjectGroupModelRecord,
} from '@/_gen/model-records';
import { ViewKey } from '@/common/types';
import {
  ProjectTreeNodeDataRecord,
  ProjectStructureTreeDataNode,
  DirectoryTreeNodeTypeEnum,
} from '../types';

function generateProjectTreeMeta(
  projectRecords: ProjectModelRecord[],
  projectGroupRecords: ProjectGroupModelRecord[],
) {
  const 项目树节点数据: ProjectTreeNodeDataRecord = {};
  const derived_节点到父节点的映射: Record<ViewKey, ViewKey | null> = {};
  const 项目结构树: ProjectStructureTreeDataNode[] = [];

  // 创建项目组节点
  const groupNodes: Record<ViewKey, ProjectStructureTreeDataNode> = {};
  projectGroupRecords.forEach((group) => {
    const groupKey = `${group.id}_group`;
    const groupNode: ProjectStructureTreeDataNode = {
      key: groupKey,
      title: group.name,
      children: [],
    };
    groupNodes[groupKey] = groupNode;
    项目树节点数据[groupKey] = {
      title: group.name,
      type: DirectoryTreeNodeTypeEnum.Folder,
    };
    derived_节点到父节点的映射[groupKey] = group.parentGroupId
      ? `${group.parentGroupId}_group`
      : null;
  });

  // 创建项目节点并放入对应的项目组中
  projectRecords.forEach((project) => {
    const projectKey = `${project.id}_project`;
    const projectNode: ProjectStructureTreeDataNode = {
      key: projectKey,
      title: project.name,
      children: [], // 保证符合 ProjectStructureTreeDataNode 类型
    };
    项目树节点数据[projectKey] = {
      title: project.name,
      type: DirectoryTreeNodeTypeEnum.File,
      projectType: project.type,
    };
    derived_节点到父节点的映射[projectKey] = project.projectGroupId
      ? `${project.projectGroupId}_group`
      : null;

    if (project.projectGroupId) {
      groupNodes[`${project.projectGroupId}_group`].children?.push(projectNode);
    } else {
      项目结构树.push(projectNode);
    }
  });

  // 将项目组节点放入树结构中
  Object.values(groupNodes).forEach((groupNode) => {
    const parentGroupId = projectGroupRecords.find(
      (group) => `${group.id}_group` === groupNode.key,
    )?.parentGroupId;
    if (parentGroupId) {
      groupNodes[`${parentGroupId}_group`].children?.push(groupNode);
    } else {
      项目结构树.push(groupNode);
    }
  });

  return {
    项目树节点数据,
    项目结构树,
    derived_节点到父节点的映射,
  };
}

export { generateProjectTreeMeta };
