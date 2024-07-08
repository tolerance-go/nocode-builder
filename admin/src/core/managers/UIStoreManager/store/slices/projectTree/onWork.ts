import { reduxStore } from '../..';

let previousState = reduxStore.getState(); // 初始化之前的 state

export const onWork = () => {
  reduxStore.subscribe(() => {
    const currentState = reduxStore.getState(); // 获取当前的 state

    if (
      currentState.projectTree.当前是否正在拖拽节点中 !==
      previousState.projectTree.当前是否正在拖拽节点中
    ) {
      console.log('拖拽状态改变了');
    }

    previousState = currentState; // 更新之前的 state
  });
};
