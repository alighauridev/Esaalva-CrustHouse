import React from 'react'
import AboutNft from '../components/AboutNft'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Team from '../components/Team'
import "../scss/banner.scss"
const Home = () => {
    return (
        <>
            <Banner />
            <AboutNft />
            <Menu />
            <Team />
            <Footer />
        </>
    )
}

export default Home