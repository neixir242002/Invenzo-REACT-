import { useState } from "react";
import './Gestion_usuarios.css'
import ModelCrearUsuario from "../../VentanasEmergentes/usuario/ModelCrearUsuario";

export default function GestionUsuarios() {
    // ===== ESTADO DEL MODAL =====
          const [openModal, setOpenModal] = useState(false);

    const [usuarios, setUsuarios] = useState([
        {
            id: 1,
            nombre: "Juan Pérez",
            email: "juan@email.com",
            rol: "Administrador",
            estado: "activo",
            fecha: "10/04/2026",
            foto: null,
        },
    ]);

    // 🔴 ELIMINAR
    const eliminarUsuario = (id) => {
        const nuevos = usuarios.filter(u => u.id !== id);
        setUsuarios(nuevos);
    };

    // 🔁 ACTIVAR / DESACTIVAR
    const toggleEstado = (id) => {
        const nuevos = usuarios.map(u => {
            if (u.id === id) {
                return {
                    ...u,
                    estado: u.estado === "activo" ? "inactivo" : "activo"
                };
            }
            return u;
        });

        setUsuarios(nuevos);
    };

    return (
        <div className="page-container" >

            {/* HEADER */}
            <section className="header-section">
                <div className="header-text">
                    <h1>Gestión de Usuarios</h1>
                    <p>Administra los usuarios y permisos</p>
                </div>

                <button className="btn-primary"  onClick={() => setOpenModal(true)}>
                    <i data-lucide="user-plus"></i> Nuevo Usuario
                </button>
            </section>

            {/* FILTROS */}
            <section className="filters-section">
                <form className="filters-form">
                    <div className="search-input">
                        <i data-lucide="search"></i>
                        <input type="text" placeholder="Buscar usuario..." />
                    </div>

                    <select className="filter-select">
                        <option>Roles</option>
                        <option>Administrador</option>
                        <option>Auxiliar</option>
                    </select>

                    <select className="filter-select">
                        <option>Estado</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </form>
            </section>

            {/* TABLA */}
            <section className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>USUARIO</th>
                            <th>CORREO</th>
                            <th>ROL</th>
                            <th>ESTADO</th>
                            <th>CREADO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((u) => (
                                <tr key={u.id}>
                                    <td className="user-cell">
                                        {u.foto ? (
                                            <img src={u.foto} alt={u.nombre} />
                                        ) : (
                                            <i
                                                data-lucide="user-circle"
                                                className="avatar-icon"
                                            ></i>
                                        )}

                                        <div className="user-info">
                                            <div className="name">{u.nombre}</div>
                                        </div>
                                    </td>

                                    <td>{u.email}</td>
                                    <td>{u.rol}</td>

                                    <td>
                                        <span
                                            className={`status ${u.estado === "activo" ? "active" : "inactive"}`}
                                        >
                                            {u.estado === "activo" ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    <td>{u.fecha}</td>

                                    <td className="actions">
                                        <div className="actions-box">

                                            {/* EDITAR */}
                                            <button className="btn-edit" title="Editar">
                                                <i data-lucide="edit-2"></i>
                                            </button>

                                            {/* RESET */}
                                            <button className="btn-reset" title="Reset contraseña">
                                                <i data-lucide="key"></i>
                                            </button>

                                            {/* ACTIVAR / DESACTIVAR */}
                                            <button
                                                className={u.estado === "activo" ? "btn-deactivate" : "btn-activate"}
                                                title="Cambiar estado"
                                                onClick={() => toggleEstado(u.id)}
                                            >
                                                <i data-lucide={u.estado === "activo" ? "user-x" : "user-check"}></i>
                                            </button>

                                            {/* ELIMINAR */}
                                            <button
                                                className="btn-deactivate"
                                                title="Eliminar"
                                                onClick={() => eliminarUsuario(u.id)}
                                            >
                                                <i data-lucide="trash-2"></i>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* ===== MODAL ===== */}
                  {openModal && (
                    <ModelCrearUsuario cerrar ={() => setOpenModal(false)} />
                  )}
        </div>
    );
}