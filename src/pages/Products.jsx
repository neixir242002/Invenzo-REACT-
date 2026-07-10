import { useState, useEffect } from "react";
import ProductModal from "../conmponents/Modals/ProductModal";
import { exportarProductosExcel } from "../utils/exportProductosExcel";
import { apiFetch } from "../services/api";
import {
  Plus,
  Search,
  Download,
  SquarePen,
  Trash2,
  Ban,
  CheckCircle
} from "../icons";

import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import ConfirmModal from "../conmponents/Modals/ConfirmModal";

export default function Products({ addFlash }) {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [searchCodigo, setSearchCodigo] = useState("");
  const [searchCategoria, setSearchCategoria] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [newProd, setNewProd] = useState({
    nombre: "",
    codigo: "",
    categoria_id: "",
    precio: "",
    cantidad: "",
    stock_minimo: 1,
    foto: null
  });
  const [modal, setModal] = useState({ open: false });
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await apiFetch("/productos");

        const list = Array.isArray(data)
          ? data
          : data.productos || [];

        setProducts(list);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };

    const fetchCategorias = async () => {
      try {
        const data = await apiFetch("/categorias");

        setCategorias(
          Array.isArray(data)
            ? data
            : data.categorias || []
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const filtered = products.filter(p => {
    // Filtro por nombre
    if (
      search &&
      !p.nombre?.toLowerCase().includes(search.toLowerCase())
    ) return false;

    // Filtro por código
    if (
      searchCodigo &&
      !p.codigo?.toLowerCase().includes(searchCodigo.toLowerCase())
    ) return false;

    // Filtro por categoría
    if (
      searchCategoria &&
      p.categoria?.nombre?.toLowerCase() !== searchCategoria.toLowerCase()
    ) return false;

    if (tab === "low")
      return p.cantidad > 0 && p.cantidad <= p.stock_minimo;

    if (tab === "out")
      return p.cantidad === 0;

    return true;
  });

  const handleSave = () => {

    const formData = new FormData();

    formData.append("nombre", newProd.nombre);
    formData.append("codigo", newProd.codigo);
    formData.append("categoria_id", newProd.categoria_id);
    formData.append("precio", newProd.precio || 0);
    formData.append("cantidad", Number(newProd.cantidad || 0));
    formData.append("stock_minimo", Number(newProd.stock_minimo || 1));

    if (newProd.foto) {
      formData.append("foto", newProd.foto);
    }

    if (editProduct) {

      apiFetch(`/productos/${editProduct.id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre: newProd.nombre,
          codigo: newProd.codigo,
          categoria_id: Number(newProd.categoria_id),
          precio: Number(newProd.precio),
          cantidad: Number(newProd.cantidad),
          stock_minimo: Number(newProd.stock_minimo)
        })
      })
        .then((data) => {

          setProducts(prev =>
            prev.map(p =>
              p.id === editProduct.id
                ? data.producto
                : p
            )
          );

          addFlash("Producto actualizado");

        })
        .catch(err => {

          console.log(err);

          addFlash("Error actualizando producto", "error");

        });

    } else {

      apiFetch("/productos", {
        method: "POST",
        body: formData
      })
        .then((data) => {

          setProducts(prev => [
            data.producto,
            ...prev
          ]);

          addFlash("Producto agregado correctamente");

        })
        .catch((err) => {

          console.log(err);

          if (err.response?.status === 422) {
            addFlash(
              err.response.data.message ||
              "El código del producto ya existe",
              "error"
            );
            return;
          }

          addFlash("Error al guardar producto", "error");

        });
    }

    setShowModal(false);

    setEditProduct(null);

    setNewProd({
      nombre: "",
      codigo: "",
      categoria_id: "",
      precio: "",
      cantidad: "",
      stock_minimo: 1,
      foto: null
    });
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setNewProd({
      nombre: p.nombre,
      codigo: p.codigo,
      categoria_id: p.categoria?.id || "",
      precio: p.precio,
      cantidad: p.cantidad,
      stock_minimo: p.stock_minimo
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id);

    if (!product.categoria?.activa) {
      addFlash("Activa la categoría antes de eliminar el producto", "error");
      return;
    }

    try {
      await apiFetch(`/productos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ activo: 0 })
      });

      setProducts(prev =>
        prev.map(p =>
          p.id === id ? { ...p, activo: 0 } : p
        )
      );

      addFlash("Producto movido a inactivos");

    } catch (err) {
      console.log(err);
      addFlash(err.message, "error");
    }
  };


  const handleActivate = async (id) => {
    const product = products.find(p => p.id === id);

    if (!product.categoria?.activa) {
      addFlash("Activa la categoría primero", "error");
      return;
    }

    try {
      await apiFetch(`/productos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ activo: true })
      });

      setProducts(prev =>
        prev.map(p =>
          p.id === id ? { ...p, activo: true } : p
        )
      );

      addFlash("Producto activado");
    } catch (err) {
      console.log(err);
      addFlash(err.message, "error");
    }
  };

  const stockStatus = (p) => {
    const cantidad = Number(p.cantidad || 0);
    const minimo = Number(p.stock_minimo || 0);

    if (cantidad === 0) {
      return <span className="status-tag out-of-stock">Sin Stock</span>;
    }

    if (cantidad <= minimo) {
      return <span className="status-tag low-stock">Stock Bajo</span>;
    }

    return <span className="status-tag in-stock">En Stock</span>;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const indexLastProduct = currentPage * itemsPerPage;
  const indexFirstProduct = indexLastProduct - itemsPerPage;

  const currentProducts = filtered.slice(
    indexFirstProduct,
    indexLastProduct
  );

  const totalPages = Math.ceil(
    filtered.length / itemsPerPage
  );

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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar Codigo..."
            value={searchCodigo}
            onChange={(e) => {
              setSearchCodigo(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <select
          value={searchCategoria}
          onChange={(e) => {
            setSearchCategoria(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todas las categorías</option>

          {categorias.map((categoria) => (
            <option
              key={categoria.id}
              value={categoria.nombre}
            >
              {categoria.nombre}
            </option>
          ))}
        </select>

        <button
          className="btn-secondary"
          onClick={() => exportarProductosExcel(products)}
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
              categoria_id: "",
              precio: "",
              cantidad: "",
              stock_minimo: 1,
              foto: null
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
        <button
          className="btn-secondary"
          onClick={() => {
            setSearch("");
            setSearchCodigo("");
            setSearchCategoria("");
            setTab("all");
            setCurrentPage(1);
          }}
        >
          Limpiar filtros
        </button>
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
      <div className="card">
        <Table>
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CÓDIGO</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>ESTADO</th>
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
              currentProducts.map((p) => (
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
                    <div className="product-content">
                      {p.foto ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${p.foto}`}
                          alt={p.nombre}
                          className="product-img"
                        />
                      ) : (
                        <div className="product-initial">
                          {p.nombre?.charAt(0) || "P"}
                        </div>
                      )}
                      <span>{p.nombre}</span>
                    </div>
                  </td>

                  <td>{p.codigo}</td>
                  <td>{p.categoria?.nombre || "—"}</td>
                  <td>${Number(p.precio || 0).toFixed(2)}</td>
                  <td>{Number(p.cantidad || 0)}</td>
                  <td>{stockStatus(p)}</td>
                  <td>
                    <span
                      className={`status-tag ${Number(p.activo) === 1
                        ? "in-stock"
                        : "out-of-stock"
                        }`}
                    >
                      {Number(p.activo) === 1
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>
                  <td className="actions-cell">

                    <button
                      className="action-btn edit"
                      onClick={() => openEdit(p)}
                    >
                      <SquarePen size={18} />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        Number(p.activo) === 1
                          ? handleDelete(p.id)
                          : handleActivate(p.id)
                      }
                    >
                      {Number(p.activo) === 1 ? (
                        <Ban size={18} />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => {
                        setModal({
                          open: true,
                          type: "danger",
                          title: "Eliminar producto",
                          message: "¿Eliminar definitivamente este producto?",
                          confirmText: "Eliminar",
                          cancelText: "Cancelar",
                          danger: true,
                          onConfirm: async () => {
                            try {

                              await apiFetch(`/productos/${p.id}`, {
                                method: "DELETE"
                              });

                              setProducts(prev =>
                                prev.filter(prod => prod.id !== p.id)
                              );

                              addFlash("Producto eliminado definitivamente");

                              setModal({ open: false });

                            } catch (err) {
                              console.log(err);
                              addFlash("Error al eliminar el producto", "error");
                            }
                          }
                        });
                      }}
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
        {
          showModal && (
            <ProductModal
              showModal={showModal}
              setShowModal={setShowModal}
              newProd={newProd}
              setNewProd={setNewProd}
              editProduct={editProduct}
              handleSave={handleSave}
            />
          )
        }
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
    </div >
  );
}