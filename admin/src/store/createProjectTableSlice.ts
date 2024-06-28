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
    set({
      projectTableData: projects,
    });
  },
  addProject: (project: API.ProjectDto) =>
    set((state) => {
      state.projectTableData.push(project);
    }),
  updateProject: (updatedProject: API.ProjectDto) =>
    set((state) => {
      const index = state.projectTableData.findIndex(
        (project) => project.id === updatedProject.id,
      );
      if (index !== -1) {
        state.projectTableData[index] = updatedProject;
      }
    }),
  deleteProject: (projectId: number) =>
    set((state) => {
      state.projectTableData = state.projectTableData.filter(
        (project) => project.id !== projectId,
      );
    }),
});
