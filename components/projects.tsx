import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card bg-black border border-red-900/20 overflow-hidden brush-stroke">
      <div className="relative h-48 md:h-64">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-cinzel text-red-700">{project.title}</h3>
        <p className="text-gray-400 mb-4 calligraphy">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-red-900/10 text-gray-300 px-2 py-1 border border-red-900/20">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-red-700 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" /> View
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Graphic Design",
      description:
        "A visually harmonious design portfolio showcasing creative poster designs, photo manipulations, and digital artwork using modern Adobe tools.",
      image:
        "https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2022/05/graphic-design-tools.png?height=400&width=600",
      tags: ["Poster Design", "Photo Manipulation", "Adobe Suite"],
      liveUrl:
        "https://drive.google.com/drive/folders/13hfswx9aUt2dHhf5GD4fRx28ddwOa-VD",
    },
    {
      id: 2,
      title: "3D Modelling",
      description:
        "A collection of 3D models crafted using industry-standard tools, focusing on realistic textures, lighting, and wireframe precision.",
      image:
        "https://i.ibb.co/RkV3GnhX/Whats-App-Image-2025-05-03-at-06-42-26-73ff46b7.jpg",
      tags: ["Blender", "Mesh Modeling", "Texturing", "Rendering"],
      liveUrl:
        "https://drive.google.com/drive/folders/19qbLog63AnY66XqctZkKdFqZD60e96Oc",
    },
    {
      id: 3,
      title: "Motion Graphics",
      description:
        "Creative animation work combining typography, motion, and effects—ideal for branding, promotional videos, and visual storytelling.",
      image:
        "https://popout.id/images/uploads/article/popout_agency_article_the-role-of-motion-graphic-in-digital-marketing.jpg?height=400&width=600",
      tags: ["After Effects", "Premiere Pro", "Kinetic Typography", "Storyboarding"],
      liveUrl:
        "https://drive.google.com/drive/folders/1pIVJWk8CrObYNCQtivvMFq5pYcplr8jc",
    },
    {
      id: 4,
      title: "Video Editing",
      description:
        "A series of short-form content edited with smooth transitions, color grading, and background scoring for YouTube and reels.",
      image:
        "https://sm.pcmag.com/pcmag_me/gallery/t/the-best-o/the-best-online-video-editors-for-2025_rjmd.jpg?height=400&width=600",
      tags: ["Video Editing", "Color Grading", "Transitions", "Sound Syncing"],
      liveUrl:
        "https://drive.google.com/drive/folders/1bbR75R8uI1CQPDrGkYyfdAFrh_LTZZ4t",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16 font-cinzel text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
