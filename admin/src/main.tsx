import { appManager } from './core/managers';
import { AppSystem } from './core/systems';

const appSystem = new AppSystem();

appSystem.launch();

appManager.work();
