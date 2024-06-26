import { DesignableComponentProps } from "@/types/common";
import { Table as AntdTable } from "antd";

export const Table = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...rest
}: DesignableComponentProps) => {
  return (
    <div {...rest}>
      <AntdTable></AntdTable>
    </div>
  );
};
