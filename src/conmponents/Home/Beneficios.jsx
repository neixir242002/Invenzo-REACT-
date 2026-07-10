import {
    MousePointerClick,
    BarChart3,
    ShieldCheck
} from "../../icons";

const Beneficios = () => {

    // Beneficios principales de Invenzo
    const reasons = [
        {
            icon: MousePointerClick,
            title: "Fácil de usar",
            desc: "No necesitas experiencia técnica para gestionar tu inventario."
        },
        {
            icon: BarChart3,
            title: "Control total",
            desc: "Monitorea productos, movimientos y niveles de stock en tiempo real."
        },
        {
            icon: ShieldCheck,
            title: "Seguro",
            desc: "Protege tu información con roles y permisos personalizados."
        }
    ];

    return (
        <section className="why-section" id="beneficios">

            {/* Encabezado */}
            <div className="section-header">
                <h2>¿Por qué elegir Invenzo?</h2>

                <p>
                    Diseñado para simplificar la gestión de inventario de pequeñas y medianas empresas.
                </p>
            </div>

            {/* Tarjetas de beneficios */}
            <div className="why-grid">

                {reasons.map(({ icon: Icon, title, desc }) => (

                    <div key={title} className="why-card">

                        <div className="why-icon">
                            <Icon size={30} />
                        </div>

                        <h3>{title}</h3>
                        <p>{desc}</p>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Beneficios;