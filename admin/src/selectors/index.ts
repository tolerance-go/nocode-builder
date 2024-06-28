import { createSelector } from "reselect";
import { ProjectTreeStates } from "@/store/createProjectTreeSlice";

export const selectProjectStructureTreeData = (state: ProjectTreeStates) =>
  state.projectStructureTreeData;

export const selectProjectStructureTreeNodeDataRecord = createSelector(
  [selectProjectStructureTreeData],
  (items) => items.length,
);
