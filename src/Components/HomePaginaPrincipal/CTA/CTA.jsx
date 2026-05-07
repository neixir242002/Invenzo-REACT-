import dashboardImg from '../../../assets/Image/dashboard.png';
import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <div className="cta-text">
          <h2>¿Listo para optimizar tu inventario?</h2>
          <p>
            Únete a miles de empresas que ya están gestionando su inventario
            de forma eficiente con Invenzo.
          </p>

          <div className="hero-buttons">
            <a href="/registro" className="btn-primary">
              Empieza ahora gratis
            </a>

            <a href="/demo" className="btn-outline">
              Ver demo
            </a>
          </div>
        </div>

        <div className="cta-image">
          <img src={dashboardImg} alt="Dashboard Demo" />
        </div>
      </div>
    </section>
  );
}

export default CTA;