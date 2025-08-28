import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero/Hero'
import AboutUsSection from './components/AboutUs/AboutUs'
import ExploreCardsSection from './components/Explore/ExploreCards'
import Form from './components/Form/Form'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Cursor from './components/Cursor'
import Testimonials from './components/Testimonials/Testimonials'
import OurSolutions from './components/OurSolutions/OurSolutions'
import OceanScene from './components/Ocean/Ocean'
import Explore from './components/Explore/Explore'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <MyThree /> */}
    <Navbar />
    <Cursor />

    <section className=''>
        <Hero />
    </section>
    <section className=''>
        <OceanScene />
    </section>
    <section className=''>
       <AboutUsSection />
    </section>
    <section className=''>
       {/* <ExploreCardsSection /> */}
       <Explore />
    </section>
    <section className=''>
      <Form />
    </section>
    <section className=''>
      <Footer />
    </section>
    <section className=''>
      <Testimonials/>
    </section>
    <section className=''>
      <OurSolutions/>
      
    </section>

    </>
  )
}

export default App