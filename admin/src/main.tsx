import '@ungap/with-resolvers';
import 'normalize.css';
import { 应用引擎 } from './engines/应用引擎';
import './index.css';
import { EngineManagerBase } from './base/EngineManager';

const main = async () => {
  await new EngineManagerBase(new 应用引擎()).launch();
};

main();
