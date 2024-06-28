import { getProjects } from "@/services/api/getProjects";
import { ImmerStateCreator } from "@/utils";

export type ProjectTableDataStates = {
  projectTableData: API.ProjectDto[];
};

export type ProjectTableDataActions = {
  initProjectTableData: (data: API.ProjectDto[]) => void;
  loadProjectTableData: () => Promise<void>;
};

export type ProjectTableDataSlice = ProjectTableDataStates &
  ProjectTableDataActions;

export const createProjectTableSlice: ImmerStateCreator<
  ProjectTableDataSlice,
  ProjectTableDataSlice
> = (set) => ({
  projectTableData: [],
  initProjectTableData: (data) => set({ projectTableData: data }),
  loadProjectTableData: async () => {
    const projects = await getProjects({});
    set((state) => {
      state.projectTableData = projects;
    });
  },
});
