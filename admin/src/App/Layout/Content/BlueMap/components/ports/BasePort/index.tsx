import { ReactPortComponentProps } from "../../../types";

export const BasePort = ({
  children,
  type = "",
}: ReactPortComponentProps & {
  children?: React.ReactNode;
  type?: string;
}) => {
  return (
    <div data-port-type={type} className="h-[100%] hover:bg-gray-50">
      {children}
    </div>
  );
};
