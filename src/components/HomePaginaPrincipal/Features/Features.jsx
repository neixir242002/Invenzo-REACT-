import './Features.css';
import { Folder, Package, Repeat2, Bell, BarChart3, Users } from 'lucide-react';

function Features() {
    return (
        <section className="features" id="caracteristicas">
            <h2>Características Principales</h2>
            <p>Todo lo que necesitas para gestionar tu inventario en un solo lugar</p>

            <div className="feature-grid">

                <div className="feature-item">
                    <Folder className="icon" size={32} />
                    <h3>Gestión de Categorías</h3>
                    <p>Organiza tus productos en categorías personalizables.</p>
                </div>

                <div className="feature-item">
                    <Package className="icon" size={32} />
                    <h3>Control de Productos</h3>
                    <p>Administra todos tus productos con información detallada.</p>
                </div>

                <div className="feature-item">
                    <Repeat2 className="icon" size={32} />
                    <h3>Entradas y Salidas</h3>
                    <p>Registra todos los movimientos de tu inventario.</p>
                </div>

                <div className="feature-item">
                    <Bell className="icon" size={32} />
                    <h3>Alertas de Stock</h3>
                    <p>Recibe notificaciones cuando el stock sea bajo.</p>
                </div>

                <div className="feature-item">
                    <BarChart3 className="icon" size={32} />
                    <h3>Reportes y Estadísticas</h3>
                    <p>Visualiza el rendimiento con gráficos.</p>
                </div>

                <div className="feature-item">
                    <Users className="icon" size={32} />
                    <h3>Gestión de Usuarios</h3>
                    <p>Controla roles y permisos.</p>
                </div>

            </div>
        </section>
    );
}

export default Features;