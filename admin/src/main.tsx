import '@ungap/with-resolvers';
import 'normalize.css';
import { 应用引擎 } from './engines/应用引擎';
import './index.css';
import { EngineManagerBase } from './base/EngineManager';

class AppEngineManager extends EngineManagerBase {
  protected providerEngines(): void {
    const appEngine = new 应用引擎(this);
    window.appEngine = appEngine;

    super.providerEngines(appEngine);
  }
}

const main = async () => {
  const engineManager = new AppEngineManager();

  window.appEngineManager = engineManager;

  await engineManager.launch();
};

main();
