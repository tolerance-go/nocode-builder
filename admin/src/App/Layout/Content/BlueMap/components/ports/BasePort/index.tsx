import { ReactPortComponentProps } from "../../../types";

export const BasePort = ({
  children,
  datasets,
  port,
}: ReactPortComponentProps & {
  children?: React.ReactNode;
  datasets?: object;
}) => {
  return (
    <div
      {...{
        ...datasets,
        "data-port": true,
        "data-port-group": port.group,
      }}
      className="h-[100%] hover:bg-gray-50"
    >
      {children}
    </div>
  );
};
