import { getProjects } from "@/services/api/getProjects";
import { StateCreator } from "zustand";

export type ProjectTableDataStates = {
  projectTableData: API.ProjectDto[];
};

export type ProjectTableDataActions = {
  initProjectTableData: (data: API.ProjectDto[]) => void;
  loadProjectTableData: () => Promise<void>;
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
  loadProjectTableData: async () => {
    const projects = await getProjects({});
    set({
      projectTableData: projects,
    });
  },
});
