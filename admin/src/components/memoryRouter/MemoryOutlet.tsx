import React from "react";
import { useMemoryRouteContext } from "./MemoryRouteContext";

export const MemoryOutlet: React.FC = () => {
  const context = useMemoryRouteContext();
  return <>{context?.outlet || null}</>;
};
