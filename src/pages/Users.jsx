// export { Users as default } from "./OtherPages";
import { useState } from "react";
import UserModal from "../conmponents/modals/UserModal";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    Pencil,
    Ban,
    CheckCircle
} from "../icons";


const INITIAL_USERS = [
    { id: 1, nombre: "Admin Principal", email: "admin@invenzo.com", rol: "administrador", estado: "activo", fecha: "2025-01-01" },
    { id: 2, nombre: "Carlos Pérez", email: "carlos@invenzo.com", rol: "auxiliar", estado: "activo", fecha: "2025-03-15" },
    { id: 3, nombre: "María García", email: "maria@invenzo.com", rol: "auxiliar", estado: "inactivo", fecha: "2025-05-20" },
];

export function Users({ addFlash }) {
    const navigate = useNavigate();
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState("");
    const [rol, setRol] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ nombre: "", email: "", rol: "auxiliar" });

    const filtered = users.filter(u =>
        (!search || u.nombre.toLowerCase().includes(search.toLowerCase())) &&
        (!rol || u.rol === rol)
    );

    const handleCreate = () => {
        setUsers(prev => [...prev, { ...form, id: Date.now(), estado: "activo", fecha: new Date().toISOString().slice(0, 10) }]);
        addFlash("Usuario creado");
        setShowModal(false);
        setForm({ nombre: "", email: "", rol: "auxiliar" });
    };

    const toggleStatus = (id) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, estado: u.estado === "activo" ? "inactivo" : "activo" } : u));
    };

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Gestión de Usuarios</h1><p>Administra los usuarios y permisos</p></div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={16} />
                    <input placeholder="Buscar usuario..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select value={rol} onChange={e => setRol(e.target.value)}>
                    <option value="">Roles</option>
                    <option value="administrador">Administrador</option>
                    <option value="auxiliar">Auxiliar</option>
                </select>
                <button
                    className="btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={18} />
                    Nuevo Usuario
                </button>
            </div>

            <div className="card table-card">
                <table className="data-table">
                    <thead><tr><th>USUARIO</th><th>CORREO</th><th>ROL</th><th>ESTADO</th><th>CREADO</th><th>ACCIONES</th></tr></thead>
                    <tbody>
                        {filtered.map(u => (
                            <tr key={u.id}>
                                <td className="product-cell"><div className="product-initial">{u.nombre[0]}</div><span>{u.nombre}</span></td>
                                <td>{u.email}</td>
                                <td><span className="badge">{u.rol}</span></td>
                                <td><span className={`status-tag ${u.estado === "activo" ? "in-stock" : "out-of-stock"}`}>{u.estado}</span></td>
                                <td>{u.fecha}</td>
                                <td className="actions-cell">

                                    <button
                                        className="action-btn edit"
                                        title="Editar"
                                        onClick={() => navigate("/profile")}
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        title={u.estado === "activo" ? "Desactivar" : "Activar"}
                                        onClick={() => toggleStatus(u.id)}
                                    >
                                        {u.estado === "activo" ? (
                                            <Ban size={16} />
                                        ) : (
                                            <CheckCircle size={16} />
                                        )}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <UserModal
                showModal={showModal}
                setShowModal={setShowModal}
                form={form}
                setForm={setForm}
                handleCreate={handleCreate}
            />
        </div>
    );
}


export default Users;