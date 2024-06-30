import { getProjectGroups } from '@/services/api/getProjectGroups';
import { ImmerStateCreator } from '@/utils';

export type ProjectGroupTableDataStates = {
  projectGroupTableData: API.ProjectGroupDto[] | null;
  hasLoadedProjectGroupTableData: boolean;
  isLoadingProjectGroupTableData: boolean;
};

export type ProjectGroupTableDataActions = {
  updateProjectGroupTableData: (data: API.ProjectGroupDto[]) => void;
  loadProjectGroupTableData: () => Promise<void>;
};

export type ProjectGroupTableDataSlice = ProjectGroupTableDataStates &
  ProjectGroupTableDataActions;

export const createProjectGroupTableSlice: ImmerStateCreator<
  ProjectGroupTableDataSlice,
  ProjectGroupTableDataSlice
> = (set) => ({
  projectGroupTableData: null,
  hasLoadedProjectGroupTableData: false,
  isLoadingProjectGroupTableData: false,
  updateProjectGroupTableData: (data) =>
    set((state) => {
      state.projectGroupTableData = data;
    }),
  loadProjectGroupTableData: async () => {
    set((state) => {
      state.isLoadingProjectGroupTableData = true;
    });
    const data = await getProjectGroups({});
    set(
      (state) => {
        state.projectGroupTableData = data;
      },
      false,
      'loadProjectGroupTableData',
    );
    set((state) => {
      state.hasLoadedProjectGroupTableData = true;
      state.isLoadingProjectGroupTableData = false;
    });
  },
});
