import '@ungap/with-resolvers';
import 'normalize.css';
import { AppEngine } from './engines/AppEngine';
import './index.css';
import { EngineManager } from './base/EngineManager';

const main = async () => {
  await new EngineManager(
    (engineManager) => new AppEngine(engineManager),
  ).launch();
};

main();
