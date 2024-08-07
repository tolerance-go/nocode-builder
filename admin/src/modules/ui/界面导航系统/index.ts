import { EngineBase, ModuleBase } from '@/base';

export class 界面导航系统 extends ModuleBase {
  private static instance: 界面导航系统;

  public static getInstance(engine: EngineBase): 界面导航系统 {
    if (!界面导航系统.instance) {
      界面导航系统.instance = new 界面导航系统(engine);
    }

    return 界面导航系统.instance;
  }

  navigateFunction: ((url: string) => void) | null = null;

  setNavigate = (navigate: (url: string) => void): void => {
    this.navigateFunction = navigate;
  };

  navigateTo = (url: string): void => {
    if (this.navigateFunction) {
      this.navigateFunction(url);
    } else {
      console.error('Navigate function is not set');
    }
  };
}
