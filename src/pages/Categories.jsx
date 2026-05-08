// export { Categories as default } from "./OtherPages";
import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Tag, Download } from "../icons";
import CategoryModal from "../conmponents/modals/CategoryModal";


const INITIAL_CATS = [
    { id: 1, nombre: "Electrónica", descripcion: "Productos electrónicos", productos: 12, fecha: "2025-01-15", estado: "activo" },
    { id: 2, nombre: "Accesorios", descripcion: "Accesorios de computador", productos: 8, fecha: "2025-02-20", estado: "activo" },
    { id: 3, nombre: "Oficina", descripcion: "Muebles y equipos de oficina", productos: 5, fecha: "2025-03-10", estado: "inactivo" },
];

function Categories({ addFlash }) {
    const [cats, setCats] = useState(INITIAL_CATS);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCat, setEditCat] = useState(null);
    const [form, setForm] = useState({ nombre: "", descripcion: "" });

    const filtered = cats.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()));

    const handleSave = () => {
        if (editCat) {
            setCats(prev => prev.map(c => c.id === editCat.id ? { ...c, ...form } : c));
            addFlash("Categoría actualizada");
        } else {
            setCats(prev => [...prev, { ...form, id: Date.now(), productos: 0, fecha: new Date().toISOString().slice(0, 10), estado: "activo" }]);
            addFlash("Categoría creada");
        }
        setShowModal(false);
    };

    const openEdit = (c) => { setEditCat(c); setForm({ nombre: c.nombre, descripcion: c.descripcion }); setShowModal(true); };

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Gestión de Categorías</h1><p>Administra las categorías de tus productos</p></div>
                <button
                    className="btn-primary"
                    onClick={() => {
                        setEditCat(null);
                        setForm({ nombre: "", descripcion: "" });
                        setShowModal(true);
                    }}
                >
                    <Plus size={18} />
                    Nueva Categoría
                </button>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={16} />

                    <input
                        placeholder="Buscar categorías..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button className="btn-secondary">
                    <Download size={18} />
                    Exportar
                </button>
            </div>

            <div className="card table-card">
                <table className="data-table">
                    <thead><tr><th>NOMBRE</th><th>DESCRIPCIÓN</th><th>PRODUCTOS</th><th>FECHA CREACIÓN</th><th>ESTADO</th><th>ACCIONES</th></tr></thead>
                    <tbody>
                        {filtered.map(c => (
                            <tr key={c.id}>

                                <td>
                                    <strong className="category-name">
                                        <Tag size={16} style={{ marginRight: '8px' }} />
                                        {c.nombre}
                                    </strong>
                                </td>

                                <td>{c.descripcion || "—"}</td>

                                <td>{c.productos}</td>

                                <td>{c.fecha}</td>

                                <td>
                                    <span
                                        className={`status-tag ${c.estado === "activo"
                                            ? "in-stock"
                                            : "out-of-stock"
                                            }`}
                                    >
                                        {c.estado}
                                    </span>
                                </td>

                                <td className="actions-cell">

                                    <button
                                        className="action-btn edit"
                                        onClick={() => openEdit(c)}
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        onClick={() => {
                                            setCats(prev =>
                                                prev.filter(x => x.id !== c.id)
                                            );

                                            addFlash("Categoría eliminada");
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CategoryModal
                showModal={showModal}
                setShowModal={setShowModal}
                form={form}
                setForm={setForm}
                editCat={editCat}
                handleSave={handleSave}
            />

        </div>


    );
}

export default Categories;