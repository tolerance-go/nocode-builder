import "@antv/s2-react/dist/style.min.css";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
