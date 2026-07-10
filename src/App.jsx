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

import Auditoria from "./pages/Auditoria";


import { ProfileSettings } from "./pages/ProfileSettings";
import { NotificationSettings } from "./pages/NotificationSettings";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";


const App = () => {
  const [flashMessages, setFlashMessages] = useState([]);

  const addFlash = (msg, type = "success") => {

    const id = Date.now();

    setFlashMessages(prev => [
      ...prev,
      { id, msg, type }
    ]);

    setTimeout(() => {
      setFlashMessages(prev =>
        prev.filter(m => m.id !== id)
      );
    }, 3000);
  };
  const navigate = useNavigate();
  const location = useLocation();

  // Estado del sidebar — cerrado por defecto en móvil
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );

  // Rutas públicas
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/recover",
    "/auth/reset-password",
    "/change-password"
  ];

  const isPublicRoute =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/auth/reset-password");

  return (
    <div className={isPublicRoute ? "public-layout" : "app-layout"}>

      {/* SIDEBAR SOLO EN PRIVADAS */}
      {!isPublicRoute && (
        <>
          {/* Overlay para cerrar sidebar en móvil */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Sidebar
            currentPage={location.pathname}
            navigate={navigate}
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(prev => !prev)}
          />
        </>
      )}

      <div className={isPublicRoute ? "public-main" : "main-area"}>

        {/* TOPBAR SOLO EN PRIVADAS */}
        {!isPublicRoute && (
          <Topbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        <div className="page-content">

          {flashMessages.length > 0 && (
            <div className="flash-container">

              {flashMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flash-message ${m.type}`}
                >
                  {m.msg}
                </div>
              ))}

            </div>
          )}

          <Routes>

            {/* PUBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login addFlash={addFlash} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/recover"
              element={<RecoverPassword addFlash={addFlash} />}
            />

            <Route
              path="/auth/reset-password"
              element={<ResetPassword addFlash={addFlash} />}
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword addFlash={addFlash} />
                </ProtectedRoute>
              }
            />

            {/* PRIVADAS */}
            <Route
              path="/auditoria"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal", "administrador"]}>
                    <Auditoria />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal", "administrador", "auxiliar"]}>
                    <Products addFlash={addFlash} />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard addFlash={addFlash} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/control-inventario"
              element={
                <ProtectedRoute>
                  <ControlInventario addFlash={addFlash} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categorias"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal", "administrador"]}>
                    <Categories addFlash={addFlash} />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/historial"
              element={
                <ProtectedRoute>
                  <History addFlash={addFlash} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock-alerta"
              element={
                <ProtectedRoute>
                  <StockAlerts addFlash={addFlash} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal"]}>
                    <Users addFlash={addFlash} />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/usuarios/:id/edit"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal"]}>
                    <ProfileSettings addFlash={addFlash} />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configuracion"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["administrador_principal"]}>
                    <Settings addFlash={addFlash} />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={<ProfileSettings addFlash={addFlash} />}
            />

            <Route
              path="/notifications"
              element={<NotificationSettings addFlash={addFlash} />}
            />

          </Routes>

        </div>
      </div>
    </div>
  )
}

export default App;