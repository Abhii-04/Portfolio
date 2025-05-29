import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import TerminalHome from './sections/TerminalHome'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <div className="relative min-h-screen">
          <ParticlesBackground />
          <Navbar />
          <main>
            <TerminalHome />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App