import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import AwardsHonours from "@/components/awards"

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <AwardsHonours />
      <Contact />
    </div>
  )
}
