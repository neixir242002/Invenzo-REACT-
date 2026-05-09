// export { ProfileSettings as default } from "./OtherPages";
import { useState } from "react";
import {
    User
} from "../icons";

export function ProfileSettings({ addFlash }) {
    const { useAuth: ua } = { useAuth: () => ({}) }; // placeholder
    const [form, setForm] = useState({ nombre: "Admin Principal", email: "admin@invenzo.com", password: "" });

    const handleSave = (e) => {
        e.preventDefault();
        addFlash("Perfil actualizado correctamente");
    };

    return (
        <div className="page">
            <div className="page-header"><h1>Configuración de Perfil</h1></div>
            <div className="profile-grid">
                <div className="card">
                    <h3>Foto de Perfil</h3>
                    <div className="profile-avatar-box">
                        <div className="profile-avatar-big">
                            <User size={60} />
                        </div>
                    </div>
                    <div className="form-group"><input type="file" /></div>
                    <button className="btn-primary">Actualizar Foto</button>
                </div>
                <div className="card">
                    <h3>Información Personal</h3>
                    <form onSubmit={handleSave}>
                        <div className="form-group"><label>Nombre</label><input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                        <div className="form-group"><label>Nueva Contraseña (opcional)</label><input type="password" placeholder="••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
