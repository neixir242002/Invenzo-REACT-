//import React from 'react'
import NavbarLanding from '../../components/HomePaginaPrincipal/NavbarLanding/NavbarLanding';
import Hero from '../../components/HomePaginaPrincipal/Hero/Hero';
import Features from '../../components/HomePaginaPrincipal/Features/Features';
import CTA from '../../components/HomePaginaPrincipal/CTA/CTA';
import Footer from '../../components/HomePaginaPrincipal/Footer/Footer';
import './Home.css';
const Home = () => {
    return (
        <>
            <NavbarLanding />
            <Hero />
            <Features />
            <CTA />
            <Footer />
        </>
    )
}

export default Home
