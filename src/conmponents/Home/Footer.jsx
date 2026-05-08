// import React from 'react'
// import '../index.css'

const Footer = () => {
    return (
        <footer className="home-footer" id="contacto">
            <div className="footer-top">
                <div className="footer-brand">
                    <h3>Invenzo</h3>
                    <p>Sistema de gestión de inventario simple y eficiente para pequeñas y medianas empresas.</p>
                </div>
                <div className="footer-links">
                    {[["Producto", ["Características", "Precios", "Testimonios", "Guías"]], ["Empresa", ["Sobre Nosotros", "Blog", "Empleo", "Contacto"]], ["Soporte", ["Centro de ayuda", "Documentación", "Estado del sistema", "API"]]].map(([title, links]) => (
                        <div key={title}>
                            <h4>{title}</h4>
                            <ul>{links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Invenzo. Todos los derechos reservados.</p>
                <div className="footer-policy">
                    <a href="#">Términos de Servicio</a>
                    <a href="#">Política de Privacidad</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
