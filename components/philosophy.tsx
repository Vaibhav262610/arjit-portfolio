"use client"
import { ArrowDown } from "lucide-react"

const StarographyLogo = () => (
  <img
    src="https://i.ibb.co/nSxvG5Y/IMG-20250501-170701-110-1.webp"
    alt="Starography Logo"
    className="h-12 mb-6 mx-auto opacity-90"
  />
)

const CategoryImage = ({ title, subtitle, imageSrc, onClick }) => {
  return (
    <div className="w-full cursor-pointer group mb-8" onClick={onClick}>
      <div className="w-full h-48 overflow-hidden">
        <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover filter grayscale" />
      </div>
      <div className="text-center px-6 py-4">
        <h2 className="text-2xl font-bold mb-2 text-white tracking-tighter">{title}</h2>
        <p className="text-sm text-gray-300 mb-2 max-w-xs mx-auto">{subtitle}</p>
        <ArrowDown className="text-white mx-auto" size={16} />
      </div>
    </div>
  )
}

const GalleryImage = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
          <p className="text-white text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
            {subtitle}
          </p>
        </div>
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-square object-cover filter grayscale transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-medium mt-2 text-white">{title}</h3>
    </div>
  )
}

const categoryData = [
  {
    title: "URBAN SHADOWS",
    subtitle: "The hidden beauty of city nights captured in stark monochrome",
    image: "https://via.placeholder.com/600/400",
    images: [
      {
        title: "Neon Reflections",
        subtitle: "Downtown after rain, 2024",
        src: "https://via.placeholder.com/400/400",
      },
      {
        title: "Silhouette Stories",
        subtitle: "Subway entrance at dusk",
        src: "https://via.placeholder.com/400/400",
      },
      {
        title: "Concrete Dreams",
        subtitle: "Architecture study in shadows",
        src: "https://via.placeholder.com/400/400",
      },
    ],
  },
  {
    title: "ETHEREAL PORTRAITS",
    subtitle: "Revealing the soul through black and white portraiture",
    image: "https://via.placeholder.com/600/400",
    images: [
      {
        title: "Whispered Thoughts",
        subtitle: "Studio portrait series",
        src: "https://via.placeholder.com/400/400",
      },
      {
        title: "Weathered Wisdom",
        subtitle: "Character study of time",
        src: "https://via.placeholder.com/400/400",
      },
      {
        title: "Silent Conversation",
        subtitle: "Intimate moments captured",
        src: "https://via.placeholder.com/400/400",
      },
    ],
  },
]

export default function Philosophy() {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      {/* Header with Logo */}
      <header className="py-4 text-center">
        <StarographyLogo />
      </header>

      {/* Preview of a category and its gallery */}
      <CategoryImage
        title={categoryData[0].title}
        subtitle={categoryData[0].subtitle}
        imageSrc={categoryData[0].image}
        onClick={() => {}}
      />

      <div className="py-6 px-2">
        <h3 className="text-xl font-bold mb-2 text-white">{categoryData[0].title}</h3>
        <p className="text-sm text-gray-400 mb-6">{categoryData[0].subtitle}</p>

        <div className="grid grid-cols-3 gap-4">
          {categoryData[0].images.map((image, idx) => (
            <GalleryImage key={idx} title={image.title} subtitle={image.subtitle} imageSrc={image.src} />
          ))}
        </div>
      </div>
    </div>
  )
}
