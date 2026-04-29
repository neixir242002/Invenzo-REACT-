import React from "react";
import "./Base.css";
import { Bell } from "lucide-react";
import { Link , Outlet } from "react-router-dom"; // <-- IMPORTAR DESDE react-router-dom

// Layout base del sistema (Sidebar + Topbar + Contenido)
const Base = () => {
  return (
    <div className="layout">

      {/* ===== SIDEBAR (MENÚ IZQUIERDO) ===== */}
      <aside className="sidebar">
        <span className="menu-title">MENÚ PRINCIPAL</span>

        <ul className="menu">
          {/* Item activo */}
          <li><Link to="/app/dashboard">Dashboard</Link></li>
          {/* Resto de opciones */}
          <li><Link to="/app/inventario">Control de Inventario</Link></li>
          <li><Link to="/app/categorias">Categorías</Link></li>
          <li><Link to="/app/historial">Historial</Link></li>
          <li><Link to="/app/alertas">Alertas de Stock</Link></li>
          <li><Link to="/app/almacen">Almacén</Link></li>
          <li><Link to="/app/usuarios">Usuarios</Link></li>
          <li><Link to="/app/configuracion">Configuración</Link></li>
        </ul>

        <div className="account">
          <span className="menu-title">CUENTA</span>
          <button className="logout">Cerrar sesión</button>
        </div>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="main">
        <header className="topbar">
          <div className="logo">Invenzo</div>
          <div className="topbar-actions">
            <Bell className="icon" size={20} />
            <div className="user">
              <div className="avatar"><i>😊</i></div>
              <span>pablo</span>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />   
        </main>
      </div>
    </div>
  );
};

export default Base;
