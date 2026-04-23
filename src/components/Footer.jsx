import '../styles/Footer.css';
import { Share2, Mail, Globe, Users } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-top">

        <div className="footer-brand">
          <h3>Invenzo</h3>
          <p>
            Sistema de gestión de inventario simple y eficiente.
          </p>

          <div className="social-icons">
            <Share2 size={20} />
            <Globe size={20} />
            <Mail size={20} />
            <Users size={20} />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Producto</h4>
            <ul>
              <li><a href="#caracteristicas">Características</a></li>
            </ul>
          </div>

          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#">Centro de ayuda</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Invenzo</p>
      </div>
    </footer>
  );
}

export default Footer;