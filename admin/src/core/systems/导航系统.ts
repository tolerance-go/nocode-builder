import { System } from '@/types';

export class 导航系统 implements System {
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

  public async launch() {
    // 启动逻辑
  }
}
