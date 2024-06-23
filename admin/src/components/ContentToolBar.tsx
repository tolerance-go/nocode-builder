import { ReactNode } from "react";

export const ContentToolBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center h-[34px] px-2 py-1 border-b">
      {children}
    </div>
  );
};
