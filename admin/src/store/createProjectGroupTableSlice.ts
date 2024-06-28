import { getProjectGroups } from "@/services/api/getProjectGroups";
import { ImmerStateCreator } from "@/utils";

export type ProjectGroupTableDataStates = {
  projectGroupTableData: API.ProjectGroupDto[] | null;
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
  updateProjectGroupTableData: (data) =>
    set((state) => {
      state.projectGroupTableData = data;
    }),
  loadProjectGroupTableData: async () => {
    const data = await getProjectGroups({});
    set((state) => {
      state.projectGroupTableData = data;
    });
  },
});
