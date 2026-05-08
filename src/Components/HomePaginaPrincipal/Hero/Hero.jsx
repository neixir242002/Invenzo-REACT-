import dashboardImg from '../../../assets/Image/dashboard.png';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    Gestiona tu inventario de forma{" "}
                    <span className="highlight">simple y eficiente</span>
                </h1>

                <p>
                    Invenzo te ayuda a controlar tu inventario, optimizar tus recursos
                    y tomar mejores decisiones para tu negocio.
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

            <div className="hero-image">
                <img src={dashboardImg} alt="Dashboard Invenzo" />
            </div>
        </section>
    );
}

export default Hero;