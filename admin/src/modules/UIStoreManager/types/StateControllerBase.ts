import { AppStore, AppSlices } from './creates';

export abstract class StateControllerBase {
  async onCreateStore(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _reduxStore: AppStore,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slices: AppSlices,
  ): Promise<void> {}
}
