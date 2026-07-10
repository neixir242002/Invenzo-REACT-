import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import {
    Bell,
    Save,
} from "../icons";

export function NotificationSettings({ addFlash }) {

    const [config, setConfig] = useState({
        alertas_stock: true,
        movimientos: false,
        productos_nuevos: true,
    });

    useEffect(() => {

        const loadConfig = () => {
            apiFetch("/configuracion")
                .then(data => {

                    setConfig({
                        alertas_stock: Boolean(data.alertas_stock),
                        movimientos: Boolean(data.movimientos),
                        productos_nuevos: Boolean(data.productos_nuevos)
                    });

                })
                .catch(err => console.log(err));
        };

        loadConfig(); // 👈 carga inicial

        window.addEventListener("config-updated", loadConfig);

        return () => {
            window.removeEventListener("config-updated", loadConfig);
        };

    }, []);

    const handleSave = async (e) => {

        e.preventDefault();

        try {

            const data = await apiFetch("/configuracion", {
                method: "PUT",
                body: JSON.stringify(config)
            });
            console.log("RESPUESTA:", data);

            addFlash("Configuración guardada");

            // ✔️ ESTO ES LO QUE TE FALTA
            window.dispatchEvent(new Event("config-updated"));

        } catch (err) {

            console.log("ERROR COMPLETO:", err);

            if (err.message) {
                addFlash(err.message, "error");
            } else {
                addFlash("Error guardando configuración", "error");
            }
        }
    };

    const toggle = (key) => setConfig(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="page">
            <div className="page-header"><h1>Configuración de Notificaciones</h1></div>
            <div className="card" style={{ maxWidth: 600 }}>
                <form onSubmit={handleSave}>
                    <h3
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Bell size={23} style={{ marginRight: "8px" }} />
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