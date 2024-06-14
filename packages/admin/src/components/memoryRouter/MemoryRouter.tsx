import useLatest from "@/hooks/useLatest";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { To, createPath } from "react-router-dom";

interface MemoryRouterContextType {
  location: string;
  navigate: (to: To | number) => void;
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

export const MemoryRouter: FC<
  MemoryRouterProps & {
    navigateRef?: React.Ref<{ navigate: (to: To | -1) => void }>;
  }
> = ({
  initialEntries = ["/"],
  initialIndex = 0,
  children,
  onEntriesChange,
  onIndexChange,
  navigateRef,
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

  const navigate = (to: To | number) => {
    if (typeof to === "number") {
      // 回退或前进操作
      const newIndex = index + to;
      if (newIndex >= 0 && newIndex < entries.length) {
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

  // 把 navigate 暴露出去
  useImperativeHandle(navigateRef, () => ({
    navigate,
  }));

  return (
    <MemoryRouterContext.Provider value={{ location, navigate }}>
      {children}
    </MemoryRouterContext.Provider>
  );
};
