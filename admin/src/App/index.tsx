import "@antv/s2-react/dist/style.min.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import "./index.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/apps");
    }
  }, []);

  return <Layout />;
}

export default App;
