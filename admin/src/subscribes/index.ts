import { useAppStoreBase } from "@/store";
import { isAuthRelatedPath, isSystemPath } from "@/utils";
import { buildProjectStructureTreeDataMeta } from "./_utils/buildProjectStructureTreeDataMeta";

const firstNameSubscriber = (
  ...[state, previous]: Parameters<
    Parameters<typeof useAppStoreBase.subscribe>[0]
  >
) => {
  if (state.firstName !== previous.firstName) {
    useAppStoreBase.getState().updateLastName(state.firstName);
  }
};

useAppStoreBase.subscribe((state, previous) => {
  firstNameSubscriber(state, previous);
  const {
    initProjectTreeDataMeta: initProjectStructureTreeDataMeta,
    loadProjectGroupTableData,
    loadProjectTableData,
  } = useAppStoreBase.getState();
  if (state.pathname !== null) {
    if (isSystemPath(state.pathname)) {
      // eslint-disable-next-line no-empty
      if (isAuthRelatedPath(state.pathname)) {
      } else {
        if (
          !state.hasLoadProjectGroupTableData &&
          !state.loadProjectGroupTableDataLoading
        ) {
          loadProjectGroupTableData();
        }

        if (
          !state.hasLoadProjectTableData &&
          !state.loadProjectTableDataLoading
        ) {
          loadProjectTableData();
        }

        if (
          !state.hasInitProjectTreeDataMeta &&
          state.projectGroupTableData !== null &&
          state.projectTableData !== null
        ) {
          const meta = buildProjectStructureTreeDataMeta(
            state.projectGroupTableData,
            state.projectTableData,
          );

          initProjectStructureTreeDataMeta({
            projectStructureTreeData: meta.tree,
            projectStructureTreeDataRecord: meta.dataRecord,
          });
        }
      }
    }
  }
});
