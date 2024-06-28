import { createSelector } from "reselect";
import { buildTree } from "./_utils/buildTree";
import { selectProjectGroups } from "./selectProjectGroups";
import { selectProjects } from "./selectProjects";

// 创建 memoized 选择器
export const selectProjectTreeData = createSelector(
  [selectProjects, selectProjectGroups],
  (projects, projectGroups) => buildTree(projectGroups, projects),
);
