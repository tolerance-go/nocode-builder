import { Manager } from '@/types';
import React, { createElement } from 'react';
import { 鼠标跟随组件id联合类型, 鼠标跟随组件参数通过id获取 } from './types';
import { 其他拖拽显示的组件 } from './其他拖拽显示的组件';
import { 拖拽提示显示组件 } from './拖拽提示显示组件';

export class 跟随鼠标显示内容管理者 implements Manager {
  private working: boolean = false;
  isWorking(): boolean {
    return this.working;
  }

  private static 跟随组件id到组件映射: {
    [K in 鼠标跟随组件id联合类型]: React.FC<鼠标跟随组件参数通过id获取<K>>;
  } = {
    拖拽中显示的组件id: 拖拽提示显示组件,
    其他拖拽显示的组件id: 其他拖拽显示的组件,
  };

  根据id获取组件<ID extends 鼠标跟随组件id联合类型>(
    id: ID,
    props: 鼠标跟随组件参数通过id获取<ID>,
  ) {
    const Component = 跟随鼠标显示内容管理者.跟随组件id到组件映射[id];
    return createElement(Component, props);
  }

  async work() {
    this.working = true;
  }
}

export * from './types';
