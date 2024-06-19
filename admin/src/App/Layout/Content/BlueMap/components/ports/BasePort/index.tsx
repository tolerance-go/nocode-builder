import { ReactPortComponentProps } from "../../../types";

export const BasePort = ({
  children,
}: ReactPortComponentProps & {
  children?: React.ReactNode;
}) => {
  return <div className="h-[100%] hover:bg-gray-50">{children}</div>;
};
