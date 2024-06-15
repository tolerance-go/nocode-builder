import { createContext, useContext } from "react";

interface MemoryRouteContextType {
  path: string;
}

export const MemoryRouteContext = createContext<MemoryRouteContextType | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useMemoryRoute = () => {
  return useContext(MemoryRouteContext);
};
