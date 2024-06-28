import { ProjectTreeStates } from "@/store/createProjectTreeSlice";

export const selectProjectGroups = (state: ProjectTreeStates) =>
  state.projectGroups;
