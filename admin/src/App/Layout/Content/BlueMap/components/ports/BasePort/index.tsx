import { ReactPortComponentProps } from "../../../types";

export const BasePort = ({
  children,
}: ReactPortComponentProps & {
  children?: React.ReactNode;
}) => {
  return <div className="bg-gray-300 cursor-pointer h-[100%]">{children}</div>;
};
