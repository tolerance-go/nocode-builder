import { SystemBase } from '@/base';

export class 界面导航系统 extends SystemBase {
  requires(): this {
    return super.requireModules();
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
