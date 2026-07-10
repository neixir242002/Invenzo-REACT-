import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportarProductosExcel(productos = []) {

  const dataProductos = productos.map(p => ({
    Producto: p.nombre || "-",
    Código: p.codigo || "-",
    Categoría: p.categoria?.nombre || "Sin categoría",
    Stock: p.cantidad ?? 0,
    Stock_Minimo: p.stock_minimo ?? 0,
    Precio: p.precio ?? 0,

    Estado:
      p.cantidad === 0
        ? "Sin stock"
        : p.cantidad <= p.stock_minimo
          ? "Stock bajo"
          : "Disponible",

    Valor_Total: (p.precio ?? 0) * (p.cantidad ?? 0)
  }));

  // Hoja principal
  const ws = XLSX.utils.json_to_sheet([]);

  // Encabezado tipo reporte
  XLSX.utils.sheet_add_aoa(ws, [
    ["REPORTE DE PRODUCTOS - INVENZO"],
    [`Generado: ${new Date().toLocaleString()}`],
    [],
  ], { origin: "A1" });

  // Datos
  XLSX.utils.sheet_add_json(ws, dataProductos, {
    origin: "A4",
    skipHeader: false
  });

  // Totales
  const totalProductos = productos.length;
  const totalStock = productos.reduce((a, b) => a + (b.cantidad || 0), 0);
  const valorTotal = productos.reduce(
    (a, b) => a + ((b.precio || 0) * (b.cantidad || 0)),
    0
  );

  XLSX.utils.sheet_add_aoa(ws, [
    [],
    ["RESUMEN"],
    ["Total Productos", totalProductos],
    ["Total Stock", totalStock],
    ["Valor Total Inventario", valorTotal]
  ], { origin: -1 });

  // Workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Productos");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "invenzo_productos.xlsx");
}