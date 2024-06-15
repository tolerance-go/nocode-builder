import "@antv/s2-react/dist/style.min.css";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import "./index.css";
import { ConfigProvider } from "antd";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
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
        <Layout />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
