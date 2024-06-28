import { useAppStore } from "@/store";
import { locationState } from "@/stores/route";
import "@antv/s2-react/dist/style.min.css";
import { ConfigProvider, theme } from "antd";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function Root() {
  const location = useLocation();
  const firstName = useAppStore.use.firstName();
  const updateFirstName = useAppStore.use.updateFirstName();
  const lastName = useAppStore.use.lastName();
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
      <div
        onClick={() => {
          updateFirstName("yarnb");
        }}
      >
        {firstName}
        {lastName}
      </div>
      <Outlet />
    </ConfigProvider>
  );
}
