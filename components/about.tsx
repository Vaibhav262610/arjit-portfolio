import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-20 ink-splash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16 font-cinzel text-center">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="order-2 md:order-1">
            <div className="space-y-6 calligraphy">
              <p className="text-gray-300">
                I am Arjit Bhargava, a passionate VFX artist and filmmaker with a
                multidisciplinary creative background. I have worked with both large and
                small studios as a freelance VFX artist, contributing to a diverse range of
                projects that span film, advertising, and digital media...
              </p>
              <p className="text-gray-300">
                Alongside my VFX career, I hold a professional diploma in photography and
                have won several national-level photography contests...
              </p>
              <p className="text-gray-300">
                I thrive at the intersection of technology and creativity, constantly pushing
                boundaries to craft immersive, impactful content...
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 md:order-2 flex justify-center relative">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 border border-red-900/30"></div>
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 border border-red-900/30"></div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image
                  src="https://i.ibb.co/C54JRTsv/IMG-20250310-203210.jpg"
                  alt="Arjit Bhargava"
                  width={400}
                  height={400}
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500 w-full h-full"
                />
              </div>

              {/* Ink splash decorative element */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    fill="rgba(180, 0, 0, 0.8)"
                    d="M65.7,56.3c0,0,1.1-3.2,4.3-3.2c3.2,0,4.3,3.2,4.3,3.2s3.2-1.1,3.2-4.3c0-3.2-3.2-4.3-3.2-4.3
                    s-1.1-3.2-4.3-3.2c-3.2,0-4.3,3.2-4.3,3.2s-3.2,1.1-3.2,4.3C62.5,55.2,65.7,56.3,65.7,56.3z M30,60c-5.5,0-10,4.5-10,10
                    s4.5,10,10,10s10-4.5,10-10S35.5,60,30,60z M70,20c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S75.5,20,70,20z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
