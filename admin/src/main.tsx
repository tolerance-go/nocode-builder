import { DocumentEnv } from './core/envs';
import { AppManager } from './core/managers';
import { I18nSystem } from './core/systems';
import 'normalize.css';
import './index.css';

DocumentEnv.getInstance().initialize(document);

I18nSystem.getInstance().launch();

AppManager.getInstance().work();
