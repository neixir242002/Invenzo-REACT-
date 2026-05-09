// import React from 'react'
// import '../index.css'
import { useNavigate } from "react-router-dom";

const Section1 = () => {
    const navigate = useNavigate();
    return (
        <section className="cta-section">
            <div className="cta-content">
                <h2>¿Listo para optimizar tu inventario?</h2>
                <p>Únete a miles de empresas que ya están gestionando su inventario de forma eficiente con Invenzo.</p>
                <div className="hero-buttons">
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/register")}
                    >
                        Empieza ahora gratis
                    </button>
                </div>
            </div>
            <div className="hero-visual2">
                <div className="hero-mockup2">
                    <div className="mockup-bar2"><span /><span /><span /></div>
                    <div className="mockup-stats2">
                        {[["Total Productos", "1,284", "↑ 12%"], ["Stock Bajo", "23", "↓ 5%"], ["Movimientos", "48", "↑ 3%"], ["Valor Total", "$284K", "↑ 8%"]].map(([label, val, trend]) => (
                            <div key={label} className="mockup-stat2">
                                <div className="ms-label2">{label}</div>
                                <div className="ms-val2">{val}</div>
                                <div className="ms-trend2">{trend}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section1
