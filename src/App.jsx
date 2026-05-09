import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ControlInventario from "./pages/ControlInventario";
import Categories from "./pages/Categories";
import History from "./pages/History";
import StockAlerts from "./pages/StockAlerts";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

import Sidebar from "./conmponents/Sidebar";
import Topbar from "./conmponents/Topbar";

import { ProfileSettings } from "./pages/ProfileSettings";
import { NotificationSettings } from "./pages/NotificationSettings";

function App() {
  const [flash, setFlash] = useState("");

  const addFlash = (msg) => {
    setFlash(msg);
  };
  const navigate = useNavigate();
  const location = useLocation();

  // Estado del sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Rutas públicas
  const publicRoutes = ["/", "/login", "/register", "/recover"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div className={isPublicRoute ? "public-layout" : "app-layout"}>

      {/* SIDEBAR SOLO EN PRIVADAS */}
      {!isPublicRoute && (
        <Sidebar
          currentPage={location.pathname}
          navigate={navigate}
          isOpen={sidebarOpen}
        />
      )}

      <div className={isPublicRoute ? "public-main" : "main-area"}>

        {/* TOPBAR SOLO EN PRIVADAS */}
        {!isPublicRoute && (
          <Topbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        <div className="page-content">

          <Routes>

            {/* PUBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recover" element={<RecoverPassword />} />

            {/* PRIVADAS */}
            <Route path="/dashboard" element={<Dashboard addFlash={addFlash} />} />
            <Route path="/productos" element={<Products addFlash={addFlash} />} />

            <Route
              path="/control-inventario"
              element={<ControlInventario />}
            />

            <Route path="/categorias" element={<Categories addFlash={addFlash} />} />
            <Route path="/historial" element={<History addFlash={addFlash} />} />
            <Route path="/stock-alerta" element={<StockAlerts addFlash={addFlash} />} />
            <Route path="/usuarios" element={<Users addFlash={addFlash} />} />
            <Route path="/configuracion" element={<Settings addFlash={addFlash} />} />

            <Route
              path="/profile"
              element={<ProfileSettings />}
            />

            <Route
              path="/notifications"
              element={<NotificationSettings />}
            />

          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;