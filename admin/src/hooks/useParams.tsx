import { matchPath } from "@/utils/matchPath";
import { useEffect, useState } from "react";

const useParams = (pattern: string) => {
  const [params, setParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateParams = () => {
      const currentPath = window.location.pathname;
      const result = matchPath(pattern, currentPath);
      setParams(result || {});
    };

    // Initialize params on mount
    updateParams();

    // Listen to popstate event to handle browser navigation
    window.addEventListener("popstate", updateParams);

    return () => {
      window.removeEventListener("popstate", updateParams);
    };
  }, [pattern]);

  return params;
};

export default useParams;
