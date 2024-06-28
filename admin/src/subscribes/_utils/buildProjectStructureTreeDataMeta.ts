import { ProjectStructureTreeDataNode } from "@/types";

export function buildProjectStructureTreeDataMeta(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): ProjectStructureTreeDataNode[] {
  const projectGroupMap = new Map<number, ProjectStructureTreeDataNode>();
  // 初始化所有的 projectGroups 为 TreeNode
  projectGroups.forEach((group) => {
    projectGroupMap.set(group.id, {
      key: `group-${group.id}`,
      children: [],
      isLeaf: false,
    });
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

  // 将 projects 放到对应的 group 下
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
  });

  return tree;
}
