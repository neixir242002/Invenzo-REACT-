import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "../../icons";
import { formatCurrency } from "../../utils/formatCurrency";

const Hero = () => {

    const navigate = useNavigate()
    const [stats, setStats] = useState({
        total: 0,
        bajo: 0,
        movimientos: 0,
        valor: 0,
        pctBajo: 0,
        pctMov: 0,
        pctValor: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(
                    "http://127.0.0.1:8000/api/estadisticas-publicas"
                );

                const statsData = await data.json();

                const total = statsData.total || 0;
                const bajo = statsData.bajo || 0;
                const movimientos = statsData.movimientos || 0;
                const valor = statsData.valor || 0;

                const pctBajo = total ? ((bajo / total) * 100).toFixed(1) : 0;
                const pctMov = total ? ((movimientos / total) * 100).toFixed(1) : 0;
                const pctValor = total ? ((valor / 100000) * 100).toFixed(1) : 0;
                const pctTotal = total > 0 ? 100 : 0;

                setStats({
                    total,
                    bajo,
                    movimientos,
                    valor,
                    pctBajo,
                    pctMov,
                    pctValor,
                    pctTotal
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const renderTrend = (value) => {
        const num = Number(value);
        const isUp = num >= 0

        return (
            <div className={`ms-trend1 ${isUp ? "up" : "down"}`}>
                {isUp ? (
                    <ArrowUp size={14} />
                ) : (
                    <ArrowDown size={14} />
                )}
                {Math.abs(num)}%
            </div>
        );
    };

    const formatNumber = (value) => {
        return Number(value).toLocaleString("es-CO");
    };

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
                        Comenzar Gratis
                    </button>

                    <button
                        className="btn-outline"
                        onClick={() => navigate("/login")}
                    >
                        Iniciar Sesión
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

                        <div className="mockup-stat1">
                            <div className="ms-label1">Total Productos</div>
                            <div className="ms-val1">{formatNumber(stats.total)}</div>
                            {renderTrend(stats.pctTotal)}
                        </div>

                        <div className="mockup-stat1">
                            <div className="ms-label1">Stock Bajo</div>
                            <div className="ms-val1">{formatNumber(stats.bajo)}</div>
                            {renderTrend(-stats.pctBajo)}
                        </div>

                        <div className="mockup-stat1">
                            <div className="ms-label1">Movimientos</div>
                            <div className="ms-val1">{formatNumber(stats.movimientos)}</div>
                            {renderTrend(stats.pctMov)}
                        </div>

                        <div className="mockup-stat1">
                            <div className="ms-label1">Valor Total</div>
                            <div
                                className="ms-val1"
                                title={`$${Number(stats.valor).toLocaleString("es-CO")}`}
                            >
                                ${formatCurrency(stats.valor)}
                            </div>
                            {renderTrend(stats.pctValor)}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero