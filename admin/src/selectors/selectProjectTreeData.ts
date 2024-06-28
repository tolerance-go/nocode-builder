import { createSelector } from "reselect";
import { buildTree } from "./_utils/buildTree";
import { ProjectTreeStates } from "@/store/projectTree";

const selectProjects = (state: ProjectTreeStates) => state.projects;
const selectProjectGroups = (state: ProjectTreeStates) => state.projectGroups;

// 创建 memoized 选择器
export const selectProjectTreeData = createSelector(
  [selectProjects, selectProjectGroups],
  (projects, projectGroups) => buildTree(projectGroups, projects),
);
