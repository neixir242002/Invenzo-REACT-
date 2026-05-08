// import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate()

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    Gestiona tu inventario de forma 
                    <span className="highlight"> simple y eficiente</span>
                </h1>

                <p>
                    Invenzo te ayuda a controlar tu inventario, optimizar tus recursos y tomar mejores decisiones para tu negocio.
                </p>

                <div className="hero-buttons">
                    <button 
                        className="btn-primary" 
                        onClick={() => navigate("/register")}
                    >
                        Empieza ahora gratis
                    </button>
                </div>
            </div>

            <div className="hero-visual1">
                <div className="hero-mockup1">

                    <div className="mockup-bar1">
                        <span />
                        <span />
                        <span />
                    </div>

                    <div className="mockup-stats1">
                        {[
                            ["Total Productos", "1,284", "↑ 12%"],
                            ["Stock Bajo", "23", "↓ 5%"],
                            ["Movimientos", "48", "↑ 3%"],
                            ["Valor Total", "$284K", "↑ 8%"]
                        ].map(([label, val, trend]) => (
                            <div key={label} className="mockup-stat1">
                                <div className="ms-label1">{label}</div>
                                <div className="ms-val1">{val}</div>
                                <div className="ms-trend1">{trend}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero