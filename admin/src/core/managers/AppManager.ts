import { documentEnv } from '@/core/envs';
import { InternationalizationSystem, RenderSystem } from '../systems';

export class AppManager {
  work() {
    documentEnv.emitter.on('pageLoadComplete', () => {
      InternationalizationSystem.getInstance().launch();
      RenderSystem.getInstance().render();
    });
  }
}
