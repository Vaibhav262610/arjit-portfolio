import type React from "react";
import { GraduationCap, BookOpen } from "lucide-react";

type Education = {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  icon: React.ElementType;
};

// --- FIX 1: Added 'description' field to the Certificate type ---
type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string; // Added this line
  url?: string;
};

const EducationCard = ({ item }: { item: Education }) => {
  const Icon = item.icon;

  return (
    <div className="relative pl-8 pb-12 border-l border-red-900/30">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-red-900/80 rounded-full flex items-center justify-center">
        <Icon size={16} className="text-white" />
      </div>
      <div className="bg-black p-6 border border-red-900/20 brush-stroke">
        <h3 className="text-xl font-bold mb-1 font-cinzel text-red-700">{item.degree}</h3>
        <p className="text-gray-300 mb-2">
          {item.institution}, {item.location}
        </p>
        <p className="text-gray-400 mb-4 text-sm">{item.period}</p>
        <p className="text-gray-300 calligraphy">{item.description}</p>
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <div className="bg-black p-6 border border-red-900/20 brush-stroke">
      <h3 className="text-lg font-bold mb-1 font-cinzel text-red-700">{certificate.title}</h3>
      <p className="text-gray-300 mb-2">{certificate.issuer}</p>
      <p className="text-gray-400 text-sm mb-3">{certificate.date}</p> {/* Added mb-3 for spacing */}
      {/* --- FIX 2 (Optional): Display the certificate description --- */}
      <p className="text-gray-300 calligraphy text-sm">{certificate.description}</p> {/* Added this line to display description */}
      {/* Removed the "View Certificate" link as requested */}
    </div>
  );
};

const Education = () => {
  const educationItems: Education[] = [
    {
      id: 1,
      degree: "Msc animation in Game Design and Vfx",
      institution: "Chandigarh University",
      location: "Gharuan, Mohali, Punjab",
      period: "2024 - 2026",
      description:
        "specialization in VFX and Game Design, focused on crafting immersive visuals and interactive experiences across games, films, and virtual platforms.",
      icon: GraduationCap,
    },
    {
      id: 2,
      degree: "BFA Animation in Vfx and 3D Animation",
      institution: "Arena Animation",
      location: "Bhopal, Madhaya Pradesh",
      period: "2018 - 2022",
      description:
        "Gained a strong foundation in 2D/3D animation, visual storytelling, compositing, and VFX pipelines, along with hands-on experience in industry-standard tools and creative production workflows.",
      icon: BookOpen,
    },
  ];

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Arena Expert in VFX and 3D animation",
      issuer: "Arena Animation",
      date: "2022",
      description: // This data now matches the type
        "Gained practical knowledge in advanced VFX techniques, 3D modeling, texturing, lighting, and compositing, with hands-on experience in industry tools and production-ready workflows.",
    },
    {
      id: 2,
      title: "Professional Photography Certification",
      issuer: "Shaw Academy",
      date: "2020",
      description: // This data now matches the type
        "Gained in-depth knowledge of camera operations, lighting, composition, and post-processing, with hands-on training in portrait, product, and outdoor photography.",
    },
    {
      id: 3,
      title: "Smart Phone Photography",
      issuer: "Shaw Academy",
      date: "2020",
      description: // This data now matches the type
        "Learned techniques in mobile composition, natural lighting, framing, and editing to create professional-grade visuals using smartphone cameras.",
    },
  ];

  return (
    <section id="education" className="py-20 ink-splash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16 font-cinzel text-center">
          Education & Certifications
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-8 font-cinzel text-red-700">Academic Journey</h3>
            <div className="space-y-6">
              {educationItems.map((item) => (
                <EducationCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 font-cinzel text-red-700">Certifications</h3>
            <div className="space-y-6">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
