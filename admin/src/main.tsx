import { AppManager } from './core/managers';
import { InternationalizationSystem } from './core/systems';

InternationalizationSystem.getInstance().launch();

const appManager = new AppManager();

appManager.work();
