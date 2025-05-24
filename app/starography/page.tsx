"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, X } from "lucide-react"

interface Content {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

interface CategoryImageProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  onClick: () => void;
}

interface GalleryImageProps {
  image: {
    src: string;
    title?: string;
    subtitle?: string;
  };
  onClick: (image: { src: string; title?: string; subtitle?: string }) => void;
}

interface ImageModalProps {
  image: {
    src: string;
    title?: string;
    subtitle?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

// Custom Navbar specifically for Starography page (Original Dark Theme)
const StarographyNavbar = () => {
  return (
    // Reverted to original styles
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold font-cinzel text-red-700 flex items-center">
              <img
                src="https://i.ibb.co/tphm5gmW/Screenshot-2025-05-03-010020.png"
                alt="Kalakaar Logo"
                className="h-12 w-auto mr-2"
              />
              {/* Reverted: Added back the original empty span */}
              <span className="text-gray-300"></span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              // Reverted to original styles
              className="font-cinzel text-gray-300 hover:text-red-700 transition-colors duration-300 px-3 py-2 text-sm"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// CategoryImage Component (Light Theme - No changes from previous step)
const CategoryImage = ({ title, subtitle, imageSrc, onClick }: CategoryImageProps) => {
  return (
    <div className="w-full cursor-pointer group mb-8" onClick={onClick}>
      <div
        className="mx-auto overflow-hidden rounded-lg shadow-lg"
        style={{ height: "350px", width: "100%", maxWidth: "800px" }}
      >
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>
      <div className="text-center px-6 py-4">
        <h2 className="text-2xl font-bold mb-2 text-black tracking-tighter">{title}</h2> {/* Light theme text */}
        <p className="text-sm text-gray-600 mb-2 max-w-lg mx-auto">{subtitle}</p> {/* Light theme text */}
        <ArrowDown className="text-black mx-auto" size={16} /> {/* Light theme icon */}
      </div>
    </div>
  )
}

// GalleryImage Component (Light Theme - No changes from previous step)
const GalleryImage = ({ image, onClick }: GalleryImageProps) => {
  return (
    <div className="group cursor-pointer" onClick={() => onClick(image)}>
      <div className="relative overflow-hidden rounded-lg shadow-md border border-gray-100">
        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center"> {/* Light overlay bg */}
          <p className="text-black text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"> {/* Light theme text */}
            {image.subtitle || "View larger"}
          </p>
        </div>
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.title || "Gallery image"}
          className="w-full aspect-square object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>
      {image.title && <h3 className="text-sm font-medium mt-2 text-black">{image.title}</h3>} {/* Light theme text */}
    </div>
  )
}

// ImageModal Component (Light Theme - No changes from previous step)
const ImageModal = ({ image, isOpen, onClose, onPrev, onNext, hasNext, hasPrev }: ImageModalProps) => {
  if (!isOpen || !image) return null

  return (
    <div className="fixed inset-0 bg-white/95 z-50 flex items-center justify-center p-4"> {/* Light background */}
      <div className="relative w-full max-w-4xl">
        <button onClick={onClose} className="absolute -top-10 right-0 text-black" aria-label="Close"> {/* Light theme icon */}
          <X size={24} />
        </button>

        <div className="relative">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.title || "Full size image"}
            className="w-full h-auto max-h-[80vh] object-contain"
          />

          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200/50 p-2 rounded-full text-black hover:bg-gray-300/80 transition-colors" // Light theme controls
              aria-label="Previous image"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200/50 p-2 rounded-full text-black hover:bg-gray-300/80 transition-colors" // Light theme controls
              aria-label="Next image"
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>

        {(image.title || image.subtitle) && (
          <div className="text-black text-center mt-4"> {/* Light theme text */}
            {image.title && <h3 className="text-lg font-medium">{image.title}</h3>}
            {image.subtitle && <p className="text-sm text-gray-600">{image.subtitle}</p>} {/* Light theme text */}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PhotographyPortfolio() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title?: string; subtitle?: string } | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true;

    const fetchContents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/content?apiKey=06e401f5-fe18-4fb8-b2d0-6deca0054fa1', {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (isMounted) {
          setContents(data);
        }
      } catch (error) {
        console.error('Error fetching contents:', error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Failed to fetch content');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Transform API data to match our component structure
  const categoryData = contents.map(content => ({
    title: content.title || 'Untitled',
    subtitle: content.subtitle || 'No description available',
    image: content.imageUrls?.[0] || '/placeholder.svg',
    images: (content.imageUrls || []).map(url => ({ src: url }))
  }));

  // Modal functions remain the same
  const openModal = (image: { src: string; title?: string; subtitle?: string }) => {
    const currentCategoryImages = categoryData[activeCategory]?.images || [];
    const index = currentCategoryImages.findIndex((img) => img.src === image.src);
    if (index !== -1) {
        setCurrentImageIndex(index);
        setSelectedImage(image);
        setModalOpen(true);
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedImage(null), 300);
  }

  const goToNextImage = () => {
    const currentCategoryImages = categoryData[activeCategory]?.images || [];
    if (currentCategoryImages.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % currentCategoryImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(currentCategoryImages[nextIndex])
  }

  const goToPrevImage = () => {
    const currentCategoryImages = categoryData[activeCategory]?.images || [];
    if (currentCategoryImages.length === 0) return;
    const prevIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(currentCategoryImages[prevIndex])
  }

  if (loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we fetch your content.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Content Available</h2>
          <p className="text-gray-600">There are no categories to display at the moment.</p>
        </div>
      </div>
    );
  }

  const currentCategory = categoryData[activeCategory] || categoryData[0];
  const currentImages = currentCategory?.images || [];

  return (
    // Main background is white, text is black
    <div className="bg-white text-black min-h-screen">
      {/* Original Dark Navbar */}
      <StarographyNavbar />

      {/* Header with Logo (Light Theme) */}
      {/* Added pt-16 to header container to account for fixed navbar height */}
      <header className="pt-24 pb-8 text-center"> {/* pt-24 = pt-16 (navbar height) + pb-8 */}
        <img
          src="https://i.ibb.co/nSxvG5Y/IMG-20250501-170701-110-1.webp"
          alt="Starography Logo"
          className="h-16 mb-6 mx-auto opacity-90"
        />
        <h1 className="text-3xl font-bold mb-2 font-cinzel text-black">STAROGRAPHY</h1> {/* Light theme text */}
        <p className="text-gray-600 max-w-2xl mx-auto px-4"> {/* Light theme text */}
          A visual journey through moments captured in time, where light and shadow tell stories beyond words.
        </p>
      </header>

      {/* Category Navigation (Light Theme) */}
      <div className="flex justify-center gap-3 mb-12 px-4 flex-wrap">
        {categoryData.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeCategory === idx
                ? "bg-red-700 text-white" // Active state
                : "bg-gray-200 text-gray-800 hover:bg-gray-300" // Inactive state (Light theme)
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Category Hero (Light Theme) */}
      <div className="container mx-auto px-4 max-w-6xl">
        <CategoryImage
          title={currentCategory.title}
          subtitle={currentCategory.subtitle}
          imageSrc={currentCategory.image}
          onClick={() => {}}
        />

        {/* Gallery (Light Theme) */}
        <div className="py-6 px-2 mb-16">
          <h3 className="text-2xl font-bold mb-8 text-black font-cinzel">{currentCategory.title}</h3> {/* Light theme text */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentImages.map((image, idx) => (
              <GalleryImage key={idx} image={image} onClick={openModal} />
            ))}
          </div>
        </div>
      </div>

      {/* About section (Light Theme) */}
      <div className="container mx-auto px-4 max-w-6xl py-16 mt-12 bg-gray-100 rounded-lg"> {/* Light theme background */}
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-6 text-black font-cinzel">About the Photographer</h2> {/* Light theme text */}
            <p className="text-gray-700 leading-relaxed mb-4"> {/* Light theme text */}
              Hi, I'm Arjit Bhargava, a professional photographer with a deep passion for visual storytelling. My journey in photography began alongside my work in visual effects and filmmaking, allowing me to develop a sharp eye for detail, composition, and emotion. Holding a professional diploma in photography, I've had the opportunity to explore diverse styles and subjects, and my work has been recognized through several national-level photography awards.
            </p>
            <p className="text-gray-700 leading-relaxed"> {/* Light theme text */}
              What sets my photography apart is the way I blend narrative depth with aesthetic precision. Whether it's capturing candid moments, staged portraits, or conceptual shoots, I strive to tell a story through every frame. My experience across visual mediums helps me bring a cinematic quality to still images, making each photograph not just a picture, but a powerful visual experience.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://i.ibb.co/qMJWwydT/IMG-20250331-004926.jpg"
              alt="Arjit Bhargava"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: "640px", maxHeight: "960px" }}
            />
          </div>
        </div>
      </div>

      {/* Spacer at the bottom */}
      <div className="h-16"></div>

      {/* Image Modal (Light Theme) */}
      <ImageModal
        image={selectedImage}
        isOpen={modalOpen}
        onClose={closeModal}
        onNext={goToNextImage}
        onPrev={goToPrevImage}
        hasNext={currentImages.length > 1}
        hasPrev={currentImages.length > 1}
      />
    </div>
  )
}
