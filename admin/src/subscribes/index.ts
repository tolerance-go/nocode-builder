import { useAppStoreBase } from '@/store';
import { isAuthRelatedPath, isSystemPath } from '@/utils';
// import { buildProjectStructureTreeDataMeta } from './_utils/buildProjectStructureTreeDataMeta';
import { storeDb } from '@/db';

function filterNonFunctionFields<T extends object>(
  obj: T,
): {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : T[K];
} {
  const result = {} as {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : T[K];
  };
  for (const key in obj) {
    if (typeof obj[key] !== 'function') {
      result[key] = obj[key] as T[typeof key] extends (
        ...args: unknown[]
      ) => unknown
        ? never
        : T[typeof key];
    }
  }
  return result;
}

useAppStoreBase.subscribe((state, previous) => {
  const pathnameHasChanged = state.pathname !== previous.pathname;

  // eslint-disable-next-line no-empty
  if (state.externalCurrentVersion < state.externalLatestVersion) {
    // 当前最新的快照是从历史中拿出来的
  } else {
    if (state.version > previous.version) {
      storeDb.stores.add({
        data: filterNonFunctionFields({
          ...state,
          latestVersion: state.version,
        }),
      });
    }
  }

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

  // if (projectGroupTableDataHasChanged || projectTableDataHasChanged) {
  //   if (
  //     state.pathname !== null &&
  //     isSystemPath(state.pathname) &&
  //     !isAuthRelatedPath(state.pathname)
  //   ) {
  //     if (!state.hasInitProjectTreeDataMeta) {
  //       if (
  //         state.projectGroupTableData !== null &&
  //         state.projectTableData !== null
  //       ) {
  //         const meta = buildProjectStructureTreeDataMeta(
  //           state.projectGroupTableData,
  //           state.projectTableData,
  //         );

  //         initProjectTreeDataMeta({
  //           projectStructureTreeData: meta.tree,
  //           projectStructureTreeDataRecord: meta.dataRecord,
  //         });
  //       }
  //     }
  //   }
  // }
});
