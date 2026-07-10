// import React from 'react'
import Nav from '../conmponents/Home/Nav'
import Hero from '../conmponents/Home/Hero'
import Caracteristica from '../conmponents/Home/Caracteristica'
import Section from '../conmponents/Home/Section'
import Footer from '../conmponents/Home/Footer'
import Beneficios from '../conmponents/Home/Beneficios'

const Home = () => {
    return (
        <div className="home-page">
            <Nav />
            <Hero />
            <Caracteristica />
            <Beneficios />
            <Section />
            <Footer />
        </div>
    )
}

export default Home
