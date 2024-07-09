export type 鼠标跟随组件id到组件参数 = {
  拖拽中显示的组件id: {
    count?: number;
    title?: string;
  };
  其他拖拽显示的组件id: {
    name: string;
  };
};

export type 鼠标跟随组件id联合类型 = keyof 鼠标跟随组件id到组件参数;

export type 鼠标跟随组件参数通过id获取<ID extends 鼠标跟随组件id联合类型> =
  鼠标跟随组件id到组件参数[ID];
