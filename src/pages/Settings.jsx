import { useNavigate } from "react-router-dom";
import {
    User,
    Bell
} from "../icons";

export default function Settings() {

    const navigate = useNavigate();

    const ROUTES = {
        profile: "/profile",
        notifications: "/notifications"
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Configuración</h1>
                    <p>Administra tu perfil, el sistema y notificaciones</p>
                </div>
            </div>

            <div className="config-grid">

                <div className="config-card">
                    <div className="why-icon">
                        <User size={32} />
                    </div>

                    <h3>Perfil</h3>

                    <p>
                        Actualiza tus datos personales o cambia tu contraseña
                    </p>

                    <button
                        className="btn-primary"
                        onClick={() => navigate(ROUTES.profile)}
                    >
                        Editar Perfil
                    </button>
                </div>

                <div className="config-card">
                    <div className="why-icon">
                        <Bell size={32} />
                    </div>

                    <h3>Notificaciones</h3>

                    <p>
                        Controla alertas del sistema y stock bajo
                    </p>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate(ROUTES.notifications)}
                    >
                        Administrar
                    </button>
                </div>

            </div>
        </div>
    );
}