import { EngineBase, ModuleBase, ModuleBaseOptions } from '@/base';
import { ViewKey } from '@/common/types';
import Emittery from 'emittery';
import { ClientUserModel } from '../models/用户表模块';
import { ClientProjectGroupModel } from '../models/项目组表模块';
import { ClientProjectModel } from '../models/项目表模块';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '../界面状态仓库模块';
import { 历史记录 } from '../项目树历史纪录管理者/types';

type 项目树后台同步模块事件类型 = {
  新增项目记录成功: {
    key: ViewKey;
    record: ClientProjectModel;
  };
  新增项目组记录成功: {
    key: ViewKey;
    record: ClientProjectGroupModel;
  };
};

type UserModelTable事件类型 = {
  获取登录用户信息成功: {
    userInfo: ClientUserModel;
  };
};

type 界面状态管理者事件类型 = {
  路由更新: {
    pathname: string;
  };
  新增节点: {
    nodeKey: ViewKey;
    nodeData: ProjectTreeNodeDataRecordItem;
    parentKey: ViewKey | null;
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
    index: number;
  };
  修改节点: {
    nodeKey: ViewKey;
    oldTreeNodeData: ProjectTreeNodeDataRecordItem;
    newTreeNodeData: ProjectTreeNodeDataRecordItem;
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
  };
  删除节点: {
    nodeKeys: ViewKey[];
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
  };
  移动节点: {
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
    节点keys: ViewKey[];
    目标父节点key: ViewKey | null;
    index: number;
  };
};

type 界面视图管理者事件类型 = {
  用户撤销项目树: undefined;
  用户重做项目树: undefined;
  用户登出成功: undefined;
};

type 项目树历史记录管理者事件类型 = {
  指针移动: {
    历史堆栈: 历史记录[];
    历史指针: number;
  };
};

type 文档环境事件类型 = {
  pageLoadComplete: undefined;
};

export type 全局事件映射 = {
  [K in keyof 界面状态管理者事件类型 as `界面状态管理者/${K}`]: 界面状态管理者事件类型[K];
} & {
  [K in keyof 界面视图管理者事件类型 as `界面视图管理者/${K}`]: 界面视图管理者事件类型[K];
} & {
  [K in keyof 项目树历史记录管理者事件类型 as `项目树历史记录管理者/${K}`]: 项目树历史记录管理者事件类型[K];
} & {
  [K in keyof 文档环境事件类型 as `文档环境/${K}`]: 文档环境事件类型[K];
} & {
  [K in keyof UserModelTable事件类型 as `用户模型表/${K}`]: UserModelTable事件类型[K];
} & {
  [K in keyof 项目树后台同步模块事件类型 as `项目树后台同步模块/${K}`]: 项目树后台同步模块事件类型[K];
};

export type UnsubscribeFn = () => void;

// 定义事件缓存项的类型
type EventCacheItem<T> = {
  [K in keyof T]: { eventName: K; eventData: T[K] };
}[keyof T];

export class 事件中心系统<
  T extends Record<string, unknown> = 全局事件映射,
> extends ModuleBase {
  private static instance: 事件中心系统;

  public static getInstance<U extends Record<string, unknown> = 全局事件映射>(
    engine: EngineBase,
    options: ModuleBaseOptions = {
      invokeRequiredModules: true,
    },
  ): 事件中心系统<U> {
    if (!事件中心系统.instance) {
      事件中心系统.instance = new 事件中心系统(engine, options);
    }

    return 事件中心系统.instance as unknown as 事件中心系统<U>;
  }

  private emitter = new Emittery<T>();
  private eventCache: EventCacheItem<T>[] = [];

  constructor(
    engine: EngineBase,
    options: ModuleBaseOptions = {
      invokeRequiredModules: true,
    },
  ) {
    super(engine, options);
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
    if (this.hasStarted) {
      return this.sendEvent(eventName, eventData);
    } else {
      // 缓存事件
      this.eventCache.push({ eventName, eventData } as EventCacheItem<T>);
    }
  }

  protected async onStart() {
    // 按顺序发送缓存的事件
    for (const { eventName, eventData } of this.eventCache) {
      await this.sendEvent(eventName, eventData);
    }

    // 清空缓存
    this.eventCache = [];
  }

  // 内部方法，用于发送事件并打印
  private async sendEvent<EventName extends keyof T>(
    eventName: EventName,
    eventData: T[EventName],
  ): Promise<void> {
    console.log(`Sending event: ${String(eventName)}`, eventData);
    return await this.emitter.emit(eventName, eventData);
  }
}
