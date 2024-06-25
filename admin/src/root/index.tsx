import "@antv/s2-react/dist/style.min.css";
import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <ConfigProvider
      theme={{
        // algorithm: [theme.darkAlgorithm],
        components: {
          Tabs: {
            cardGutter: 0,
            borderRadius: 0,
          },
        },
        token: {
          colorBorderSecondary: "rgb(229, 231, 235)",
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
