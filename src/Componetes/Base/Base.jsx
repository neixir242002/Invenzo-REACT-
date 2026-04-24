import React from "react";
import "./Base.css";
import { Bell } from "lucide-react";

// Layout base del sistema (Sidebar + Topbar + Contenido)
const Base = () => {
  return (
            <div className="layout">

            {/* ===== SIDEBAR (MENÚ IZQUIERDO) ===== */}
            <aside className="sidebar">

                {/* Título sección */}
                <span className="menu-title">MENÚ PRINCIPAL</span>

                {/* Lista de navegación */}
                <ul className="menu">

                {/* Item activo */}
                <li className="active">Dashboard</li>

                {/* Resto de opciones */}
                <li>Productos</li>
                <li>Control de Inventario</li>
                <li>Categorías</li>
                <li>Historial</li>
                <li>Alertas de Stock</li>
                <li>Almacen</li>
                <li>Usuarios</li>
                <li>Configuración</li>

                </ul>

                {/* ===== SECCIÓN CUENTA ===== */}
                <div className="account">

                {/* Título */}
                <span className="menu-title">CUENTA</span>

                {/* Botón logout */}
                <button className="logout">
                    Cerrar sesión
                </button>

                </div>

            </aside>

            {/* ===== CONTENIDO PRINCIPAL ===== */}
            <div className="main">

                {/* ===== TOPBAR (HEADER SUPERIOR) ===== */}
                <header className="topbar">

                {/* Logo / Nombre sistema */}
                <div className="logo">
                    Invenzo
                </div>

                {/* Acciones del usuario */}
                <div className="topbar-actions">

                    {/* Notificaciones */}
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

                {/* Aquí se renderizan las vistas */}
                <h2>Contenido del sistema</h2>

                </main>

            </div>

            </div>
  );
};

export default Base;