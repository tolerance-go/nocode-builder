import { Component } from '../../types/props';
import {
  buttonDefaultProps,
  buttonFormConfig,
  ButtonPropsType,
  buttonSchema,
} from './Button/props';

interface Antd {
  Button: Component<ButtonPropsType>;
}

export const antdProps: Antd = {
  Button: {
    defaultProps: buttonDefaultProps,
    schema: buttonSchema,
    formConfig: buttonFormConfig,
  },
};
