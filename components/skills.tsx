import type React from "react"
import { Code, Palette, Globe, Camera, Film, Gamepad2 } from "lucide-react" // updated icons

const SkillCategory = ({
  title,
  skills,
  icon: Icon,
}: {
  title: string
  skills: { name: string; level: number }[]
  icon: React.ElementType
}) => {
  return (
    <div className="bg-black p-6 border border-red-900/20 brush-stroke">
      <div className="flex items-center mb-6">
        <Icon className="text-red-700 mr-3" size={24} />
        <h3 className="text-xl font-bold font-cinzel">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">{skill.name}</span>
              {/* Removed percentage */}
            </div>
            <div className="skill-bar">
              <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      title: "VFX & Motion Design",
      icon: Code,
      skills: [
        { name: "Compositing", level: 95 },
        { name: "Motion Graphics", level: 94 },
        { name: "Matte Painting", level: 91 },
        { name: "After Effects", level: 98 },
        { name: "Nuke", level: 95 },
      ],
    },
    {
      title: "Video Editing & Color Grading",
      icon: Film,
      skills: [
        { name: "Adobe Premiere Pro", level: 100 },
        { name: "DaVinci Resolve", level: 98 },
        { name: "Color Grading", level: 95 },
        { name: "Video Editing", level: 100 },
      ],
    },
    {
      title: "Cinematography & Storyboarding",
      icon: Camera,
      skills: [
        { name: "Cinematography", level: 90 },
        { name: "Storyboarding", level: 95 },
      ],
    },
    {
      title: "Game Development",
      icon: Gamepad2,
      skills: [
        { name: "Unreal Engine", level: 75 },
        { name: "Blender", level: 92 },
      ],
    },
    {
      title: "3D Animation & Simulation",
      icon: Globe,
      skills: [
        { name: "3D Animation", level: 100 },
        { name: "Simulation", level: 100 },
        { name: "Maya", level: 93 },
      ],
    },
    {
      title: "Soft Skills",
      icon: Globe,
      skills: [
        { name: "Team Collaboration", level: 100 },
        { name: "Problem Solving", level: 100 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 ink-splash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16 font-cinzel text-center">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
