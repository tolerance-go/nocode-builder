import { getProjectGroups } from "@/services/api/getProjectGroups";
import { ImmerStateCreator } from "@/utils";

export type ProjectGroupTableDataStates = {
  projectGroupTableData: API.ProjectGroupDto[] | null;
  hasLoadProjectGroupTableData: boolean;
  loadProjectGroupTableDataLoading: boolean;
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
  hasLoadProjectGroupTableData: false,
  loadProjectGroupTableDataLoading: false,
  updateProjectGroupTableData: (data) =>
    set((state) => {
      state.projectGroupTableData = data;
    }),
  loadProjectGroupTableData: async () => {
    set((state) => {
      state.loadProjectGroupTableDataLoading = true;
    });
    const data = await getProjectGroups({});
    set((state) => {
      state.projectGroupTableData = data;
      state.hasLoadProjectGroupTableData = true;
      state.loadProjectGroupTableDataLoading = false;
    });
  },
});
