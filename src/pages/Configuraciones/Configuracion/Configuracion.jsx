import { UserCog, Bell } from "lucide-react";
import "./Configuracion.css";

export const Configuracion = () => {
    return (
        <div>

            <div className="page-title">
                <h1>Configuración</h1>
                <p>Administra tu perfil, el sistema y notificaciones según tu rol</p>
            </div>

            <div className="config-container">

                <div className="config-card">
                    <UserCog size={40} />
                    <h3>Perfil</h3>
                    <p>Actualiza tus datos personales o cambia tu contraseña</p>

                    <button className="btn-primary">
                        Editar Perfil
                    </button>
                </div>

                <div className="config-card">
                    <Bell size={40} />
                    <h3>Notificaciones</h3>
                    <p>Controla alertas del sistema y stock bajo</p>

                    <button className="btn-secondary">
                        Administrar
                    </button>
                </div>

            </div>

        </div>
    );
};