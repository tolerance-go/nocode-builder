import "@antv/s2-react/dist/style.min.css";
import { ConfigProvider, theme } from "antd";
import { Outlet } from "react-router-dom";

export function Root() {
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
