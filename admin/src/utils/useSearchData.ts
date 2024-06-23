import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "./updateSearchParams";

export const useSearchData = <T extends Record<string, string>>(data: T) => {
  const [searchParams, setSearchParams] = useSearchParams(data);

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
