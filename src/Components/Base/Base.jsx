import React from "react";
import "./Base.css";
import { Bell } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

// Layout base del sistema (Sidebar + Topbar + Contenido)
const Base = () => {

  // Detecta la ruta actual (para marcar activo)
  const location = useLocation();

  return (


    
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">

        <span className="menu-title">MENÚ PRINCIPAL</span>

        <ul className="menu">

          {/* Cada link ahora apunta a rutas reales */}
          <li className={location.pathname.includes("dashboard") ? "active" : ""}>
            <Link to="/app/dashboard">Dashboard</Link>
          </li>

          <li className={location.pathname.includes("inventario") ? "active" : ""}>
            <Link to="/app/inventario">Control de Inventario</Link>
          </li>

          <li className={location.pathname.includes("categorias") ? "active" : ""}>
            <Link to="/app/categorias">Categorías</Link>
          </li>

          <li className={location.pathname.includes("historial") ? "active" : ""}>
            <Link to="/app/historial">Historial</Link>
          </li>

          <li className={location.pathname.includes("alertas") ? "active" : ""}>
            <Link to="/app/alertas">Alertas de Stock</Link>
          </li>

          <li className={location.pathname.includes("almacen") ? "active" : ""}>
            <Link to="/app/almacen">Almacén</Link>
          </li>

          <li className={location.pathname.includes("usuarios") ? "active" : ""}>
            <Link to="/app/usuarios">Usuarios</Link>
          </li>

          <li className={location.pathname.includes("configuracion") ? "active" : ""}>
            <Link to="/app/configuracion">Configuración</Link>
          </li>

        </ul>

        {/* ===== CUENTA ===== */}
        <div className="account">
          <span className="menu-title">CUENTA</span>
          <button className="logout">Cerrar sesión</button>
        </div>

      </aside>

      {/* ===== MAIN ===== */}
      <div className="main">

        {/* ===== TOPBAR ===== */}
        <header className="topbar">

          <div className="logo">Invenzo</div>

          <div className="topbar-actions">

            {/* Icono campana */}
            <Bell className="icon" size={20} />

            {/* Usuario */}
            <div className="user">
              <div className="avatar"><i>😊</i></div>
              <span>pablo</span>
            </div>

          </div>

        </header>

        {/* ===== CONTENIDO DINÁMICO ===== */}
        <main className="content">

          {/* 🔥 AQUÍ se renderizan las páginas */}
          <Outlet />

        </main>

      </div>

    </div>
  );
};


export default Base;