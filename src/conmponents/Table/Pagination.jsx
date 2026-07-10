export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    const maxVisible = 5;

    const getPages = () => {
        const pages = [];

        let start = Math.max(
            1,
            currentPage - Math.floor(maxVisible / 2)
        );

        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="pagination">

            {/* Botón anterior */}
            <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ‹
            </button>

            {/* Páginas dinámicas */}
            {pages.map(page => (
                <button
                    key={page}
                    className={
                        currentPage === page
                            ? "page-btn active"
                            : "page-btn"
                    }
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Botón siguiente */}
            <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                ›
            </button>

        </div>
    );
}