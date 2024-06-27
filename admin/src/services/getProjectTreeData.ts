import { ProjectTreeDataNode } from "@/types";
import { getProjectGroups } from "./api/getProjectGroups";
import { getProjects } from "./api/getProjects";

function buildTree(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): ProjectTreeDataNode[] {
  const projectGroupMap = new Map<number, ProjectTreeDataNode>();
  // 初始化所有的 projectGroups 为 TreeNode
  projectGroups.forEach((group) => {
    projectGroupMap.set(group.id, {
      key: `group-${group.id}`,
      title: group.name,
      children: [],
      id: group.id,
      type: "folder",
    });
  });

  // 构建嵌套的 group 结构
  const tree: ProjectTreeDataNode[] = [];
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
    const projectNode: ProjectTreeDataNode = {
      key: `project-${project.id}`,
      title: project.name,
      isLeaf: true,
      id: project.id,
      type: "file",
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

export const getProjectTreeData = async () => {
  const [projects, projectGroups] = await Promise.all([
    getProjects({}),
    getProjectGroups({}),
  ]);
  return buildTree(projectGroups, projects);
};
