import '@ungap/with-resolvers';
import 'normalize.css';
import { 应用引擎 } from './engines/应用引擎';
import './index.css';
import { EngineManagerBase } from './base/EngineManager';

const main = async () => {
  const engineManager = await new EngineManagerBase((self) => {
    const appEngine = new 应用引擎(self);
    window.appEngine = appEngine;
    return appEngine;
  });

  window.engineManager = engineManager;

  await engineManager.launch();
};

main();
