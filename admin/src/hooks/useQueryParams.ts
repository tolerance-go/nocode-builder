import { useEffect, useState } from "react";

// 自定义 Hook 来管理查询参数，支持泛型
export const useQueryParams = <
  D extends Record<string, string | undefined>,
  T extends Record<keyof D, string | undefined>
>(
  defaultValues: Partial<D> = {}
): [
  T & {
    [key: string]: string | undefined;
  },
  (
    newParams: T & {
      [key: string]: string | undefined;
    }
  ) => void
] => {
  const [queryParams, setQueryParams] = useState<Partial<T>>(() => {
    const params = new URLSearchParams(window.location.search);
    const initialParams = Object.fromEntries(params) as Partial<T>;
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
      const newParams = Object.fromEntries(params) as Partial<T>;
      setQueryParams({ ...defaultValues, ...newParams });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateQueryParams = (newParams: Partial<T>) => {
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
    setQueryParams(Object.fromEntries(updatedParams) as Partial<T>);
  };

  return [queryParams, updateQueryParams];
};
