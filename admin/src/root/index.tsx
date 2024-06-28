import { useAppStore } from "@/store";
import { locationState } from "@/stores/route";
import { ConfigProvider, theme } from "antd";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "@antv/s2-react/dist/style.min.css";

export function Root() {
  const location = useLocation();
  const updatePathname = useAppStore.use.updatePathname();

  useLayoutEffect(() => {
    locationState.pathname = location.pathname;
    updatePathname(location.pathname);
  }, [location, updatePathname]);

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
