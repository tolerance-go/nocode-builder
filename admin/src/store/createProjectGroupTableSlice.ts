import { getProjectGroups } from "@/services/api/getProjectGroups";
import { ImmerStateCreator } from "@/utils";

export type ProjectGroupTableDataStates = {
  projectGroupTableData: API.ProjectGroupDto[];
};

export type ProjectGroupTableDataActions = {
  initProjectGroupTableData: (data: API.ProjectGroupDto[]) => void;
  loadProjectGroupTableData: () => Promise<void>;
};

export type ProjectGroupTableDataSlice = ProjectGroupTableDataStates &
  ProjectGroupTableDataActions;

export const createProjectGroupTableSlice: ImmerStateCreator<
  ProjectGroupTableDataSlice,
  ProjectGroupTableDataSlice
> = (set) => ({
  projectGroupTableData: [],
  initProjectGroupTableData: (data) =>
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
