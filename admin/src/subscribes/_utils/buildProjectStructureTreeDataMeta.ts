import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from "@/types";

export function buildProjectStructureTreeDataMeta(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): {
  tree: ProjectStructureTreeDataNode[];
  dataRecord: ProjectTreeNodeDataRecord;
} {
  const projectGroupMap = new Map<number, ProjectStructureTreeDataNode>();
  const dataRecord: ProjectTreeNodeDataRecord = {};

  // 初始化所有的 projectGroups 为 TreeNode 并填充 dataRecord
  projectGroups.forEach((group) => {
    projectGroupMap.set(group.id, {
      key: `group-${group.id}`,
      children: [],
      isLeaf: false,
    });
    dataRecord[`group-${group.id}`] = {
      title: group.name,
      id: group.id,
      type: "folder",
    };
  });

  // 构建嵌套的 group 结构
  const tree: ProjectStructureTreeDataNode[] = [];
  projectGroups.forEach((group) => {
    const parentGroup =
      group.parentGroupId && projectGroupMap.get(group.parentGroupId);
    if (group.parentGroupId && parentGroup) {
      if (!parentGroup.children) {
        parentGroup.children = [];
      }
      parentGroup.children.push(projectGroupMap.get(group.id)!);
    } else {
      tree.push(projectGroupMap.get(group.id)!);
    }
  });

  // 将 projects 放到对应的 group 下并填充 dataRecord
  projects.forEach((project) => {
    const projectNode: ProjectStructureTreeDataNode = {
      key: `project-${project.id}`,
      isLeaf: true,
    };
    const parentGroup =
      project.projectGroupId && projectGroupMap.get(project.projectGroupId);
    if (project.projectGroupId && parentGroup) {
      if (!parentGroup.children) {
        parentGroup.children = [];
      }
      parentGroup.children.push(projectNode);
    }
    dataRecord[`project-${project.id}`] = {
      title: project.name,
      id: project.id,
      type: "file",
    };
  });

  return { tree, dataRecord };
}
