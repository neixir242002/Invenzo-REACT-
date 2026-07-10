import { useAuth } from "../context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  RefreshCw,
  Tags,
  History,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
  Box,
  ClipboardCheck,
} from "../icons";

import { useEffect, useRef } from "react";

// Opciones del menú lateral
const menuItems = [
  { id: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "/productos", icon: Package, label: "Productos" },
  { id: "/control-inventario", icon: RefreshCw, label: "Control de Inventario" },
  { id: "/categorias", icon: Tags, label: "Categorías" },
  { id: "/historial", icon: History, label: "Historial" },
  { id: "/auditoria", icon: ClipboardCheck, label: "Auditoría" },
  { id: "/stock-alerta", icon: AlertTriangle, label: "Alertas de Stock" },
  { id: "/usuarios", icon: Users, label: "Usuarios" },
  { id: "/configuracion", icon: Settings, label: "Configuración" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {

  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRef = useRef(null);

  // 🔥 cerrar al cambiar de ruta (móvil)
  useEffect(() => {
    if (window.innerWidth <= 768 && isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  // 🔥 cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (window.innerWidth <= 768 && isOpen) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isOpen ? "open" : "closed"}`}
    >

      {/* Logo + botón hamburguesa */}
      <div className="sidebar-brand">
        <Box size={35} />
        <span>Invenzo</span>

        <button className="icon-btn" onClick={toggleSidebar}>
          <LogOut size={20} />
        </button>
      </div>

      <div className="sidebar-section-label">
        MENÚ PRINCIPAL
      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`sidebar-item ${location.pathname === item.id ? "active" : ""
                }`}
              onClick={() => navigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      <div className="sidebar-footer">

        <div className="sidebar-section-label">
          CUENTA
        </div>

        <button
          className="sidebar-item logout"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>

      </div>

    </aside>
  );
}