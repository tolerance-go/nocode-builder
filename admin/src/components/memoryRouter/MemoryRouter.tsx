import { FC, ReactNode, createContext, useState } from "react";
import { To, createPath } from "react-router-dom";

interface MemoryRouterContextType {
  location: string;
  navigate: (to: To) => void;
}

export const MemoryRouterContext = createContext<
  MemoryRouterContextType | undefined
>(undefined);

interface MemoryRouterProps {
  initialEntries?: string[];
  initialIndex?: number;
  children: ReactNode;
}

export const MemoryRouter: FC<MemoryRouterProps> = ({
  initialEntries = ["/"],
  initialIndex = 0,
  children,
}) => {
  const [entries] = useState(initialEntries);
  const [, setIndex] = useState(initialIndex);
  const [location, setLocation] = useState(entries[initialIndex]);

  const navigate = (to: To) => {
    const path = typeof to === "string" ? to : createPath(to);
    setLocation(path);
    const newIndex = entries.indexOf(path);
    if (newIndex !== -1) {
      setIndex(newIndex);
    } else {
      entries.push(path);
      setIndex(entries.length - 1);
    }
  };

  return (
    <MemoryRouterContext.Provider value={{ location, navigate }}>
      {children}
    </MemoryRouterContext.Provider>
  );
};
