import { StateCreator } from "zustand";

export type ProjectTableDataStates = {
  projectTableData: API.ProjectDto[];
};

export type ProjectTableDataActions = {
  initProjectTableData: (data: API.ProjectDto[]) => void;
};

export type ProjectTableDataSlice = ProjectTableDataStates &
  ProjectTableDataActions;

export const createProjectTableSlice: StateCreator<
  ProjectTableDataSlice,
  [],
  [],
  ProjectTableDataSlice
> = (set) => ({
  projectTableData: [],
  initProjectTableData: (data) => set({ projectTableData: data }),
});
