import { ProjectTypeEnum } from '@/_gen/models';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { 历史记录 } from '../machines';
import {
  SyncHistoryManagerEmployee,
  SyncHistoryManagerState,
} from './SyncHistoryManagerEmployee';

// 创建模拟数据和函数
const createMockHistory = (): 历史记录[] => [
  {
    createTime: Date.now(),
    操作: {
      type: '插入',
      detail: {
        节点key: '1',
        父节点key: null,
        index: 0,
        recordItem: {
          id: -1,
          title: '节点1',
          type: 'file',
          projectFileType: ProjectTypeEnum.View,
        },
      },
    },
    state: { treeNodes: [], treeDataRecord: {} },
  },
];

const mockRetryCallback = vi.fn((retry: () => void) => retry());
const mockSyncFunction = vi.fn(async () => {});
const mockSaveStateFunction = vi.fn(async () => {});
const mockLoadStateFunction = vi.fn(
  async (): Promise<null | SyncHistoryManagerState> => null,
);

describe('SyncHistoryManagerEmployee', () => {
  let manager: SyncHistoryManagerEmployee;

  beforeEach(() => {
    manager = new SyncHistoryManagerEmployee({
      initialHistoryA: createMockHistory(),
      initialHistoryB: createMockHistory(),
      retryCallback: mockRetryCallback,
      syncFunction: mockSyncFunction,
      saveStateFunction: mockSaveStateFunction,
      loadStateFunction: mockLoadStateFunction,
    });
  });

  it('应该使用给定的初始历史记录进行初始化', async () => {
    await manager.work();
    expect(manager['state'].historyA).toHaveLength(1);
    expect(manager['state'].historyB).toHaveLength(1);
  });
});
