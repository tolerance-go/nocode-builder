export type DataBaseTimelineItemBase = {
  tableName: string;
  actionName: string;
  // 操作的时间戳
  createdAt: string;
};

export type CreateTimelineItem = DataBaseTimelineItemBase & {
  actionName: 'create';
  // 创建的记录ID
  recordId: string;
  // 其他创建相关的属性
  newValues: Record<string, unknown>;
};

export type DeleteTimelineItem = DataBaseTimelineItemBase & {
  actionName: 'delete';
  recordId: number;
};

export type ProjectDeleteTimelineItem = DeleteTimelineItem & {
  tableName: 'project';
  actionName: 'delete';
};

export type ProjectGroupDeleteTimelineItem = DeleteTimelineItem & {
  tableName: 'project-group';
  actionName: 'delete';
};

export type UpdateTimelineItem = DataBaseTimelineItemBase & {
  actionName: 'update';
  // 更新的记录ID
  recordId: string;
  // 更新前的记录内容
  oldValues: Record<string, unknown>;
  // 更新后的记录内容
  newValues: Record<string, unknown>;
};

// 使用联合类型
export type DataBaseTimelineItem =
  // | CreateTimelineItem
  ProjectDeleteTimelineItem | ProjectGroupDeleteTimelineItem;
// | UpdateTimelineItem;

export type DataBaseTimelineChunk = {
  hasSyncedLocal: boolean;
  hasSyncedRemote: boolean;
  items: DataBaseTimelineItem[];
  createdAt: string;
  syncedLocalAt?: string;
  syncedRemoteAt?: string;
};
