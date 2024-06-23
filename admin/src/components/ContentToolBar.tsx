import { Children, ReactNode } from "react";
import { cx } from "@emotion/css";

export const ContentToolBar = ({ children }: { children?: ReactNode }) => {
  const childrenArray = Children.toArray(children);

  return (
    <div
      className={cx("flex items-center h-[34px] px-2 py-1 border-b", {
        "justify-end": childrenArray.length === 1,
        "justify-between": childrenArray.length !== 1,
      })}
    >
      {children}
    </div>
  );
};
