import { documentEnv } from '@/core/envs';
import { i18nSystem, renderSystem } from '../systems';

export class AppManager {
  work() {
    documentEnv.emitter.on('pageLoadComplete', () => {
      i18nSystem.start();
      renderSystem.render();
    });
  }
}
