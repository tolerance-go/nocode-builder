import { Tag } from 'antd';
import { 鼠标跟随组件id到组件参数 } from './types';

export const 拖拽提示显示组件 = (
  props: 鼠标跟随组件id到组件参数['拖拽中显示的组件id'],
) => {
  return <Tag color="blue">{props.count ?? props.title}</Tag>;
};
