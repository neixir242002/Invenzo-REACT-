import { UserCircle } from "lucide-react";
import './Configuracion_perfil.css'

export default function PerfilUsuario() {
    return (
        <div className="perfil-wrapper">

            {/* FOTO DE PERFIL */}
            <div className="perfil-card-standalone">
                <h3>Foto de Perfil</h3>

                <div className="perfil-foto">
                    <UserCircle size={120} color="#0077B6" />
                </div>

                <form>
                    <input type="file" className="file-input" />
                    <button className="btn-primary">
                        Actualizar Foto
                    </button>
                </form>

                <button
                    className="btn-primary"
                    style={{ backgroundColor: "#DC2626", borderColor: "#DC2626", marginTop: "10px" }}
                >
                    Eliminar Foto
                </button>
            </div>

            {/* INFORMACIÓN PERSONAL */}
            <div className="perfil-card-standalone">
                <h3>Información Personal</h3>

                <form>
                    <label>Nombre</label>
                    <input type="text" placeholder="Juan Pérez" />

                    <label>Email</label>
                    <input type="email" placeholder="juan@email.com" />

                    <label>Nueva Contraseña (opcional)</label>
                    <input type="password" placeholder="••••••" />

                    <button className="btn-primary">
                        Guardar Cambios
                    </button>
                </form>
            </div>

        </div>
    );
}