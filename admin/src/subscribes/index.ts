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

  if (state.pathname !== null) {
    if (isSystemPath(state.pathname)) {
      // eslint-disable-next-line no-empty
      if (isAuthRelatedPath(state.pathname)) {
      } else {
        if (
          state.projectGroupTableData &&
          previous.projectGroupTableData === null
        ) {
          if (state.projectTableData && previous.projectTableData === null) {
            const projectStructureTreeData = buildProjectStructureTreeDataMeta(
              state.projectGroupTableData,
              state.projectTableData,
            );

            useAppStoreBase
              .getState()
              .initProjectStructureTreeData(projectStructureTreeData);
          }
        }
      }
    }
  }
});
