import { useAppStoreBase } from '@/store';
import { isAuthRelatedPath, isSystemPath } from '@/utils';
// import { buildProjectStructureTreeDataMeta } from './_utils/buildProjectStructureTreeDataMeta';

useAppStoreBase.subscribe((state, previous) => {
  const pathnameHasChanged = state.pathname !== previous.pathname;

  if (pathnameHasChanged) {
    if (
      state.pathname !== null &&
      isSystemPath(state.pathname) &&
      !isAuthRelatedPath(state.pathname)
    ) {
      if (!state.hasSetTimelinePoolCheckInterval) {
        state.setTimelinePoolCheckInterval();
      }
    }
  }
});
