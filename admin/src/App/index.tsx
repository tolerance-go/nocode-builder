import Route from "@/components/Route";
import "@antv/s2-react/dist/style.min.css";
import { Layout } from "./Layout";
import "./index.css";

function App() {
  return <Route path="/*" element={<Layout />}></Route>;
}

export default App;
