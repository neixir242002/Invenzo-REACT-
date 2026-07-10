const Footer = () => {
    const footerData = [
        {
            title: "Navegación",
            links: [
                { name: "Inicio", href: "#" },
                { name: "Características", href: "#caracteristicas" },
                { name: "Beneficios", href: "#beneficios" }
            ]
        },
        {
            title: "Acceso",
            links: [
                { name: "Iniciar Sesión", href: "/login" },
                { name: "Registrarse", href: "/register" }
            ]
        }
    ];

    return (
        <footer className="home-footer" id="contacto">
            <div className="footer-top">
                <div className="footer-brand">
                    <h3>Invenzo</h3>
                    <p>Sistema de gestión de inventario simple y eficiente para pequeñas y medianas empresas.</p>
                </div>
                <div className="footer-links">

                    {footerData.map(section => (

                        <div key={section.title}>

                            <h4>{section.title}</h4>

                            <ul>

                                {section.links.map(link => (

                                    <li key={link.name}>

                                        <a href={link.href}>
                                            {link.name}
                                        </a>

                                    </li>

                                ))}

                            </ul>

                        </div>

                    ))}

                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Invenzo. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
