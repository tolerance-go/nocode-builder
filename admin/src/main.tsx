import '@ungap/with-resolvers';
import 'normalize.css';
import { AppEngine } from './engines/AppEngine';
import './index.css';
import { EngineManagerBase } from './base/EngineManager';

const main = async () => {
  await new EngineManagerBase(new AppEngine()).launch();
};

main();
