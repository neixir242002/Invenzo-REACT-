import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportarExcel(productos = [], categorias = []) {

  // 🟢 HOJA PRODUCTOS
  const dataProductos = productos.map(p => ({
    Producto: p.nombre,
    Codigo: p.codigo,
    Categoria: p.categoria,
    Stock: p.cantidad ?? p.stock,
    Precio: p.precio,
    Estado: p.activo ? "Activo" : (p.estado ?? "Inactivo")
  }));

  const wsProductos = XLSX.utils.json_to_sheet(dataProductos);

  // 🟣 HOJA CATEGORÍAS
  const dataCategorias = categorias.map(c => ({
    Nombre: c.nombre,
    Descripcion: c.descripcion,
    Productos: c.productos,
    Fecha: c.fecha,
    Estado: c.estado
  }));

  const wsCategorias = XLSX.utils.json_to_sheet(dataCategorias);

  // 📦 LIBRO EXCEL
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, wsProductos, "Productos");
  XLSX.utils.book_append_sheet(wb, wsCategorias, "Categorias");

  // 📥 GENERAR ARCHIVO
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "invenzo_inventario.xlsx");
}