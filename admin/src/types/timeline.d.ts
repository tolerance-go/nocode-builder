export type DataBaseTimelineItemBase = {
  // 数据库表名
  tableName: "project" | "project-group";
  // 操作的时间戳
  createdAt: string;
  // 操作执行用户
  user: id;
};

export type CreateTimelineItem = DataBaseTimelineItemBase & {
  actionName: "create";
  // 创建的记录ID
  recordId: string;
  // 其他创建相关的属性
  newValues: Record<string, unknown>;
};

export type DeleteTimelineItem = DataBaseTimelineItemBase & {
  actionName: "delete";
  // 删除的记录ID
  recordId: number;
  // 删除前的记录内容
  oldValues: Record<string, unknown>;
};

export type UpdateTimelineItem = DataBaseTimelineItemBase & {
  actionName: "update";
  // 更新的记录ID
  recordId: string;
  // 更新前的记录内容
  oldValues: Record<string, unknown>;
  // 更新后的记录内容
  newValues: Record<string, unknown>;
};

// 使用联合类型
export type DataBaseTimelineItem =
  | CreateTimelineItem
  | DeleteTimelineItem
  | UpdateTimelineItem;

export type DataBaseTimelineChunk = {
  hasSyncedLocal: boolean;
  hasSyncedRemote: boolean;
  items: DataBaseTimelineItem[];
  createdAt: string;
  syncedLocalAt?: string;
  syncedRemoteAt?: string;
};
