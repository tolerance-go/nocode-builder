import { EngineBase, ModuleBase } from '@/base';
import { TableTransactions, 后台数据管理模块 } from '../../后台数据管理模块';
import {
  新增操作详情,
  界面状态仓库模块,
  移动操作详情,
} from '../../界面状态仓库模块';
import {
  compareTrees,
  DirectoryTreeNodeTypeEnum,
  ProjectTreeDataNode,
  RootState,
} from '../../界面状态仓库模块';
import { 事件中心系统 } from '../../事件中心系统';
import { 项目表模块 } from '../../models/项目表模块';
import { 项目组表模块 } from '../../models/项目组表模块';
import { projectDetailIsViewProjectDetail } from '@/common/utils';

export class 项目树后台同步模块 extends ModuleBase {
  private static instance: 项目树后台同步模块;

  public static getInstance(engine: EngineBase): 项目树后台同步模块 {
    if (!项目树后台同步模块.instance) {
      项目树后台同步模块.instance = new 项目树后台同步模块(engine);
    }

    return 项目树后台同步模块.instance;
  }

  private prevState: RootState | null = null;

  protected requireModules() {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      后台数据管理模块.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine),
      项目表模块.getInstance(this.engine),
      项目组表模块.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {
    const { store } = this.getDependModule(界面状态仓库模块);
    this.prevState = store.getState();

    store.subscribe(() => {
      const currentState = store.getState();
      if (
        this.prevState?.projectTree.项目结构树 !==
          currentState.projectTree.项目结构树 ||
        this.prevState?.projectTree.项目树节点数据 !==
          currentState.projectTree.项目树节点数据
      ) {
        this.syncBackend(this.prevState, currentState);
      }

      this.prevState = currentState;
    });
  }

  private syncBackend(prevState: RootState | null, currentState: RootState) {
    const diffs = compareTrees<ProjectTreeDataNode>(
      prevState?.projectTree.项目结构树 ?? [],
      currentState.projectTree.项目结构树,
      (oldNode, newNode) => {
        return (
          prevState?.projectTree.项目树节点数据[oldNode.key].title !==
          currentState.projectTree.项目树节点数据[newNode.key].title
        );
      },
    );

    this.getDependModule(后台数据管理模块).$transaction((txs) => {
      diffs.新增.forEach((addInfo) => {
        this.handleAddInfo(addInfo, currentState, txs);
      });
      diffs.删除.recordItems.forEach((item) => {
        this.handleDeleteInfo(item, prevState, txs);
      });
      diffs.移动.forEach((moveInfo) => {
        this.handleMoveInfo(moveInfo, currentState, txs);
      });

      diffs.更新?.forEach((updateInfo) => {
        const itemData =
          currentState.projectTree.项目树节点数据[updateInfo.节点key];

        if (!itemData.recordId) {
          throw new Error('无法移动未保存的项目');
        }

        if (itemData.type === DirectoryTreeNodeTypeEnum.File) {
          this.getDependModule(项目表模块).updateProjectTitle(
            itemData.recordId,
            {
              name: itemData.title,
            },
            txs,
          );
        } else if (itemData.type === DirectoryTreeNodeTypeEnum.Folder) {
          this.getDependModule(项目组表模块).updateProjectGroup(
            itemData.recordId,
            {
              name: itemData.title,
            },
            txs,
          );
        }
      });
    });
  }

  private handleAddInfo(
    addInfo: 新增操作详情<ProjectTreeDataNode>,
    currentState: RootState,
    txs: TableTransactions,
  ) {
    addInfo.recordItems.forEach((item) => {
      const parentData = addInfo.父节点key
        ? currentState.projectTree.项目树节点数据[addInfo.父节点key]
        : undefined;
      const itemData = currentState.projectTree.项目树节点数据[item.key];
      if (itemData.type === DirectoryTreeNodeTypeEnum.File) {
        const record = this.getDependModule(项目表模块).addProject(
          {
            name: itemData.title,
            type: itemData.projectType,
            projectGroupId: parentData?.recordId,
            platformType: projectDetailIsViewProjectDetail(
              itemData.projectDetail,
            )
              ? itemData.projectDetail.platform
              : undefined,
          },
          txs,
        );
        this.getDependModule(事件中心系统).emit(
          '项目树后台同步模块/新增项目记录成功',
          {
            key: item.key,
            record,
          },
        );
      } else if (itemData.type === DirectoryTreeNodeTypeEnum.Folder) {
        const record = this.getDependModule(项目组表模块).addProjectGroup(
          {
            name: itemData.title,
            parentGroupId: parentData?.recordId,
          },
          txs,
        );
        this.getDependModule(事件中心系统).emit(
          '项目树后台同步模块/新增项目组记录成功',
          {
            key: item.key,
            record,
          },
        );

        // 递归处理子节点
        if (item.children) {
          const nestedAddInfo: 新增操作详情<ProjectTreeDataNode> = {
            父节点key: item.key,
            index: 0,
            recordItems: item.children,
            节点keys: item.children.map((child) => child.key),
          };
          this.handleAddInfo(nestedAddInfo, currentState, txs);
        }
      }
    });
  }

  private handleDeleteInfo(
    item: ProjectTreeDataNode,
    prevState: RootState | null,
    txs: TableTransactions,
  ) {
    const itemData = prevState?.projectTree.项目树节点数据[item.key];

    if (!itemData) {
      throw new Error('删除项目时发生错误，无法获取项目数据');
    }

    if (!itemData.recordId) {
      throw new Error('无法删除未保存的项目');
    }

    if (itemData.type === DirectoryTreeNodeTypeEnum.File) {
      this.getDependModule(项目表模块).removeProject(itemData.recordId, txs);
    } else if (itemData.type === DirectoryTreeNodeTypeEnum.Folder) {
      this.getDependModule(项目组表模块).removeProjectGroup(
        itemData.recordId,
        txs,
      );
    }

    // 递归处理子节点删除
    if (item.children) {
      item.children.forEach((child) => {
        this.handleDeleteInfo(child, prevState, txs);
      });
    }
  }

  private handleMoveInfo(
    moveInfo: 移动操作详情<ProjectTreeDataNode>,
    currentState: RootState,
    txs: TableTransactions,
  ) {
    moveInfo.recordItems.forEach((item) => {
      const itemData = currentState.projectTree.项目树节点数据[item.key];

      if (!itemData.recordId) {
        throw new Error('无法移动未保存的项目');
      }

      const parentData = moveInfo.目标父节点key
        ? currentState.projectTree.项目树节点数据[moveInfo.目标父节点key]
        : undefined;

      if (itemData.type === DirectoryTreeNodeTypeEnum.File) {
        this.getDependModule(项目表模块).moveProject(
          itemData.recordId,
          parentData?.recordId,
          txs,
        );
      } else if (itemData.type === DirectoryTreeNodeTypeEnum.Folder) {
        this.getDependModule(项目组表模块).moveProjectGroup(
          itemData.recordId,
          parentData?.recordId,
          txs,
        );
      }

      // 递归处理子节点移动
      if (item.children) {
        const nestedMoveInfo: 移动操作详情<ProjectTreeDataNode> = {
          节点keys: item.children.map((child) => child.key),
          目标父节点key: item.key,
          index: 0,
          recordItems: item.children,
        };
        this.handleMoveInfo(nestedMoveInfo, currentState, txs);
      }
    });
  }
}
