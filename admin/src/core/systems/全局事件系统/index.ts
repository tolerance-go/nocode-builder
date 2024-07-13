import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '@/core/managers/UIStoreManager/types';
import { 历史记录 } from '@/core/managers/项目树历史纪录管理者';
import { System } from '@/types';
import Emittery from 'emittery';

export type 全局事件映射 = {
  '界面状态管理者/新增节点': {
    nodeKey: string;
    nodeData: ProjectTreeNodeDataRecordItem;
    parentKey: string | null;
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
    index: number;
  };
  '界面状态管理者/修改节点': {
    nodeKey: string;
    oldTreeNodeData: ProjectTreeNodeDataRecordItem;
    newTreeNodeData: ProjectTreeNodeDataRecordItem;
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
  };
  '界面视图管理者/用户撤销项目树': undefined;
  '界面视图管理者/用户重做项目树': undefined;
  '项目树历史记录管理者/指针移动': {
    历史堆栈: 历史记录[];
    历史指针: number;
  };
};

export type UnsubscribeFn = () => void;

// 定义事件缓存项的类型
type EventCacheItem<T> = {
  [K in keyof T]: { eventName: K; eventData: T[K] };
}[keyof T];

export class 全局事件系统<T extends Record<string, unknown> = 全局事件映射>
  implements System
{
  private emitter = new Emittery<T>();
  private eventCache: EventCacheItem<T>[] = [];
  private isLaunched = false;

  public async launch() {
    this.isLaunched = true;

    // 按顺序发送缓存的事件
    for (const { eventName, eventData } of this.eventCache) {
      await this.emitter.emit(eventName, eventData);
    }

    // 清空缓存
    this.eventCache = [];
  }

  public on<EventName extends keyof T>(
    eventName: EventName,
    listener: (eventData: T[EventName]) => void | Promise<void>,
  ): UnsubscribeFn {
    return this.emitter.on(eventName, listener);
  }

  public off<EventName extends keyof T>(
    eventName: EventName,
    listener: (eventData: T[EventName]) => void | Promise<void>,
  ): void {
    return this.emitter.off(eventName, listener);
  }

  public async emit<EventName extends keyof T>(
    eventName: EventName,
    eventData: T[EventName],
  ): Promise<void> {
    if (this.isLaunched) {
      return this.emitter.emit(eventName, eventData);
    } else {
      // 缓存事件
      this.eventCache.push({ eventName, eventData } as EventCacheItem<T>);
    }
  }
}
