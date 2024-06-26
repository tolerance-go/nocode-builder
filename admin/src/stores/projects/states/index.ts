import { getProjectGroups } from "@/services/api/getProjectGroups";
import { getProjects } from "@/services/api/getProjects";
import { CustomTreeDataNode } from "@/types/tree";
import { proxy } from "valtio";

export const projectGroupMap = new Map<number, CustomTreeDataNode>();

function buildTree(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): CustomTreeDataNode[] {
  // 初始化所有的 projectGroups 为 TreeNode
  projectGroups.forEach((group) => {
    projectGroupMap.set(group.id, {
      key: `group-${group.id}`,
      title: group.name,
      children: [],
      id: group.id,
    });
  });

  // 构建嵌套的 group 结构
  const tree: CustomTreeDataNode[] = [];
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
    const projectNode: CustomTreeDataNode = {
      key: `project-${project.id}`,
      title: project.name,
      isLeaf: true,
      id: project.id,
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

const fetchTreeData = async () => {
  const [projects, projectGroups] = await Promise.all([
    getProjects({}),
    getProjectGroups({}),
  ]);
  return buildTree(projectGroups, projects);
};

// 定义状态
export const states = proxy({
  containerHeight: Promise.resolve(0),
  treeData: fetchTreeData(),
  expandedKeys: [] as React.Key[],
  selectedKey: null as React.Key | null,
  addFolderLoading: false,
  addFileLoading: false,
});
