import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, Bell, User
} from "../icons";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/useAuth";


export default function Topbar({ toggleSidebar }) {

  // Navegación
  const navigate = useNavigate();

  // Estado de notificaciones
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [alertasActivas, setAlertasActivas] = useState(true);
  const [config, setConfig] = useState(null);

  // Referencia del panel de notificaciones
  const notifRef = useRef(null);

  // Datos del usuario autenticado
  const { user, version, setUser } = useAuth();

  // Eliminar notificaciones duplicadas
  const uniqueNotifications = notifications;

  const rolFormateado = {
    administrador_principal: "Admin Principal",
    administrador: "Administrador",
    auxiliar: "Auxiliar"
  }[user?.rol] || user?.rol;

  const [imgError, setImgError] = useState(false);

  useEffect(() => {

    const loadConfig = () => {
      apiFetch("/configuracion")
        .then(data => setConfig(data))
        .catch(() => setConfig(null));
    };

    loadConfig(); // carga inicial

    window.addEventListener("config-updated", loadConfig);

    return () => {
      window.removeEventListener("config-updated", loadConfig);
    };

  }, []);

  // Cargar notificaciones periódicamente
  useEffect(() => {

    if (
      user?.rol !== "administrador_principal" &&
      user?.rol !== "administrador"
    ) return;

    if (!config) return;

    const fetchNotifs = () => {
      apiFetch("/notificaciones")
        .then(data => {

          let filtered = data;

          if (config) {

            filtered = data.filter(n => {

              const tipo = n.data?.tipo;

              // STOCK
              if (tipo === "sin_stock" || tipo === "stock_bajo") {
                return config.alertas_stock;
              }

              // MOVIMIENTOS
              if (tipo === "movimiento") {
                return config.movimientos;
              }

              // PRODUCTOS
              if (tipo === "producto_nuevo") {
                return config.productos_nuevos;
              }

              return true;
            });
          }

          setNotifications(filtered);
        })
        .catch(err => console.log(err));
    };

    fetchNotifs();

    const interval = setInterval(fetchNotifs, 5000);

    return () => clearInterval(interval);

  }, [user, config]);

  // Re-render cuando cambia la foto del usuario
  useEffect(() => {
  }, [version]);

  // Cerrar notificaciones al hacer clic fuera
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // Sincronizar usuario desde localStorage
  useEffect(() => {

    const syncUser = () => {

      const stored = localStorage.getItem("user");

      if (stored) {
        setUser(JSON.parse(stored));
      }

    };

    window.addEventListener("storage", syncUser);

    return () =>
      window.removeEventListener("storage", syncUser);

  }, []);

  // URL de la foto de perfil
  const avatarUrl =
    user?.foto && !imgError
      ? `http://127.0.0.1:8000/storage/${user.foto}?v=${version}`
      : null;

  return (
    <header className="topbar">

      <div className="topbar-left">
        <button
          className="icon-btn menu-btn"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="topbar-right">

        <div className="notif-wrapper" ref={notifRef}>

          <button
            className="icon-btn"
            onClick={() => setNotifOpen(prev => !prev)}
            style={{ position: "relative" }}
          >
            <Bell size={20} strokeWidth={3} />
            {uniqueNotifications.length > 0 && (
              <span className="notif-badge">
                {uniqueNotifications.length > 9 ? "9+" : uniqueNotifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="notif-dropdown">

              <div className="notif-header">
                <p className="notif-title">Notificaciones</p>
                <hr />
              </div>

              <div className="notif-list">
                {uniqueNotifications.length === 0 ? (

                  <p className="notif-empty">
                    No hay notificaciones
                  </p>

                ) : (

                  uniqueNotifications.map((n) => {

                    const tipo = n.data?.tipo;

                    let mensaje = "";

                    if (tipo === "sin_stock") {
                      mensaje = `${n.data?.producto} está sin stock`;
                    }

                    else if (tipo === "stock_bajo") {
                      mensaje = `${n.data?.producto} tiene stock bajo`;
                    }

                    else if (tipo === "movimiento") {
                      mensaje =
                        `${n.data?.movimiento} de ${n.data?.cantidad} unidades`;
                    }

                    else if (tipo === "producto_nuevo") {
                      mensaje =
                        `Nuevo producto registrado`;
                    }

                    return (
                      <div key={n.id} className="notif-item">

                        <strong>
                          {n.data?.producto || "Sistema"}
                        </strong>

                        <p>{mensaje}</p>

                      </div>
                    );

                  })

                )}
              </div>

            </div>
          )}

        </div>

        <button
          className="user-chip"
          onClick={() => navigate("/profile")}
        >

          <div className="user-avatar-placeholder">
            {avatarUrl ? (
              <img
                key={avatarUrl}
                src={avatarUrl}
                alt="Perfil"
                className="avatar-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <User size={18} color="#0077B6" />
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: "1.2"
            }}
          >
            <span className="cursor-pointer">
              {user?.name || user?.nombre || "Usuario"}
            </span>
            <small
              style={{
                color: "#6b7280",
                fontSize: "12px"
              }}
            >
              {rolFormateado} • {user?.empresa?.nombre}
            </small>
          </div>
        </button>
      </div>
    </header >
  );
}