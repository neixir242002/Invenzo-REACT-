import { useEffect, useState } from "react";
import { Download } from "../icons";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";

export default function Reportes() {

    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/productos", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setProductos(Array.isArray(data) ? data : data.productos || []);
            })
            .catch(err => console.log(err));
    }, []);

    const exportarExcel = async () => {

        const res = await fetch("http://127.0.0.1:8000/api/reportes/exportar-excel", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "reporte_inventario.xlsx";
        a.click();
    };

    // PAGINACIÓN
    const itemsPerPage = 5;

    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;

    const currentProducts = productos.slice(indexFirst, indexLast);

    const totalPages = Math.ceil(productos.length / itemsPerPage);

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Reportes de Inventario</h1>
                    <p>Vista previa de datos que se exportarán</p>
                </div>
            </div>

            {/* TABLA USANDO TU COMPONENTE */}
            <div className="card">

                <h3>Datos a exportar</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>CÓDIGO</th>
                            <th>CATEGORÍA</th>
                            <th>PRECIO</th>
                            <th>STOCK</th>
                            <th>ESTADO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-cell">
                                    No hay productos.
                                </td>
                            </tr>
                        ) : (
                            currentProducts.map(p => (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.codigo}</td>
                                    <td>{p.categoria?.nombre || "—"}</td>
                                    <td>${p.precio}</td>
                                    <td>{p.cantidad}</td>
                                    <td>
                                        {p.cantidad === 0
                                            ? "Sin stock"
                                            : p.cantidad <= p.stock_minimo
                                                ? "Stock bajo"
                                                : "Disponible"}
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

            {/* EXPORTAR SOLO EXCEL */}
            <div className="card" style={{ marginTop: "20px" }}>

                <h3>Exportar Excel</h3>

                <p>Descarga el inventario completo en formato Excel.</p>

                <button
                    className="btn-primary"
                    onClick={exportarExcel}
                    style={{ marginTop: "15px" }}
                >
                    <Download size={18} />
                    Exportar Excel
                </button>

            </div>

        </div>
    );
}