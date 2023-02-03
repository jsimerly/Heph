import React, { useState } from 'react'
import styles from './styles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryHero from './components/CategoryHero'
import Footer from './components/Footer'
import HowItWorks from './components/HowItWorks'
import CarouselHero from './components/CarouselHero'

function App() {
  return (

      <div className='w-full overflow-hidden bg-tertiaryTone-100'>
        <Navbar/>
        <Hero/>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <CategoryHero/>
            <HowItWorks/>
            <CarouselHero/>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <Footer/>
        </div>
      </div>
  )
}

export default App
