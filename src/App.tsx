import { AnimatePresence, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, useMatch, useNavigate } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { getProject } from './data/projects'
import { ProjectOverlay } from './features/project/ProjectOverlay'
import { SmoothScrollProvider } from './lib/smooth-scroll'
import { Contact } from './sections/contact/Contact'
import { Hero } from './sections/hero/Hero'
import { Process } from './sections/process/Process'
import { Projects } from './sections/projects/Projects'
import { Studio } from './sections/studio/Studio'

function Site() {
  const match = useMatch('/proyectos/:slug')
  const navigate = useNavigate()
  const project = match?.params.slug ? getProject(match.params.slug) : undefined

  // Un enlace a un proyecto que no existe vuelve al inicio
  useEffect(() => {
    if (match && !project) navigate('/', { replace: true })
  }, [match, project, navigate])

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Studio />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <AnimatePresence>{project && <ProjectOverlay key="ficha" project={project} />}</AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>
          <Site />
        </SmoothScrollProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
