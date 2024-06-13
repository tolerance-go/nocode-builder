import { globalEventBus } from "@/globals/eventBus";
import { useEffect, useState } from "react";

// 自定义 Hook 来管理查询参数，支持泛型
export const useQueryParams = <D extends Record<string, string>>(
  defaultValues: Partial<D> = {}
): [
  Partial<D> & {
    [key: string]: string | undefined;
  },
  (
    newParams: Partial<D> & {
      [key: string]: string | undefined;
    }
  ) => void
] => {
  const [queryParams, setQueryParams] = useState<Partial<D>>(() => {
    const params = new URLSearchParams(window.location.search);
    const initialParams = Object.fromEntries(params) as Partial<D>;
    const combinedParams = { ...defaultValues, ...initialParams };

    // 如果 URL 中缺少默认值中的参数，将其添加到 URL 中
    const urlParams = new URLSearchParams(window.location.search);
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (!urlParams.has(key)) {
        urlParams.set(key, value as string);
      }
    });
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    if (newUrl !== window.location.href) {
      window.history.replaceState({}, "", newUrl);
    }

    return combinedParams;
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newParams = Object.fromEntries(params) as Partial<D>;
      setQueryParams({ ...defaultValues, ...newParams });
    };

    window.addEventListener("popstate", handlePopState);

    const off = globalEventBus.on("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      off();
    };
  }, []);

  const updateQueryParams = (newParams: Partial<D>) => {
    const updatedParams = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${updatedParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    globalEventBus.emit("popstate", undefined);
    setQueryParams(Object.fromEntries(updatedParams) as Partial<D>);
  };

  return [queryParams, updateQueryParams];
};
