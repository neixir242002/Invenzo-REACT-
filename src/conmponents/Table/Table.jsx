import "./table.css";

export default function Table({ children }) {
    return (
        // Contenedor con scroll para la tabla
        <div className="table-scroll">

            <table className="data-table">
                {children}
            </table>

        </div>
    );
}