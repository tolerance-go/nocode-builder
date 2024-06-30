import { getProjects } from '@/services/api/getProjects';
import { ImmerStateCreator } from '@/utils';

export type ProjectTableDataStates = {
  projectTableData: API.ProjectDto[] | null;
  hasLoadedProjectTableData: boolean;
  isLoadingProjectTableData: boolean;
};

export type ProjectTableDataActions = {
  updateProjectTableData: (data: API.ProjectDto[]) => void;
  loadProjectTableData: () => Promise<void>;
  addProject: (project: API.ProjectDto) => void;
  updateProject: (updatedProject: API.ProjectDto) => void;
  deleteProject: (projectId: number) => void;
  findProjectById: (projectId: number) => API.ProjectDto | undefined;
};

export type ProjectTableDataSlice = ProjectTableDataStates &
  ProjectTableDataActions;

export const createProjectTableSlice: ImmerStateCreator<
  ProjectTableDataSlice,
  ProjectTableDataSlice
> = (set, get) => ({
  projectTableData: null,
  hasLoadedProjectTableData: false,
  isLoadingProjectTableData: false,
  updateProjectTableData: (data: API.ProjectDto[]) =>
    set({ projectTableData: data }),

  loadProjectTableData: async () => {
    set((state) => {
      state.isLoadingProjectTableData = true;
    });
    const projects = await getProjects({});
    set(
      (state) => {
        state.projectTableData = projects;
      },
      false,
      'loadProjectTableData',
    );
    set((state) => {
      state.isLoadingProjectTableData = false;
      state.hasLoadedProjectTableData = true;
    });
  },

  findProjectById: (projectId: number) => {
    const state = get();
    if (state.projectTableData === null) {
      throw new Error('Project table data is not initialized.');
    }
    return state.projectTableData.find((project) => project.id === projectId);
  },

  addProject: (project: API.ProjectDto) =>
    set((state) => {
      if (state.projectTableData === null) {
        throw new Error('Project table data is not initialized.');
      }
      state.projectTableData.push(project);
    }),

  updateProject: (updatedProject: API.ProjectDto) =>
    set((state) => {
      if (state.projectTableData === null) {
        throw new Error('Project table data is not initialized.');
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
        throw new Error('Project table data is not initialized.');
      }
      state.projectTableData = state.projectTableData.filter(
        (project) => project.id !== projectId,
      );
    }),
});
