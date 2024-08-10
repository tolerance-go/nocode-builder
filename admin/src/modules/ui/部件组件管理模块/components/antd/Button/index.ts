import { ComponentConfigs } from '../../../types';
import { Button } from './component';
import {
  buttonDefaultProps,
  buttonSchema,
  buttonFormConfig,
  ButtonPropsType,
} from './props';
import { ButtonSlots } from './slots';

export const buttonConfigs: ComponentConfigs<
  ButtonPropsType,
  typeof ButtonSlots
> = {
  name: 'Button',
  defaultProps: buttonDefaultProps,
  schema: buttonSchema,
  formConfig: buttonFormConfig,
  slots: ButtonSlots,
  component: Button,
};
