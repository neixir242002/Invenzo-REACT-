import * as XLSX from "xlsx";

export function exportarMovimientosExcel(filtered = []) {

    const data = filtered.map(m => ({
        Producto: m.producto?.nombre || "—",
        Código: m.producto?.codigo || "—",
        Tipo: m.tipo,
        Cantidad: m.cantidad,
        Fecha: m.created_at
            ? new Date(m.created_at).toLocaleString("es-CO")
            : "—",
        Usuario: m.user?.nombre || "Sin usuario",
        Categoría: m.producto?.categoria?.nombre || "—",
        Notas: m.observacion || "—"
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, [
        ["REPORTE DE MOVIMIENTOS - INVENZO"],
        [`Generado: ${new Date().toLocaleString("es-CO")}`],
        []
    ], { origin: "A1" });

    XLSX.utils.sheet_add_json(ws, data, {
        origin: "A4"
    });

    const entradas = filtered.filter(m => m.tipo === "entrada").length;
    const salidas = filtered.filter(m => m.tipo === "salida").length;

    XLSX.utils.sheet_add_aoa(ws, [
        [],
        ["RESUMEN"],
        ["Total", filtered.length],
        ["Entradas", entradas],
        ["Salidas", salidas]
    ], { origin: -1 });

    XLSX.utils.book_append_sheet(wb, ws, "Historial");

    XLSX.writeFile(wb, "historial_inventario.xlsx");
}