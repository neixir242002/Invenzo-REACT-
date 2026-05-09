import { useState } from "react";
import ProductModal from "../conmponents/modals/ProductModal";
import { exportarExcel } from "../utils/exportExcel";
import {
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
} from "../icons";

const INITIAL_PRODUCTS = [
  { id: 1, nombre: "Laptop Dell XPS", codigo: "LAP-001", categoria: "Electrónica", precio: 1299.99, cantidad: 5, stock_minimo: 3, activo: true },
  { id: 2, nombre: "Mouse Logitech MX", codigo: "MOU-002", categoria: "Accesorios", precio: 89.99, cantidad: 2, stock_minimo: 5, activo: true },
  { id: 3, nombre: "Teclado HP K120", codigo: "TEC-003", categoria: "Accesorios", precio: 45.00, cantidad: 0, stock_minimo: 4, activo: true },
  { id: 4, nombre: "Monitor Samsung 24\"", codigo: "MON-004", categoria: "Electrónica", precio: 349.00, cantidad: 12, stock_minimo: 2, activo: true },
  { id: 5, nombre: "Silla Gamer Razer", codigo: "SIL-005", categoria: "Oficina", precio: 450.00, cantidad: 1, stock_minimo: 2, activo: false },
];

export default function Products({ addFlash }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProd, setNewProd] = useState({
    nombre: "",
    codigo: "",
    categoria: "",
    precio: "",
    cantidad: "",
    stock_minimo: ""
  });

  const filtered = products.filter(p => {
    if (!p.activo) return false;
    if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    if (tab === "low") return p.cantidad > 0 && p.cantidad <= p.stock_minimo;
    if (tab === "out") return p.cantidad === 0;
    return true;
  });

  const inactive = products.filter(p => !p.activo);

  const handleSave = () => {
    if (editProduct) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editProduct.id
            ? {
              ...p,
              ...newProd,
              precio: +newProd.precio,
              cantidad: +newProd.cantidad,
              stock_minimo: +newProd.stock_minimo
            }
            : p
        )
      );
      addFlash("Producto actualizado");
    } else {
      setProducts(prev => [
        ...prev,
        {
          ...newProd,
          id: Date.now(),
          activo: true,
          precio: +newProd.precio,
          cantidad: +newProd.cantidad,
          stock_minimo: +newProd.stock_minimo
        }
      ]);
      addFlash("Producto agregado");
    }

    setShowModal(false);
    setEditProduct(null);
    setNewProd({
      nombre: "",
      codigo: "",
      categoria: "",
      precio: "",
      cantidad: "",
      stock_minimo: ""
    });
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setNewProd({
      nombre: p.nombre,
      codigo: p.codigo,
      categoria: p.categoria,
      precio: p.precio,
      cantidad: p.cantidad,
      stock_minimo: p.stock_minimo
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, activo: false } : p))
    );
    addFlash("Producto desactivado");
  };

  const handleActivate = (id) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, activo: true } : p))
    );
    addFlash("Producto activado");
  };

  const stockStatus = (p) => {
    if (p.cantidad === 0) return <span className="status-tag out-of-stock">Sin Stock</span>;
    if (p.cantidad <= p.stock_minimo) return <span className="status-tag low-stock">Stock Bajo</span>;
    return <span className="status-tag in-stock">En Stock</span>;
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Gestión de Productos</h1>
          <p>Administra tu catálogo de productos</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">

        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="btn-secondary"
          onClick={() => exportarExcel(products)}
        >
          <Download size={18} />
          Exportar
        </button>

        <button
          className="btn-primary"
          onClick={() => {
            setEditProduct(null);
            setNewProd({
              nombre: "",
              codigo: "",
              categoria: "",
              precio: "",
              cantidad: "",
              stock_minimo: ""
            });
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Nuevo Producto
        </button>

      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        {[
          ["all", "Todos"],
          ["low", "Stock Bajo"],
          ["out", "Sin Stock"]
        ].map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CÓDIGO</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-cell">
                  No se encontraron productos.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className={
                    p.cantidad === 0
                      ? "row-danger"
                      : p.cantidad <= p.stock_minimo
                        ? "row-warning"
                        : ""
                  }
                >
                  <td className="product-cell">
                    <div className="product-initial">{p.nombre[0]}</div>
                    <span>{p.nombre}</span>
                  </td>

                  <td>{p.codigo}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toFixed(2)}</td>
                  <td>{p.cantidad}</td>
                  <td>{stockStatus(p)}</td>

                  <td className="actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          newProd={newProd}
          setNewProd={setNewProd}
          editProduct={editProduct}
          handleSave={handleSave}
        />
      )}

      {/* Inactive */}
      {inactive.length > 0 && (
        <div className="card table-card" style={{ marginTop: "24px" }}>
          <h3>Productos Inactivos</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>CÓDIGO</th>
                <th>CATEGORÍA</th>
                <th>PRECIO</th>
                <th>STOCK</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {inactive.map((p) => (
                <tr key={p.id} className="row-inactive">
                  <td>{p.nombre}</td>
                  <td>{p.codigo}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toFixed(2)}</td>
                  <td>{p.cantidad}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-secondary small"
                      onClick={() => handleActivate(p.id)}
                    >
                      Activar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>


  );
}