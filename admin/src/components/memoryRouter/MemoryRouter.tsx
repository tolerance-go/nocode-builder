import useLatest from "@/hooks/useLatest";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface MemoryRouterContextType {
  location: string;
  navigate: (pathname: string) => void;
}

export const MemoryRouterContext = createContext<
  MemoryRouterContextType | undefined
>(undefined);

export interface MemoryRouterProps {
  initialLocation?: string;
  children: ReactNode;
  onPathnameChange?: (pathname: string) => void;
}

export const MemoryRouter: FC<
  MemoryRouterProps & {
    navigateRef?: React.Ref<{
      navigate: (pathname: string) => void;
    }>;
  }
> = ({ initialLocation = "/", onPathnameChange, children, navigateRef }) => {
  const [pathname, setLocation] = useState<string>(initialLocation);

  const navigate = (pathname: string) => {
    setLocation(pathname);
  };

  const latestOnPathnameChange = useLatest(onPathnameChange);

  useEffect(() => {
    latestOnPathnameChange.current?.(pathname);
  }, [latestOnPathnameChange, pathname]);

  // 把 navigate 暴露出去
  useImperativeHandle(navigateRef, () => ({
    navigate,
  }));

  return (
    <MemoryRouterContext.Provider value={{ location: pathname, navigate }}>
      {children}
    </MemoryRouterContext.Provider>
  );
};
