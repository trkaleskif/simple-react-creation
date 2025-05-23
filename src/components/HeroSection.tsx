
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define slides before any hooks that depend on it
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1617104551722-3b2d51366400?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      subtitle: t('hero.subtitle1'),
      title: t('hero.title1'),
      description: t('hero.description1')
    },
    {
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      subtitle: t('hero.subtitle2'),
      title: t('hero.title2'),
      description: t('hero.description2')
    }
  ];

  useEffect(() => {
    // Make sure we use a safe reference to slides.length
    const slidesCount = slides?.length || 0;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 7000);
    
    return () => clearInterval(interval);
  }, []); // Remove slides.length from dependency array to prevent re-renders

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (slides?.length || 1));
  };

  return (
    <section className="relative h-[85vh] md:h-screen overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Slide ${index + 1}`} 
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
      
      <div className="relative h-full container mx-auto flex flex-col justify-center">
        <div className="w-full md:w-1/2 lg:w-2/5 px-4 md:px-0 pt-16 md:pt-0">
          <span className="block text-xs md:text-sm tracking-widest mb-2 md:mb-4 text-charcoal">{slides[currentSlide].subtitle}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-4 md:mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mb-6 md:mb-8">
            {slides[currentSlide].description}
          </p>
          <a 
            href="#products" 
            className="inline-flex items-center space-x-2 fancy-hover-effect w-fit"
          >
            <span>{t('hero.explore')}</span>
          </a>
        </div>
      </div>
      
      {/* Process circle button - top right - hidden on mobile */}
      <button 
        onClick={goToNextSlide}
        className="absolute top-32 right-12 md:top-40 md:right-32 hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-charcoal/20 group hover:border-charcoal/40 transition-all duration-300"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs tracking-widest opacity-50 rotate-[-30deg] transform origin-center">
            {t('hero.process')}
          </span>
        </div>
        <div className="absolute right-11 flex items-center justify-center">
          <ArrowRight size={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
      
      {/* Scroll down - bottom left - hidden on mobile */}
      <div className="absolute bottom-10 left-10 md:left-24 hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-charcoal/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs tracking-widest opacity-50 rotate-[30deg] transform origin-center">
            {t('hero.scroll')}
          </span>
        </div>
        <a href="#products" className="absolute bottom-11 flex items-center justify-center">
          <ArrowDown size={24} className="opacity-70 hover:opacity-100 transition-opacity" />
        </a>
      </div>
      
      {/* Next slide arrow - bottom right - compact version on mobile */}
      <button 
        onClick={goToNextSlide}
        className="absolute bottom-10 right-6 md:right-24 flex items-center justify-center w-8 h-8 md:w-12 md:h-12"
      >
        <ArrowRight size={20} className="opacity-70 hover:opacity-100 transition-opacity" />
      </button>
      
      {/* Secret banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-charcoal text-white py-1 md:py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">{t('hero.secret')}</span>
          <span className="mx-4">•</span>
          <span className="mx-4">{t('hero.secret')}</span>
          <span className="mx-4">•</span>
          <span className="mx-4">{t('hero.secret')}</span>
          <span className="mx-4">•</span>
          <span className="mx-4">{t('hero.secret')}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
