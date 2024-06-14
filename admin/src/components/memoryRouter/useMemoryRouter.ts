import { useContext } from "react";
import { MemoryRouterContext } from "./MemoryRouter";

export const useMemoryRouter = () => {
  const context = useContext(MemoryRouterContext);
  if (!context) {
    throw new Error("useMemoryRouter must be used within a MemoryRouter");
  }
  return context;
};
