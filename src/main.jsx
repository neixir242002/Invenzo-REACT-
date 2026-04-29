import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Render principal de la app
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Router para navegación entre páginas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);