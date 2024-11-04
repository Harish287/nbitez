import React from 'react'
import Footer from './includes/Footer';
import Header from './includes/Header';
import { Section } from './includes/Section';
import Banner from '../components/Banner'


const Home = () => {
  

  return (
    <>
        <Header />
        <Banner page='Home' path={[]}/>
        <Section />
        <Footer />
    </>
  )
}

export default Home;