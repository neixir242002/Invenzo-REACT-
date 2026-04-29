import { Bell, BellRing, ClipboardList, PackagePlus, Mail, AlertCircle, BadgeCheck } from "lucide-react";
import "./Configuracion_notificaciones.css";

export default function ConfiguracionNotificaciones() {
    return (
        <div className="perfil-wrapper">
            <div className="perfil-card-standalone">

                <h3>
                    <Bell size={18} /> Notificaciones del Sistema
                </h3>

                <div className="switch-row">
                    <label>
                        <span>
                            <BellRing size={16} /> Alertas de Stock
                        </span>
                        <input type="checkbox" />
                    </label>
                </div>

                <div className="switch-row">
                    <label>
                        <span>
                            <ClipboardList size={16} /> Movimientos de Inventario
                        </span>
                        <input type="checkbox" />
                    </label>
                </div>

                <div className="switch-row">
                    <label>
                        <span>
                            <PackagePlus size={16} /> Productos Nuevos
                        </span>
                        <input type="checkbox" />
                    </label>
                </div>

                <hr />

                <h3>
                    <Mail size={18} /> Notificaciones por Email
                </h3>

                <div className="switch-row">
                    <label>
                        <span>
                            <AlertCircle size={16} /> Alertas de stock por correo
                        </span>
                        <input type="checkbox" />
                    </label>
                </div>

                <div className="switch-row">
                    <label>
                        <span>
                            <BadgeCheck size={16} /> Movimientos por correo
                        </span>
                        <input type="checkbox" />
                    </label>
                </div>

                <button className="btn-primary">
                    Guardar Cambios
                </button>

            </div>
        </div>
    );
}