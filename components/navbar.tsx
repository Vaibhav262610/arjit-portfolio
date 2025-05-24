"use client"

import { useState, useEffect } from "react"
import { Menu, X, Camera } from "lucide-react"
import type React from "react" // Import React type for event handler
import { useRouter } from 'next/navigation'; // Import useRouter

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoverStarography, setHoverStarography] = useState(false) // This state seems unused, consider removing if not needed
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background on scroll
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "" // Default or fallback section
      const scrollPosition = window.scrollY + 100 // Add offset for better accuracy with fixed navbar

      sections.forEach((section) => {
        // Adjust offsetTop based on your fixed navbar height + some buffer
        const sectionTop = (section as HTMLElement).offsetTop // No need to subtract here if adding offset to scrollPosition
        const sectionHeight = (section as HTMLElement).offsetHeight
        const id = section.getAttribute("id")

        if (id && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = id
        }
      })

      // Handle edge cases (top/bottom of page)
      if (!currentSection && sections.length > 0) {
        if (scrollPosition < (sections[0] as HTMLElement)?.offsetTop) {
           // If above the first section, default to its ID or 'home'
          currentSection = sections[0]?.getAttribute("id") || "home"
        } else if (scrollPosition >= (sections[sections.length - 1] as HTMLElement)?.offsetTop + (sections[sections.length - 1] as HTMLElement)?.offsetHeight) {
          // If scrolled past the last section, keep the last section active
           currentSection = sections[sections.length - 1]?.getAttribute("id") || "home"
        } else {
           // Fallback if somehow still no section is matched (e.g., only one section)
           currentSection = sections[0]?.getAttribute("id") || "home"
        }
      } else if (sections.length === 0) {
          currentSection = "home"; // Default if no sections found
      }


      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true }) // Use passive listener for performance
    // Run once on mount to set initial state correctly
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Empty dependency array ensures this runs only once on mount and cleanup on unmount

  // Function to scroll to the home section (or root path)
  const scrollToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Check if already on the home page to avoid unnecessary navigation
    if (window.location.pathname !== '/') {
        router.push('/'); // Navigate to root path only if not already there
        // Delay scrolling until after navigation might have occurred
        setTimeout(() => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                window.scrollTo({
                    top: homeSection.offsetTop - 80, // Adjust offset (navbar height)
                    behavior: 'smooth',
                });
            } else {
                 // Fallback: scroll to top if #home doesn't exist immediately
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 150); // Slightly longer delay
    } else {
        // If already on the home page, just scroll
        const homeSection = document.getElementById('home');
        if (homeSection) {
             window.scrollTo({
                top: homeSection.offsetTop - 80, // Adjust offset
                behavior: 'smooth',
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback scroll to top
        }
    }
    setIsOpen(false); // Close mobile menu
  };

  // Function to handle clicks on internal navigation links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only proceed if it's an internal hash link
    if (!href.startsWith("#")) return

    e.preventDefault()
    const targetId = href.substring(1) // Use substring(1) instead of replace
    const element = document.getElementById(targetId)

    if (element) {
      setIsOpen(false) // Close mobile menu if open

      // Calculate scroll position considering fixed navbar height (adjust 80 if needed)
      const offsetTop = element.offsetTop - 80

      // Scroll smoothly to the section
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      // Update URL hash using pushState for cleaner history
      // Avoid pushing state if the hash is already correct to prevent multiple history entries
      if (window.location.hash !== href) {
         window.history.pushState(null, "", href)
      }


      // Manually set active section immediately for better visual feedback
      setActiveSection(targetId)
    }
  }

  // --- Updated navLinks with "Awards" ---
  const navLinks = [
    // Home link uses the specific scrollToHome function
    { name: "Home", href: "#home", isExternal: false, onClick: scrollToHome },
    { name: "About", href: "#about", isExternal: false },
    { name: "Skills", href: "#skills", isExternal: false },
    { name: "Projects", href: "#projects", isExternal: false },
    { name: "Education", href: "#education", isExternal: false },
    // --- Added Awards Link ---
    { name: "Awards", href: "#awards", isExternal: false },
    { name: "Contact", href: "#contact", isExternal: false },
  ];

  return (
    <nav
      // Navbar styling: fixed position, full width, high z-index, transition effect
      // Background changes based on scroll state (scrolled)
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent" // Added shadow when scrolled
      }`}
    >
      {/* Max width container for content, centered with padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for logo, desktop nav, and mobile menu button */}
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            {/* Logo Link - points to home */}
            <a
              href="/" // Use "/" for the root path
              onClick={scrollToHome} // Use the dedicated home scroll function
              className="text-xl font-bold font-cinzel text-red-700 flex items-center cursor-pointer group" // Added group for potential hover effects
            >
              <img
                src="https://i.ibb.co/0jTTXm3V/kalakar-logo.jpg" // Ensure this URL is correct and accessible
                alt="Kalakaar Logo"
                className="h-16 w-auto mr-2 transition-transform duration-300 group-hover:scale-105" // Slight scale effect on hover
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/64x64/ff0000/ffffff?text=Logo')} // Basic fallback
              />
              {/* Optional: Add text next to the logo */}
              {/* <span className="text-gray-300 group-hover:text-red-600 transition-colors">Kalakaar</span> */}
            </a>
          </div>

          {/* Desktop Menu - hidden on medium screens and below */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Map through navLinks to create desktop navigation items */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // Use custom onClick for Home, otherwise use handleNavClick for hash links
                onClick={link.onClick || ((e) => handleNavClick(e, link.href))}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                // Dynamic classes for active state and hover effects
                className={`font-cinzel px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer relative group ${
                  activeSection === link.href.replace(/#|\//g, "") // Check active section (remove # or /)
                    ? "text-red-700" // Active link color
                    : "text-gray-300 hover:text-red-600" // Default and hover color
                }`}
              >
                {link.name}
                {/* Underline effect for active/hover */}
                 <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${
                      activeSection === link.href.replace(/#|\//g, "") ? 'scale-x-100' : 'scale-x-0' // Show underline if active
                    }`}
                 ></span>
              </a>
            ))}
            {/* Special Starography Button - Always Visible on Desktop */}
            <a
              href="/starography" // Link to the Starography page
              className="bg-red-700 hover:bg-red-800 transition-all duration-300 text-white flex items-center gap-2 py-2 px-4 rounded-lg font-cinzel text-sm font-medium shadow-lg hover:shadow-red-900/50 whitespace-nowrap cursor-pointer"
              target="_blank" // Consider if this should open in a new tab
              rel="noopener noreferrer"
            >
              <Camera size={18} />
              Starography
            </a>
          </div>

          {/* Mobile Menu Button - visible on medium screens and below */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu state
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" // Improved focus state
              aria-controls="mobile-menu" // Link button to the menu for accessibility
              aria-expanded={isOpen} // Indicate whether the menu is open
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span> {/* Screen reader text */}
              {/* Show X icon when open, Menu icon when closed */}
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Conditionally rendered based on isOpen state */}
      {/* Use transition for smooth opening/closing */}
      <div
         className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[85vh] border-t border-gray-700' : 'max-h-0'}`} // Animate max-height
         id="mobile-menu"
      >
        {/* Padding and spacing for mobile links */}
        <div className="px-4 pt-4 pb-6 space-y-3 sm:px-5 bg-black/95 backdrop-blur-md max-h-[calc(85vh-4rem)] overflow-y-auto"> {/* Allow scrolling within menu */}
          {/* Map through navLinks for mobile */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              // Use root path for Home link, otherwise the standard href
              href={link.href === "#home" ? "/" : link.href}
              onClick={(e) => {
                // Close menu first
                setIsOpen(false);
                // Execute specific onClick (like scrollToHome) or handleNavClick
                if (link.onClick) {
                   // Need to pass a proper event or handle differently if event is required
                   // Forcing a type cast here, ensure scrollToHome handles potential null event
                   link.onClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
                } else {
                   handleNavClick(e, link.href);
                }
              }}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              // Styling for mobile links, highlighting the active one
              className={`font-cinzel flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ${
                activeSection === link.href.replace(/#|\//g, "")
                  ? "text-white bg-red-700/80" // Active style
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50" // Default and hover style
              }`}
            >
              {/* You could add icons here if desired */}
              {link.name}
            </a>
          ))}

          {/* Add Starography link to mobile menu */}
          <a
            href="/starography"
            className="font-cinzel flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer"
            onClick={() => setIsOpen(false)} // Close mobile menu on click
            target="_blank" // Open in new tab
            rel="noopener noreferrer"
          >
            <img
              src="https://i.ibb.co/nSxvG5Y/IMG-20250501-170701-110-1.webp" // Ensure URL is correct
              alt="Starography preview"
              className="h-6 w-6 rounded-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
            />
            Starography
          </a>
          {/* Removed the duplicate "Home" link from the mobile menu as it's covered by navLinks */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
