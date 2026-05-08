import './NavbarLanding.css';
import { Box } from 'lucide-react';
import {Link} from 'react-router-dom'

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

                <Link to = "/login" >
                    <button className="btn-login">Iniciar sesión</button>
                </Link>
            </nav>
        </header>
    );
}

export default NavbarLanding;