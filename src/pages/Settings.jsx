// export { Settings as default } from "./OtherPages";
import { useNavigate } from "react-router-dom";
import {
    User,
    Bell
} from "../icons";

export function Settings() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Configuración</h1><p>Administra tu perfil, el sistema y notificaciones</p></div>
            </div>
            <div className="config-grid">
                <div className="config-card" onClick={() => navigate("/profile")}>
                    <div className="config-icon">
                        <User size={28} />
                    </div>
                    <h3>Perfil</h3>
                    <p>Actualiza tus datos personales o cambia tu contraseña</p>
                    <button className="btn-primary">Editar Perfil</button>
                </div>
                <div className="config-card" onClick={() => navigate("/notifications")}>
                    <div className="config-icon">
                        <Bell size={28} />
                    </div>
                    <h3>Notificaciones</h3>
                    <p>Controla alertas del sistema y stock bajo</p>
                    <button className="btn-secondary">Administrar</button>
                </div>
            </div>
        </div>
    );

}


export default Settings;