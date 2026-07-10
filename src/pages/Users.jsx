// export { Users as default } from "./OtherPages";
import { useEffect, useState } from "react";
import UserModal from "../conmponents/Modals/UserModal";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    SquarePen,
    UserX,
    UserCheck,
    Trash2
} from "../icons";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import ConfirmModal from "../conmponents/Modals/ConfirmModal";

export function Users({ addFlash }) {
    const [modal, setModal] = useState({ open: false });
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/usuarios", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setUsers(data.usuarios || data))
            .catch(err => console.log(err));
    }, []);
    const [search, setSearch] = useState("");
    const [rol, setRol] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        rol: "auxiliar",
        password: ""
    });

    const rolesLabel = {
        administrador_principal: "Administrador Principal",
        administrador: "Administrador",
        auxiliar: "Auxiliar"
    };

    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 5;


    const toggleStatus = async (id) => {
        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/usuarios/${id}/toggle`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Accept": "application/json"
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {
                addFlash(
                    data.message || "Error al cambiar estado",
                    "error"
                );
                return;
            }

            setUsers(prev =>
                prev.map(u =>
                    u.id === id
                        ? { ...u, ...data.user }
                        : u
                )
            );

            addFlash(data.message || "Estado actualizado");

        } catch (err) {
            console.log(err);

            addFlash(
                "Error de conexión con el servidor",
                "error"
            );
        }
    };

    const filtered = users.filter(u =>
        (!search || (u.nombre ?? "").toLowerCase().includes(search.toLowerCase())) &&
        (!rol || u.rol === rol)
    );

    const totalPages = Math.ceil(
        filtered.length / usersPerPage
    );

    const startIndex =
        (currentPage - 1) * usersPerPage;

    const paginatedUsers = filtered.slice(
        startIndex,
        startIndex + usersPerPage
    );

    const handleCreate = () => {
        fetch("http://127.0.0.1:8000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nombre: form.nombre,
                email: form.email,
                rol: form.rol,
                password: form.password
            })
        })
            .then(res => res.json())
            .then(data => {

                if (!data.user) {
                    addFlash(
                        data.message || "Error creando usuario",
                        "error"
                    );
                    return;
                }

                setUsers(prev => [data.user, ...prev]);

                addFlash("Usuario creado correctamente");
            })
            .catch(err => console.log(err));

        setShowModal(false);
        setForm({
            nombre: "",
            email: "",
            rol: "auxiliar",
            password: ""
        });
    };

    const handleDelete = async (id) => {

        const usuario = users.find(u => u.id === id);

        setModal({
            open: true,
            type: "danger",
            title: "Eliminar usuario",
            message: `¿Eliminar al usuario "${usuario?.nombre}"?`,
            confirmText: "Eliminar",
            cancelText: "Cancelar",
            danger: true,

            onConfirm: async () => {
                try {
                    const res = await fetch(
                        `http://127.0.0.1:8000/api/usuarios/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                "Accept": "application/json"
                            }
                        }
                    );

                    if (!res.ok) {
                        const data = await res.json();
                        addFlash(data.message, "error");
                        return;
                    }

                    setUsers(prev =>
                        prev.filter(u => u.id !== id)
                    );

                    addFlash(`Usuario "${usuario?.nombre}" eliminado`);

                    setModal({ open: false });

                } catch (err) {
                    console.log(err);
                    addFlash("Error al eliminar usuario", "error");
                }
            }
        });
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
                    <option value="">Todos los roles</option>
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

            <div className="card">
                <Table>
                    <thead><tr><th>USUARIO</th><th>CORREO</th><th>ROL</th><th>ESTADO</th><th>CREADO</th><th>ACCIONES</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-cell">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map(u => (
                                <tr key={u.id ?? u.email}>
                                    <td className="user-cell">
                                        {u.foto ? (
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${u.foto}`}
                                                alt={u.nombre}
                                                className="table-user-avatar"
                                            />
                                        ) : (
                                            <div className="user-initial">
                                                {((u.nombre || u.name || "?").charAt(0)).toUpperCase()}
                                            </div>
                                        )}

                                        <span>{u.nombre || u.name || "Sin nombre"}</span>
                                    </td>

                                    <td>{u.email}</td>

                                    <td>
                                        <span className="badge">
                                            {rolesLabel[u.rol] || u.rol}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={`status-tag ${u.activo ? "in-stock" : "out-of-stock"}`}>
                                            {u.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    <td>
                                        {u.created_at ? new Date(u.created_at).toLocaleDateString("es-CO") : "—"}
                                    </td>

                                    <td className="actions-cell">
                                        <button
                                            className="action-btn edit"
                                            title="Editar"
                                            onClick={() => navigate(`/usuarios/${u.id}/edit`)}
                                        >
                                            <SquarePen size={18} />
                                        </button>

                                        <button
                                            className="action-btn delete"
                                            title={u.activo ? "Desactivar" : "Activar"}
                                            onClick={() => toggleStatus(u.id)}
                                        >
                                            {u.activo ? <UserX size={18} /> : <UserCheck size={18} />}
                                        </button>

                                        <button
                                            className="action-btn delete"
                                            title="Eliminar"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            <Trash2 size={18} color="#ef4444" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <UserModal
                showModal={showModal}
                setShowModal={setShowModal}
                form={form}
                setForm={setForm}
                handleCreate={handleCreate}
            />

            {modal.open && (
                <ConfirmModal
                    open={modal.open}
                    title={modal.title}
                    message={modal.message}
                    confirmText={modal.confirmText}
                    cancelText={modal.cancelText}
                    danger={modal.danger}
                    onClose={() => setModal({ open: false })}
                    onConfirm={modal.onConfirm}
                />
            )}
        </div>
    );
}


export default Users;