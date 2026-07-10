import { useEffect, useState } from "react";
import { Search } from "../icons";
import { apiFetch } from "../services/api";

import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import { Trash2 } from "../icons";
import ConfirmModal from "../conmponents/Modals/ConfirmModal";

export default function Auditoria() {

    const [auditorias, setAuditorias] = useState([]);
    const [search, setSearch] = useState("");
    const [modulo, setModulo] = useState("");
    const [modal, setModal] = useState({ open: false });

    useEffect(() => {

        apiFetch("/auditorias")
            .then(data => {
                const registros = Array.isArray(data) ? data : [];

                setAuditorias(
                    registros.sort(
                        (a, b) =>
                            new Date(b.created_at) -
                            new Date(a.created_at)
                    )
                );

            })
            .catch(err => console.log(err));

    }, []);

    const filtered = auditorias.filter(a =>
        (!search ||
            a.user?.nombre
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            a.accion?.toLowerCase()
                ?.toLowerCase()
                .includes(search.toLowerCase())
        ) &&

        (!modulo || a.modulo === modulo)
    );

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;

    const currentAuditorias = filtered.slice(
        indexFirst,
        indexLast
    );

    const totalPages = Math.ceil(
        filtered.length / itemsPerPage
    );

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Auditoría del Sistema</h1>
                    <p>
                        Registro de acciones realizadas por los usuarios
                    </p>
                </div>
            </div>

            <div className="filters-bar">

                <div className="search-box">
                    <Search size={16} />

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <select
                    value={modulo}
                    onChange={(e) =>
                        setModulo(e.target.value)
                    }
                >
                    <option value="">
                        Todos los módulos
                    </option>
                    <option value="PRODUCTOS">
                        Productos
                    </option>
                    <option value="CATEGORIAS">
                        Categorías
                    </option>
                    <option value="INVENTARIO">
                        Inventario
                    </option>
                    <option value="USUARIOS">
                        Usuarios
                    </option>
                </select>
                <button
                    className="btn-danger audit-btn"
                    onClick={() => {
                        setModal({
                            open: true,
                            type: "danger",
                            title: "Limpiar auditoría",
                            message: "¿Eliminar todos los registros de auditoría?",
                            confirmText: "Eliminar",
                            cancelText: "Cancelar",
                            onConfirm: async () => {

                                try {

                                    await apiFetch("/auditorias/limpiar", {
                                        method: "DELETE"
                                    });

                                    setAuditorias([]);

                                } catch (err) {

                                    console.log(err);
                                }
                            }
                        });
                    }}
                >
                    <Trash2 size={18} />
                    Limpiar Auditoría
                </button>
            </div>

            <div className="card">
                <Table>

                    <thead>
                        <tr>
                            <th>USUARIO</th>
                            <th>ACCIÓN</th>
                            <th>MÓDULO</th>
                            <th>FECHA</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="empty-cell"
                                >
                                    No hay registros.
                                </td>
                            </tr>
                        ) : (
                            currentAuditorias.map(a => (
                                <tr key={a.id}>
                                    <td>{a.usuario?.nombre || "Sin usuario"}</td>
                                    <td>
                                        {a.accion}
                                    </td>
                                    <td>
                                        {a.modulo}
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                lineHeight: "1.3"
                                            }}
                                        >
                                            <div>
                                                {new Date(
                                                    a.created_at
                                                ).toLocaleDateString("es-CO")}
                                            </div>

                                            <small
                                                style={{
                                                    color: "#6b7280"
                                                }}
                                            >
                                                {new Date(
                                                    a.created_at
                                                ).toLocaleTimeString(
                                                    "es-CO",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    }
                                                )}
                                            </small>
                                        </div>
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
                {modal.open && (
                    <ConfirmModal
                        open={modal.open}
                        onClose={() => setModal({ open: false })}
                        onConfirm={modal.onConfirm}
                        title={modal.title}
                        message={modal.message}
                        confirmText={modal.confirmText}
                        cancelText={modal.cancelText}
                        danger={modal.type === "danger"}
                    />
                )}
            </div>
        </div>
    );
}