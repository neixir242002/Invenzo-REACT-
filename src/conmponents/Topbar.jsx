import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
import {
  Menu, Bell, User
} from "../icons";


export default function Topbar({ navigate, toggleSidebar }) {
  // const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topbar">

      <div className="topbar-left">
        <button className="icon-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <div className="topbar-right">

        <div className="notif-wrapper">
          <button
            className="icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell size={20} />
          </button>

          {notifOpen && (
            <div className="notif-dropdown">
              <p className="notif-title">Notificaciones</p>
              <hr />
              <p className="notif-empty">No hay notificaciones</p>
            </div>
          )}
        </div>

        <button
          className="user-chip"
          onClick={() => navigate("/profile")}
        >
          <div className="user-avatar-placeholder">
            <User size={18} />
          </div>

          {/* <span>{user?.nombre || "Usuario"}</span> */}
          <span>Usuario</span>
        </button>

      </div>
    </header>
  );
}
