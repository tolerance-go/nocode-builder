import { Component } from '../../types/props';
import {
  buttonDefaultProps,
  buttonFormConfig,
  ButtonPropsType,
  buttonSchema,
} from './Button/props';
import {
  flexDefaultProps,
  flexSchema,
  flexFormConfig,
  FlexPropsType,
} from './Flex/props';

interface Antd {
  Button: Component<ButtonPropsType>;
  Flex: Component<FlexPropsType>;
}

export const antdProps: Antd = {
  Button: {
    defaultProps: buttonDefaultProps,
    schema: buttonSchema,
    formConfig: buttonFormConfig,
  },
  Flex: {
    defaultProps: flexDefaultProps,
    schema: flexSchema,
    formConfig: flexFormConfig,
  },
};
