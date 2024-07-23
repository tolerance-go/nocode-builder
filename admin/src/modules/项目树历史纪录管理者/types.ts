import { ViewKey } from '@/common/types';
import {
  ProjectTreeNodeDataRecordItem,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../界面状态管理器模块';

export type 历史记录操作类型 = '插入' | '删除' | '移动' | '更新';

export interface 历史记录更新操作详情 {
  节点key: ViewKey;
  oldRecordItem: ProjectTreeNodeDataRecordItem;
  newRecordItem: ProjectTreeNodeDataRecordItem;
}

export interface 历史记录插入操作详情 {
  节点key: ViewKey;
  父节点key: ViewKey | null;
  index: number;
  recordItem: ProjectTreeNodeDataRecordItem;
}

export interface 历史记录删除操作详情 {
  节点keys: ViewKey[];
}

export interface 历史记录移动操作详情 {
  节点keys: ViewKey[];
  目标父节点key: ViewKey | null;
  index: number;
}

export type 历史记录操作详情 =
  | { type: '插入'; detail: 历史记录插入操作详情 }
  | { type: '删除'; detail: 历史记录删除操作详情 }
  | { type: '更新'; detail: 历史记录更新操作详情 }
  | { type: '移动'; detail: 历史记录移动操作详情 };

export type 历史记录 = {
  createTime: number;
  state: {
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
  };
  操作: 历史记录操作详情;
};

export interface 历史上下文 {
  历史堆栈: 历史记录[];
  历史指针: number;
}

export type 历史事件 =
  | { type: '撤销请求' }
  | { type: '重做请求' }
  | { type: '推入历史记录'; data: 历史记录 };
