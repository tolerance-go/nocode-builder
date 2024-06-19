import { ReactPortComponentProps } from "../../../types";

export const BasePort = ({
  children,
  datasets,
}: ReactPortComponentProps & {
  children?: React.ReactNode;
  datasets?: object;
}) => {
  return (
    <div {...datasets} className="h-[100%] hover:bg-gray-50">
      {children}
    </div>
  );
};
