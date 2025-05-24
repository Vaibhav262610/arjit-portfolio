import type React from "react"
import { Award } from "lucide-react" // Import the Award icon

// Define the type for an Award item
type AwardItem = {
  id: number
  title: string
  organization: string // Changed from issuer for clarity
  date: string
  description: string
  icon: React.ElementType // Keep icon consistent if needed, or remove if not used per card
}

// Card component to display individual award details
// Styled similarly to CertificateCard but includes an icon
const AwardCard = ({ award }: { award: AwardItem }) => {
  const Icon = award.icon // Get the icon component

  return (
    // Using similar styling as CertificateCard: black background, red border, brush stroke effect
    <div className="bg-black p-6 border border-red-900/20 brush-stroke flex items-start space-x-4">
      {/* Icon Section */}
      <div className="flex-shrink-0 mt-1">
        <Icon size={24} className="text-red-700" />
      </div>
      {/* Details Section */}
      <div>
        {/* Award Title - using Cinzel font and red color */}
        <h3 className="text-lg font-bold mb-1 font-cinzel text-red-700">{award.title}</h3>
        {/* Organization Name - gray text */}
        <p className="text-gray-300 mb-1">{award.organization}</p>
        {/* Date - smaller gray text */}
        <p className="text-gray-400 text-sm mb-3">{award.date}</p>
        {/* Description - calligraphy style, gray text */}
        <p className="text-gray-300 calligraphy text-sm">{award.description}</p>
      </div>
    </div>
  )
}

// Main component for the Awards & Honours section
const AwardsHonours = () => {
  // Sample data for awards and honours
  const awardsData: AwardItem[] = [
    {
      id: 1,
      title: "Best Short Animated Film",
      organization: "Indie Film Fest",
      date: "2023",
      description:
        "Awarded for outstanding creativity and technical skill in the animated short 'Echoes of Time'. Praised for innovative storytelling and visual artistry.",
      icon: Award, // Using the Award icon
    },
    {
      id: 2,
      title: "Emerging Talent Grant",
      organization: "Creative Arts Foundation",
      date: "2022",
      description:
        "Received a grant recognizing potential and supporting the development of a new experimental animation project exploring environmental themes.",
      icon: Award, // Using the Award icon
    },
    {
      id: 3,
      title: "Top 10 Portfolio - Animation Category",
      organization: "Digital Artists Showcase",
      date: "2021",
      description:
        "Portfolio selected among the top 10 in the animation category, highlighting proficiency in character design, motion graphics, and VFX integration.",
      icon: Award, // Using the Award icon
    },
  ]

  return (
    // Section container with padding and ink-splash background class
    <section id="awards" className="py-20 ink-splash">
      {/* Centered content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - using Cinzel font, centered */}
        <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16 font-cinzel text-center">
          Awards & Honours
        </h2>

        {/* Grid layout for awards - single column centered, adjust grid-cols if needed */}
        {/* Using max-w-3xl to constrain width for a single column layout */}
        <div className="max-w-3xl mx-auto">
          {/* Spacing between award cards */}
          <div className="space-y-6">
            {/* Map through the awards data and render an AwardCard for each */}
            {awardsData.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Export the component for use in other parts of the application
export default AwardsHonours
