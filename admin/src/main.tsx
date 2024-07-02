import { DocumentEnv } from './core/envs';
import { AppManager } from './core/managers';
import { InternationalizationSystem } from './core/systems';

DocumentEnv.getInstance().initialize(document);

InternationalizationSystem.getInstance().launch();

AppManager.getInstance().work();
