import { getProjectGroups } from "@/services/api/getProjectGroups";
import { getProjects } from "@/services/api/getProjects";
import { CustomTreeDataNode } from "@/types/tree";
import { derive } from "derive-valtio";
import { proxy } from "valtio";

function buildTree(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): CustomTreeDataNode[] {
  const projectGroupMap = new Map<number, CustomTreeDataNode>();
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
export const treeStore = proxy({
  containerHeight: Promise.resolve(0),
  treeData: fetchTreeData(),
  expandedKeys: [] as React.Key[],
  selectedKey: null as React.Key | null,
  addFolderLoading: false,
  addFileLoading: false,
});

function convertToMap(
  treeData: CustomTreeDataNode[],
): Map<string, CustomTreeDataNode> {
  const resultMap = new Map<string, CustomTreeDataNode>();

  function traverse(nodes: CustomTreeDataNode[], parentKey?: string) {
    nodes.forEach((node) => {
      node.parentKey = parentKey;
      resultMap.set(node.key, node);
      if (node.children && node.children.length > 0) {
        traverse(node.children, node.key);
      }
    });
  }

  traverse(treeData);
  return resultMap;
}

export const treeMapStore = derive({
  data: async (get) => {
    const treeData = await get(treeStore).treeData;
    return convertToMap(treeData);
  },
});
