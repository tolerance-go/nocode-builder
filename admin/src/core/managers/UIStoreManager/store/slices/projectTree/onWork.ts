import { reduxStore } from '../..';

export const onWork = (store: typeof reduxStore) => {
  const state = store.getState();
  console.log(state);
};
