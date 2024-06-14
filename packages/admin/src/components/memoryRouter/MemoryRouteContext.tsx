import React, { createContext, useContext } from "react";

interface MemoryRouteContextType {
  outlet: React.ReactNode;
}

export const MemoryRouteContext = createContext<MemoryRouteContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMemoryRouteContext = () => {
  return useContext(MemoryRouteContext);
};
