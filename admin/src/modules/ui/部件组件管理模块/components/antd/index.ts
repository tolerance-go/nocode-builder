import { LibConfigs } from '../../types';
import { buttonConfigs } from './Button';
import { flexConfigs } from './Flex';

export * from './Button';
export * from './Flex';

export const antdConfigs: LibConfigs = {
  name: 'antd',
  components: [buttonConfigs, flexConfigs],
};
