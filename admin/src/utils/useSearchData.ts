import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "./updateSearchParams";

export const useSearchData = <T extends Record<string, string>>(
  data: Partial<T>
) => {
  const cleanedData = Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key as keyof T];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const [searchParams, setSearchParams] = useSearchParams(cleanedData);

  const updateSearchData = (
    next: Partial<T> & Record<string, string | undefined>
  ) => {
    setSearchParams(updateSearchParams(searchParams, next));
  };

  const searchData = Object.keys(data).reduce((acc, next) => {
    return {
      ...acc,
      [next]: searchParams.get(next),
    };
  }, {} as T);

  return {
    searchData,
    updateSearchData,
  };
};
