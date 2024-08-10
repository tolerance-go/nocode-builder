import { ComponentConfigs } from '../../../types';
import { Flex } from './component';
import {
  FlexPropsType,
  flexDefaultProps,
  flexSchema,
  flexFormConfig,
} from './props';
import { FlexSlots } from './slots';

export const flexConfigs: ComponentConfigs<FlexPropsType, typeof FlexSlots> = {
  name: 'Flex',
  defaultProps: flexDefaultProps,
  schema: flexSchema,
  formConfig: flexFormConfig,
  slots: FlexSlots,
  component: Flex,
};
