import { locationState } from "@/stores/route";
import "@antv/s2-react/dist/style.min.css";
import { ConfigProvider, theme } from "antd";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function Root() {
  const location = useLocation();

  useLayoutEffect(() => {
    locationState.pathname = location.pathname;
  }, [location]);

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
