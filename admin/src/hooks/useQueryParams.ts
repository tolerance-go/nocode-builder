import { useEffect, useState } from "react";

// 自定义 Hook 来管理查询参数，支持泛型
export const useQueryParams = <
  T extends Record<string, string | undefined>
>(): [Partial<T>, (newParams: Partial<T>) => void] => {
  const [queryParams, setQueryParams] = useState<Partial<T>>(
    () =>
      Object.fromEntries(
        new URLSearchParams(window.location.search)
      ) as Partial<T>
  );

  useEffect(() => {
    const handlePopState = () => {
      setQueryParams(
        Object.fromEntries(
          new URLSearchParams(window.location.search)
        ) as Partial<T>
      );
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
