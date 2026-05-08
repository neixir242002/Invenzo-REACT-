// import React from 'react'
// import '../index.css'
// import { useState } from "react";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    return (
        <header className="home-nav">
            <div className="home-logo">
                <Box size={35} color="currentColor" strokeWidth={2} />
                <span>Invenzo</span>
            </div>
            <nav className="home-nav-links">
                <a href="#caracteristicas">Características</a>
                <a href="#contacto">Contacto</a>
                <button className="btn-login" onClick={() => navigate("/login")}>Iniciar sesión</button>
            </nav>
        </header>
    )
}

export default Nav;
