import { useAuth } from "../context/AuthContext";
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
  Box
} from "../icons";

const menuItems = [
  { id: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "/productos", icon: Package, label: "Productos" },
  { id: "/control-inventario", icon: RefreshCw, label: "Control de Inventario" },
  { id: "/categorias", icon: Tags, label: "Categorías" },
  { id: "/historial", icon: History, label: "Historial" },
  { id: "/stock-alerta", icon: AlertTriangle, label: "Alertas de Stock" },
  { id: "/usuarios", icon: Users, label: "Usuarios" },
  { id: "/configuracion", icon: Settings, label: "Configuración" },
];

export default function Sidebar({ isOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-brand">
        <Box size={35} />
        <span>Invenzo</span>
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