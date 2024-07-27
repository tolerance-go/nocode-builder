import { EngineBase, ModuleBase } from '@/base';
import { 后台数据管理模块 } from '../后台数据管理模块';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import {
  compareTrees,
  DirectoryTreeNodeTypeEnum,
  ProjectStructureTreeDataNode,
  RootState,
} from '../界面状态仓库模块';
import { 事件中心系统 } from '../事件中心系统';

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
        const diffs = compareTrees<ProjectStructureTreeDataNode>(
          this.prevState?.projectTree.项目结构树 ?? [],
          currentState.projectTree.项目结构树,
          (oldNode, newNode) => {
            return (
              this.prevState?.projectTree.项目树节点数据[oldNode.key].title !==
              currentState.projectTree.项目树节点数据[newNode.key].title
            );
          },
        );

        this.getDependModule(后台数据管理模块).$transaction(
          ({ 项目表模块实例, 项目组表模块实例 }) => {
            diffs.新增.forEach((addInfo) => {
              addInfo.recordItems.forEach((item) => {
                const parentData = addInfo.父节点key
                  ? currentState.projectTree.项目树节点数据[addInfo.父节点key]
                  : undefined;
                const itemData =
                  currentState.projectTree.项目树节点数据[item.key];
                if (itemData.type === DirectoryTreeNodeTypeEnum.File) {
                  const record = 项目表模块实例.addProject({
                    name: itemData.title,
                    type: itemData.projectType,
                    projectGroupId: parentData?.recordId,
                  });
                  this.getDependModule(事件中心系统).emit(
                    '项目树后台同步模块/新增项目记录成功',
                    {
                      record,
                    },
                  );
                } else if (itemData.type === DirectoryTreeNodeTypeEnum.Folder) {
                  const record = 项目组表模块实例.addProjectGroup({
                    name: itemData.title,
                    parentGroupId: parentData?.recordId,
                  });
                  this.getDependModule(事件中心系统).emit(
                    '项目树后台同步模块/新增项目组记录成功',
                    {
                      record,
                    },
                  );
                }
              });
            });
          },
        );

        console.log('项目树发生变化，正在同步到后台...', diffs);
      }
      this.prevState = currentState;
    });
  }
}
