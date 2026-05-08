// export { NotificationSettings as default } from "./OtherPages";
import { useState } from "react";
import {
    Bell,
    Mail,
    Save
} from "../icons";

export function NotificationSettings({ addFlash }) {
    const [config, setConfig] = useState({
        alertas_stock: true, movimientos: false, productos_nuevos: true,
        correo_alertas: true, correo_movimientos: false
    });

    const handleSave = (e) => {
        e.preventDefault();
        addFlash("Configuración de notificaciones guardada");
    };

    const toggle = (key) => setConfig(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="page">
            <div className="page-header"><h1>Configuración de Notificaciones</h1></div>
            <div className="card" style={{ maxWidth: 600 }}>
                <form onSubmit={handleSave}>
                    <h3>
                        <Bell size={18} style={{ marginRight: '8px' }} />
                        Notificaciones del Sistema
                    </h3>
                    {[["alertas_stock", "Alertas de Stock"], ["movimientos", "Movimientos de Inventario"], ["productos_nuevos", "Productos Nuevos"]].map(([key, label]) => (
                        <div key={key} className="switch-row">
                            <span>{label}</span>
                            <label className="switch">
                                <input type="checkbox" checked={config[key]} onChange={() => toggle(key)} />
                                <span className="switch-slider" />
                            </label>
                        </div>
                    ))}
                    <hr style={{ margin: "20px 0" }} />
                    <h3>
                        <Mail size={18} style={{ marginRight: '8px' }} />
                        Notificaciones por Email
                    </h3>
                    {[["correo_alertas", "Alertas de stock por correo"], ["correo_movimientos", "Movimientos por correo"]].map(([key, label]) => (
                        <div key={key} className="switch-row">
                            <span>{label}</span>
                            <label className="switch">
                                <input type="checkbox" checked={config[key]} onChange={() => toggle(key)} />
                                <span className="switch-slider" />
                            </label>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: 20 }}
                    >
                        <Save size={18} />
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
}


export default NotificationSettings;