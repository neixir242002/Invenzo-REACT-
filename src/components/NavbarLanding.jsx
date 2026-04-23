import '../styles/NavbarLanding.css';
import { Box } from 'lucide-react';

function NavbarLanding() {
    return (
        <header className="navbar">
            <div className="logo">
                <Box size={24} />
                <span>Invenzo</span>
            </div>

            <nav>
                <a href="/">Inicio</a>
                <a href="#caracteristicas">Características</a>
                <a href="#contacto">Contacto</a>

                <a href="/login">
                    <button className="btn-login">Iniciar sesión</button>
                </a>
            </nav>
        </header>
    );
}

export default NavbarLanding;