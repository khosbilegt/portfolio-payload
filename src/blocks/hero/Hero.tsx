import React from 'react'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

function Hero({
  title = 'Welcome to My Portfolio',
  subtitle = 'Full Stack Developer & Creative Thinker',
  description = "I craft beautiful digital experiences with modern technologies. Let's build something amazing together.",
  ctaText = 'View My Work',
  ctaLink = '#projects',
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-primary via-green-secondary to-green-tertiary dark:from-green-secondary dark:via-green-tertiary dark:to-gray-900">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-green-primary/95 via-green-secondary/95 to-green-tertiary/95 dark:from-green-secondary/95 dark:via-green-tertiary/95 dark:to-gray-900/95 z-20" />

      <div className="relative z-30 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 max-w-7xl w-full px-6 lg:px-12 items-center">
        <div className="animate-fade-in-up text-center lg:text-left">
          <h1 className="mb-8 font-bold tracking-tight">
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white mb-3 drop-shadow-sm">
              {title}
            </span>
            <span className="block text-xl md:text-2xl lg:text-3xl font-light text-white/95 tracking-wide">
              {subtitle}
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/92 mb-10 max-w-2xl mx-auto lg:mx-0 font-light tracking-wide">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={ctaLink}
              className="inline-flex items-center px-8 py-4 bg-white/15 text-white rounded-full font-medium text-lg backdrop-blur-md border-2 border-white/25 transition-all duration-300 ease-out hover:bg-white/25 hover:border-white/40 hover:-translate-y-1 hover:shadow-xl tracking-wide"
            >
              {ctaText}
            </a>
            <a
              href="#about"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white rounded-full font-normal text-lg border-2 border-white/25 transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 hover:backdrop-blur-sm tracking-wide"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-64 lg:h-96 xl:h-[500px]">
          <div className="relative w-full h-full">
            <div className="absolute w-32 h-32 lg:w-40 lg:h-40 top-[15%] left-[15%] rounded-full bg-gradient-to-br from-white/12 to-green-primary/8 backdrop-blur-lg border border-white/15 shadow-2xl animate-float" />
            <div className="absolute w-20 h-20 lg:w-28 lg:h-28 top-[55%] right-[25%] rounded-full bg-gradient-to-br from-white/12 to-green-primary/8 backdrop-blur-lg border border-white/15 shadow-2xl animate-float-reverse" />
            <div className="absolute w-16 h-16 lg:w-20 lg:h-20 top-[25%] right-[15%] rounded-full bg-gradient-to-br from-white/12 to-green-primary/8 backdrop-blur-lg border border-white/15 shadow-2xl animate-float-delayed" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 opacity-80">
        <div className="w-6 h-6 border-2 border-white/60 border-t-transparent border-r-transparent transform rotate-45 animate-elegant-bounce" />
      </div>
    </section>
  )
}

export default Hero
