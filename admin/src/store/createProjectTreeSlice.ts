import { StateCreator } from "zustand";

export type ProjectTreeStates = {
  projects: API.ProjectDto[];
  projectGroups: API.ProjectGroupDto[];
};

export type ProjectTreeActions = {
  add: () => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: StateCreator<
  ProjectTreeSlice,
  [],
  [],
  ProjectTreeSlice
> = (set) => ({
  projects: [],
  projectGroups: [],
  add: () => {},
});
