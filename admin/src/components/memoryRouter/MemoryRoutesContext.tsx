import { createContext, useContext } from "react";

export const MemoryRoutesContext = createContext<true | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMemoryRoutesContext = () => {
  return useContext(MemoryRoutesContext);
};
