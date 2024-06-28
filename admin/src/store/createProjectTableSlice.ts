import { getProjects } from "@/services/api/getProjects";
import { ImmerStateCreator } from "@/utils";

export type ProjectTableDataStates = {
  projectTableData: API.ProjectDto[] | null;
  hasLoadProjectTableData: boolean;
  loadProjectTableDataLoading: boolean;
};

export type ProjectTableDataActions = {
  updateProjectTableData: (data: API.ProjectDto[]) => void;
  loadProjectTableData: () => Promise<void>;
  addProject: (project: API.ProjectDto) => void;
  updateProject: (updatedProject: API.ProjectDto) => void;
  deleteProject: (projectId: number) => void;
};

export type ProjectTableDataSlice = ProjectTableDataStates &
  ProjectTableDataActions;

export const createProjectTableSlice: ImmerStateCreator<
  ProjectTableDataSlice,
  ProjectTableDataSlice
> = (set) => ({
  projectTableData: null,
  hasLoadProjectTableData: false,
  loadProjectTableDataLoading: false,

  updateProjectTableData: (data: API.ProjectDto[]) =>
    set({ projectTableData: data }),

  loadProjectTableData: async () => {
    set((state) => {
      state.loadProjectTableDataLoading = true;
    });
    const projects = await getProjects({});
    set((state) => {
      state.projectTableData = projects;
      state.hasLoadProjectTableData = true;
      state.loadProjectTableDataLoading = false;
    });
  },

  addProject: (project: API.ProjectDto) =>
    set((state) => {
      if (state.projectTableData === null) {
        throw new Error("Project table data is not initialized.");
      }
      state.projectTableData.push(project);
    }),

  updateProject: (updatedProject: API.ProjectDto) =>
    set((state) => {
      if (state.projectTableData === null) {
        throw new Error("Project table data is not initialized.");
      }
      const index = state.projectTableData.findIndex(
        (project) => project.id === updatedProject.id,
      );
      if (index !== -1) {
        state.projectTableData[index] = updatedProject;
      }
    }),

  deleteProject: (projectId: number) =>
    set((state) => {
      if (state.projectTableData === null) {
        throw new Error("Project table data is not initialized.");
      }
      state.projectTableData = state.projectTableData.filter(
        (project) => project.id !== projectId,
      );
    }),
});
