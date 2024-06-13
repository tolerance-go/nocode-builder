import { useCallback } from "react";

type NavigateFunction = (to: string | number) => void;

const useNavigate = (): NavigateFunction => {
  const navigate = useCallback((to: string | number) => {
    if (typeof to === "number" && to === -1) {
      window.history.back();
    } else if (typeof to === "string") {
      const isRelative = !to.startsWith("/");
      const newPath = isRelative ? `${window.location.pathname}/${to}` : to;
      window.history.pushState({}, "", newPath);
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    }
  }, []);

  return navigate;
};

export default useNavigate;
