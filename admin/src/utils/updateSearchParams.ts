interface ParamsUpdate {
  [key: string]: string | undefined;
}

export const updateSearchParams = (
  searchParams: URLSearchParams,
  updates: ParamsUpdate
): URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams;
};
