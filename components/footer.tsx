import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-red-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Quote */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold font-cinzel text-red-700">
              ARJIT <span className="text-gray-300">BHARGAVA</span>
            </Link>
            <p className="mt-4 text-gray-400 calligraphy">
              "A kalakaar, crafting motion from memory, and art from emotion."
            </p>
          </div>

          {/* Copyright and Credits */}
          <div className="text-right">
            <p className="text-gray-500">© {currentYear} Arjit Bhargava</p>
            <p className="text-gray-500">All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-600 calligraphy">Designed with the tranquility of a master samurai</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
