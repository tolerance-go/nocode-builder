import { LibConfigs } from '../../types';
import { rootConfigs } from './Root';

export * from './Root';
export const systemConfigs: LibConfigs = {
  name: 'system',
  components: [rootConfigs],
};
