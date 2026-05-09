// import React from 'react'

import {
    // FolderTree,
    Package,
    RefreshCw,
    Bell,
    BarChart3,
    Users,
    Layers,
} from "../../icons";

const Caracteristica = () => {
    const features = [
        {
            icon: Layers,
            title: "Gestión de Categorías",
            desc: "Organiza tus productos en categorías personalizables para facilitar su búsqueda y gestión."
        },
        {
            icon: Package,
            title: "Control de Productos",
            desc: "Administra todos tus productos con información detallada, imágenes y códigos de barras."
        },
        {
            icon: RefreshCw,
            title: "Entradas y Salidas",
            desc: "Registra todos los movimientos de tu inventario con un sistema simple e intuitivo."
        },
        {
            icon: Bell,
            title: "Alertas de Stock",
            desc: "Recibe notificaciones cuando tus productos alcancen niveles mínimos de inventario."
        },
        {
            icon: BarChart3,
            title: "Reportes y Estadísticas",
            desc: "Visualiza el rendimiento de tu inventario con gráficos y reportes detallados."
        },
        {
            icon: Users,
            title: "Gestión de Usuarios",
            desc: "Asigna roles y permisos a tu equipo para controlar el acceso a la información."
        }
    ];

    return (
        <section className="features" id="caracteristicas">
            <h2>Características Principales</h2>
            <p className="features-sub">
                Todo lo que necesitas para gestionar tu inventario en un solo lugar
            </p>

            <div className="feature-grid">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="feature-item">

                        <div className="feature-icon">
                            <Icon size={28} />
                        </div>

                        <h3>{title}</h3>
                        <p>{desc}</p>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Caracteristica;
