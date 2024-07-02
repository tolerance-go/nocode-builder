import { documentEnv } from '@/core/envs';
import { RenderSystem } from '../systems';

export class AppManager {
  work() {
    documentEnv.emitter.on('pageLoadComplete', () => {
      RenderSystem.getInstance().render();
    });
  }
}
