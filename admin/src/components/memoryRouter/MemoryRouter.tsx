import useLatest from "@/hooks/useLatest";
import { FC, ReactNode, createContext, useState, useEffect } from "react";
import { To, createPath } from "react-router-dom";

interface MemoryRouterContextType {
  location: string;
  navigate: (to: To) => void;
}

export const MemoryRouterContext = createContext<
  MemoryRouterContextType | undefined
>(undefined);

export interface MemoryRouterProps {
  initialEntries?: readonly string[];
  initialIndex?: number;
  children: ReactNode;
  onEntriesChange?: (entries: readonly string[]) => void;
  onIndexChange?: (index: number) => void;
}

export const MemoryRouter: FC<MemoryRouterProps> = ({
  initialEntries = ["/"],
  initialIndex = 0,
  children,
  onEntriesChange,
  onIndexChange,
}) => {
  const [entries, setEntries] = useState<readonly string[]>(initialEntries);
  const [index, setIndex] = useState(initialIndex);
  const [location, setLocation] = useState(entries[initialIndex]);

  // 使用 useLatest 来保存最新的 onEntriesChange 和 onIndexChange
  const latestOnEntriesChange = useLatest(onEntriesChange);
  const latestOnIndexChange = useLatest(onIndexChange);

  useEffect(() => {
    if (latestOnEntriesChange.current) {
      latestOnEntriesChange.current(entries);
    }
  }, [entries, latestOnEntriesChange]);

  useEffect(() => {
    if (latestOnIndexChange.current) {
      latestOnIndexChange.current(index);
    }
  }, [index, latestOnIndexChange]);

  const navigate = (to: To | -1) => {
    if (to === -1) {
      // 回退操作
      if (index > 0) {
        const newIndex = index - 1;
        setIndex(newIndex);
        setLocation(entries[newIndex]);
      }
    } else {
      // 正常导航操作
      const path = typeof to === "string" ? to : createPath(to);
      setLocation(path);
      const newIndex = entries.indexOf(path);
      if (newIndex !== -1) {
        setIndex(newIndex);
      } else {
        const newEntries = [...entries, path];
        setEntries(newEntries);
        setIndex(newEntries.length - 1);
      }
    }
  };

  return (
    <MemoryRouterContext.Provider value={{ location, navigate }}>
      {children}
    </MemoryRouterContext.Provider>
  );
};
