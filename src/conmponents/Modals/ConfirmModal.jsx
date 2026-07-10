export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    danger = false
}) {

    if (!open) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">
                    <h3>{title}</h3>
                </div>

                <div className="modal-body">

                    <p
                        style={{
                            lineHeight: "1.7",
                            color: "#64748b",
                            fontSize: "15px"
                        }}
                    >
                        {message}
                    </p>

                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className={danger ? "btn-danger" : "btn-primary"}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}