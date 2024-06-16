import { useState, useEffect } from "react";

const useCurrentPathname = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // 监听 popstate 事件，以捕捉浏览器导航的路径变化
    window.addEventListener("popstate", handleLocationChange);

    // 监听 pushState 和 replaceState 方法，以捕捉通过 history API 进行的路径变化
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleLocationChange();
    };

    // 清除监听器
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return pathname;
};

export { useCurrentPathname };
