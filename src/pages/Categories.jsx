import { useState, useEffect } from "react";
import { Plus, Search, SquarePen, Trash2, Tag, Ban, CheckCircle } from "../icons";
import CategoryModal from "../conmponents/Modals/CategoryModal";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/useAuth";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import ConfirmModal from "../conmponents/Modals/ConfirmModal";

function Categories({ addFlash }) {

    const { user } = useAuth();
    const [cats, setCats] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCat, setEditCat] = useState(null);
    const [form, setForm] = useState({
        nombre: "",
        descripcion: ""
    });
    const [modal, setModal] = useState({
        open: false,
        onConfirm: null
    });

    useEffect(() => {

        apiFetch("/categorias")

            .then(data => {

                setCats(
                    Array.isArray(data)
                        ? data
                        : data.categorias || []
                );

            })

            .catch(err => console.log(err));

    }, []);

    const openEdit = (c) => {
        setEditCat(c);

        setForm({
            nombre: c.nombre,
            descripcion: c.descripcion
        });

        setShowModal(true);
    };

    const filtered = cats.filter(
        c =>
            (c.nombre ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = async () => {
        try {

            if (editCat) {

                const updated = await apiFetch(
                    `/categorias/${editCat.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(form)
                    }
                );

                setCats(prev =>
                    prev.map(c =>
                        c.id === editCat.id
                            ? updated.categoria
                            : c
                    )
                );

                addFlash("Categoría actualizada");

            } else {

                const newCat = await apiFetch(
                    "/categorias",
                    {
                        method: "POST",
                        body: JSON.stringify(form)
                    }
                );

                setCats(prev => [
                    newCat.categoria,
                    ...prev
                ]);

                addFlash("Categoría creada");
            }

            setShowModal(false);

        } catch (err) {

            console.log(err);

            addFlash("Error al guardar la categoría", "error");
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await apiFetch(`/categorias/${id}`, {
                method: "PUT",
                body: JSON.stringify({ activa: false })
            });

            setCats(prev =>
                prev.map(c =>
                    c.id === id
                        ? { ...c, activa: false }
                        : c
                )
            );

            addFlash("Categoría desactivada");
        } catch (err) {
            console.log(err);
            addFlash("Error al desactivar la categoría", "error");
        }
    };

    const handleActivate = async (id) => {
        try {
            await apiFetch(`/categorias/${id}`, {
                method: "PUT",
                body: JSON.stringify({ activa: true })
            });

            setCats(prev =>
                prev.map(c =>
                    c.id === id
                        ? { ...c, activa: true }
                        : c
                )
            );

            addFlash("Categoría activada");
        } catch (err) {
            console.log(err);
            addFlash("Error al activar la categoría", "error");
        }
    };

    const handleDelete = (id) => {

        setModal({
            open: true,
            type: "danger",
            title: "Eliminar categoría",
            message: "¿Estás seguro de eliminar esta categoría definitivamente?",
            confirmText: "Eliminar",
            cancelText: "Cancelar",
            onConfirm: async () => {

                try {

                    await apiFetch(`/categorias/${id}`, {
                        method: "DELETE"
                    });

                    setCats(prev =>
                        prev.filter(c => c.id !== id)
                    );

                    addFlash("Categoría eliminada definitivamente");

                    setModal({ open: false });

                } catch (err) {

                    console.log(err);

                    addFlash("Error al eliminar la categoría", "error");
                }
            }
        });

    };

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const indexLastCategory = currentPage * itemsPerPage;
    const indexFirstCategory = indexLastCategory - itemsPerPage;

    const currentCategories = filtered.slice(
        indexFirstCategory,
        indexLastCategory
    );

    const totalPages = Math.ceil(
        filtered.length / itemsPerPage
    );

    if (user?.rol === "auxiliar") {
        return (
            <div className="page">
                <h2>No tienes permisos para ver categorías</h2>
            </div>
        );
    }

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Gestión de Categorías</h1>
                    <p>Administra las categorías de tus productos</p>
                </div>
            </div>

            <div className="filters-bar">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        placeholder="Buscar categorías..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                </div>

                <button
                    className="btn-primary"
                    onClick={() => {

                        setEditCat(null);

                        setForm({
                            nombre: "",
                            descripcion: ""
                        });

                        setShowModal(true);
                    }}
                >
                    <Plus size={18} />
                    Nueva Categoría
                </button>

            </div>

            <div className="card">

                <Table>

                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>DESCRIPCIÓN</th>
                            <th>PRODUCTOS</th>
                            <th>FECHA CREACIÓN</th>
                            <th>ESTADO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>
                                <td colSpan="6" className="empty-cell">
                                    No se encontraron categorías.
                                </td>
                            </tr>

                        ) : (

                            currentCategories.map(c => (

                                <tr key={c.id}>
                                    <td>
                                        <div className="product-cell">
                                            <strong className="category-name">
                                                <Tag size={18} />
                                                <span>{c.nombre}</span>
                                            </strong>
                                        </div>
                                    </td>

                                    <td
                                        className="description-cell"
                                        title={c.descripcion}
                                    >
                                        {c.descripcion || "—"}
                                    </td>

                                    <td>{c.productos?.length || 0}</td>

                                    <td>
                                        {c.created_at ? (
                                            <div style={{ lineHeight: "1.3" }}>
                                                <div>
                                                    {new Date(c.created_at).toLocaleDateString("es-CO")}
                                                </div>

                                                <small style={{ color: "#6b7280" }}>
                                                    {new Date(c.created_at).toLocaleTimeString("es-CO", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })}
                                                </small>
                                            </div>
                                        ) : (
                                            "—"
                                        )}
                                    </td>

                                    <td>
                                        <span
                                            className={`status-tag ${c.activa
                                                ? "in-stock"
                                                : "out-of-stock"
                                                }`}
                                        >
                                            {c.activa ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    <td className="actions-cell">

                                        <button
                                            className="action-btn edit"
                                            onClick={() => openEdit(c)}
                                        >
                                            <SquarePen size={18} />
                                        </button>

                                        <button
                                            className="action-btn delete"
                                            onClick={() =>
                                                c.activa
                                                    ? handleDeactivate(c.id)
                                                    : handleActivate(c.id)
                                            }
                                        >
                                            {c.activa ? (
                                                <Ban size={18} />
                                            ) : (
                                                <CheckCircle size={18} />
                                            )}
                                        </button>

                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(c.id)}
                                            title="Eliminar definitivamente"
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

            <CategoryModal
                showModal={showModal}
                setShowModal={setShowModal}
                form={form}
                setForm={setForm}
                editCat={editCat}
                handleSave={handleSave}
                addFlash={addFlash}
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
    );
}

export default Categories;