export type BlueMapConnectPort = {
  /**
   * exec - 执行
   * ref - 对象引用
   * returnValue - 返回值
   * condition - 条件表达式
   * string - 字符串
   * int - 整数
   */
  type: "exec" | "ref" | "returnValue" | "condition" | "string" | "int";
};

export interface BlueMapNodeConfig {
  /**
   * flowControl - 控制流节点
   * function - 函数调用节点
   */
  type: "flowControl" | "function";
  connections: {
    left?: BlueMapConnectPort[];
    right?: BlueMapConnectPort[];
  };
}
