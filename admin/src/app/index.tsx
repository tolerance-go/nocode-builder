import Route from "@/components/Route";
import "@antv/s2-react/dist/style.min.css";
import { Layout } from "./Layout";
import "./index.css";
import useNavigate from "@/hooks/useNavigate";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/apps");
    }
  }, []);

  return <Route path="/*" element={<Layout />}></Route>;
}

export default App;
