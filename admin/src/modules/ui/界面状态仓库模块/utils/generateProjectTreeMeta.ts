import {
  ProjectModelRecord,
  ProjectGroupModelRecord,
  ProjectDetailModelRecord,
  BluemapProjectModelRecord,
  DataTableProjectModelRecord,
  ViewProjectModelRecord,
} from '@/_gen/model-records';
import { ViewKey } from '@/common/types';
import {
  ProjectTreeNodeDataRecord,
  ProjectTreeDataNode,
  DirectoryTreeNodeTypeEnum,
  BluemapProjectDetail,
  DataTableProjectDetail,
  ViewProjectDetail,
} from '../types';
import { ProjectTypeEnum } from '@/_gen/models';

function getProjectDetail(
  targetProjectDetailRecord: ProjectDetailModelRecord | undefined,
  viewProjectModelRecords: ViewProjectModelRecord[],
  bluemapProjectModelRecords: BluemapProjectModelRecord[],
  dataTableProjectModelRecords: DataTableProjectModelRecord[],
): ViewProjectDetail | DataTableProjectDetail | BluemapProjectDetail {
  if (targetProjectDetailRecord?.viewProjectId) {
    const targetViewProjectDetail = viewProjectModelRecords.find(
      (item) => item.id === targetProjectDetailRecord.viewProjectId,
    );

    if (!targetViewProjectDetail) {
      throw new Error('ViewProjectDetail not found');
    }

    return {
      type: ProjectTypeEnum.View,
      platform: targetViewProjectDetail.platformType,
    } as ViewProjectDetail;
  } else if (targetProjectDetailRecord?.bluemapProjectId) {
    const targetBluemapProjectDetail = bluemapProjectModelRecords.find(
      (item) => item.id === targetProjectDetailRecord.bluemapProjectId,
    );

    if (!targetBluemapProjectDetail) {
      throw new Error('BluemapProjectDetail not found');
    }

    return {
      type: ProjectTypeEnum.Bluemap,
    } as BluemapProjectDetail;
  } else if (targetProjectDetailRecord?.dataTableProjectId) {
    const targetDataTableProjectDetail = dataTableProjectModelRecords.find(
      (item) => item.id === targetProjectDetailRecord.dataTableProjectId,
    );

    if (!targetDataTableProjectDetail) {
      throw new Error('DataTableProjectDetail not found');
    }

    return {
      type: ProjectTypeEnum.DataTable,
    } as DataTableProjectDetail;
  }

  throw new Error('ProjectDetail not found');
}

function generateProjectTreeMeta(
  projectRecords: ProjectModelRecord[],
  projectGroupRecords: ProjectGroupModelRecord[],
  projectDetailRecords: ProjectDetailModelRecord[],
  viewProjectModelRecords: ViewProjectModelRecord[],
  bluemapProjectModelRecords: BluemapProjectModelRecord[],
  dataTableProjectModelRecords: DataTableProjectModelRecord[],
) {
  const 项目树节点数据: ProjectTreeNodeDataRecord = {};
  const derived_节点到父节点的映射: Record<ViewKey, ViewKey | null> = {};
  const 项目结构树: ProjectTreeDataNode[] = [];

  // 创建项目组节点
  const groupNodes: Record<ViewKey, ProjectTreeDataNode> = {};
  projectGroupRecords.forEach((group) => {
    const groupKey = `${group.id}_group`;
    const groupNode: ProjectTreeDataNode = {
      key: groupKey,
      title: group.name,
      children: [],
    };
    groupNodes[groupKey] = groupNode;
    项目树节点数据[groupKey] = {
      backfillProjectRecordId: group.id,
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
    const projectNode: ProjectTreeDataNode = {
      key: projectKey,
      title: project.name,
      children: [], // 保证符合 ProjectStructureTreeDataNode 类型
    };

    const targetProjectDetailRecord = projectDetailRecords.find(
      (item) => item.id === project.projectDetailId,
    );

    const projectDetail = getProjectDetail(
      targetProjectDetailRecord,
      viewProjectModelRecords,
      bluemapProjectModelRecords,
      dataTableProjectModelRecords,
    );

    项目树节点数据[projectKey] = {
      backfillProjectRecordId: project.id,
      title: project.name,
      type: DirectoryTreeNodeTypeEnum.File,
      projectType: project.type,
      projectDetail,
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

  // 递归排序函数，使项目组在项目之前
  function sortTreeNodes(nodes: ProjectTreeDataNode[]) {
    nodes.sort((a, b) => {
      const aData = 项目树节点数据[a.key];
      const bData = 项目树节点数据[b.key];

      if (
        aData.type === DirectoryTreeNodeTypeEnum.Folder &&
        bData.type === DirectoryTreeNodeTypeEnum.File
      ) {
        return -1;
      }
      if (
        aData.type === DirectoryTreeNodeTypeEnum.File &&
        bData.type === DirectoryTreeNodeTypeEnum.Folder
      ) {
        return 1;
      }
      return 0;
    });

    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortTreeNodes(node.children);
      }
    });
  }

  // 对项目结构树进行递归排序
  sortTreeNodes(项目结构树);

  return {
    项目树节点数据,
    项目结构树,
    derived_节点到父节点的映射,
  };
}

export { generateProjectTreeMeta };
