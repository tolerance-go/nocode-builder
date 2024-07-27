import { EngineBase, ModuleBase } from '@/base';
import { 事件中心系统 } from '../事件中心系统';
import { 后台数据管理模块 } from '../后台数据管理模块';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import {
  compareTrees,
  ProjectStructureTreeDataNode,
  RootState,
} from '../界面状态管理器模块';

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

        this.getDependModule(后台数据管理模块);

        console.log('项目树发生变化，正在同步到后台...', diffs);
      }
      this.prevState = currentState;
    });
  }
}
