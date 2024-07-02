import { DocumentEnv } from './core/envs';
import { AppManager } from './core/managers';
import { I18nSystem } from './core/systems';

DocumentEnv.getInstance().initialize(document);

I18nSystem.getInstance().launch();

AppManager.getInstance().work();
