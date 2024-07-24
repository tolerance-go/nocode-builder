import '@ungap/with-resolvers';
import 'normalize.css';
import { 应用引擎 } from './engines/应用引擎';
import './index.css';
import { EngineManagerBase } from './base/EngineManager';

class AppEngineManager extends EngineManagerBase {
  protected providerEngines(): void {
    super.providerEngines(new 应用引擎(this));
  }
}

const main = async () => {
  const appEngineManager = new AppEngineManager();
  window.appEngineManager = appEngineManager;

  await appEngineManager.launch();

  const appEngine = appEngineManager.getEngine(应用引擎);
  window.appEngine = appEngine;
};

main();
