import React from "react";
import { useMemoryRouter } from "./useMemoryRouter";

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const MemoryRoute: React.FC<RouteProps> = ({ path, element }) => {
  const { location } = useMemoryRouter();
  return location === path ? element : null;
};
