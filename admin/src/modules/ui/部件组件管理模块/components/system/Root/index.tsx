import { ComponentConfigs } from '../../../types';
import { Root } from './component';
import {
  rootDefaultProps,
  rootFormConfig,
  RootPropsType,
  rootSchema,
} from './props';
import { RootSlots } from './slots';

export const rootConfigs: ComponentConfigs<RootPropsType, typeof RootSlots> = {
  name: 'Root',
  defaultProps: rootDefaultProps,
  schema: rootSchema,
  formConfig: rootFormConfig,
  slots: RootSlots,
  component: Root,
};
