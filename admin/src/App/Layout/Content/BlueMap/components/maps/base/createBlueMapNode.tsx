import React from "react";
import { X6ReactComponentProps } from "../../../types";
import { BaseNodeComponentProps, BaseNode } from "../../nodes/BaseNode";

export const createBlueMapNode =
  (component: React.FC<X6ReactComponentProps>) =>
  (props: BaseNodeComponentProps) => {
    return (
      <BaseNode {...props}>{React.createElement(component, props)}</BaseNode>
    );
  };
