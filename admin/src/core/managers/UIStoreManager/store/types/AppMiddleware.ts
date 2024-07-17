import { MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './creates';
import { AppActions } from './AppActions';

export type AppMiddleware = (
  api: MiddlewareAPI<AppDispatch, RootState>,
) => (next: (action: AppActions) => unknown) => (action: AppActions) => unknown;
