import { useAppStoreBase } from '@/store';
import { isAuthRelatedPath, isSystemPath } from '@/utils';
import { buildProjectStructureTreeDataMeta } from './_utils/buildProjectStructureTreeDataMeta';

useAppStoreBase.subscribe((state, previous) => {
  const {
    initProjectTreeDataMeta,
    loadProjectGroupTableData,
    loadProjectTableData,
    setTimelinePoolCheckInterval,
  } = useAppStoreBase.getState();

  const pathnameHasChanged = state.pathname !== previous.pathname;
  const projectGroupTableDataHasChanged =
    state.projectGroupTableData !== previous.projectGroupTableData;
  const projectTableDataHasChanged =
    state.projectTableData !== previous.projectTableData;

  if (pathnameHasChanged) {
    if (
      state.pathname !== null &&
      isSystemPath(state.pathname) &&
      !isAuthRelatedPath(state.pathname)
    ) {
      if (!state.hasSetTimelinePoolCheckInterval) {
        setTimelinePoolCheckInterval();
      }

      if (
        !state.hasLoadedProjectGroupTableData &&
        !state.isLoadingProjectGroupTableData
      ) {
        loadProjectGroupTableData();
      }

      if (
        !state.hasLoadedProjectTableData &&
        !state.isLoadingProjectTableData
      ) {
        loadProjectTableData();
      }
    }
  }

  if (projectGroupTableDataHasChanged || projectTableDataHasChanged) {
    if (
      state.pathname !== null &&
      isSystemPath(state.pathname) &&
      !isAuthRelatedPath(state.pathname)
    ) {
      if (!state.hasInitProjectTreeDataMeta) {
        if (
          state.projectGroupTableData !== null &&
          state.projectTableData !== null
        ) {
          const meta = buildProjectStructureTreeDataMeta(
            state.projectGroupTableData,
            state.projectTableData,
          );

          initProjectTreeDataMeta({
            projectStructureTreeData: meta.tree,
            projectStructureTreeDataRecord: meta.dataRecord,
          });
        }
      }
    }
  }
});
