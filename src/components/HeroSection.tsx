
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6">
              Italian passion, <br />
              research and technique
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8">
              Studies on materials and at the dedication to the research of unique and harmonic solutions that enhance the people and the space.
            </p>
            <a 
              href="#products" 
              className="inline-flex items-center space-x-2 fancy-hover-effect w-fit"
            >
              <span>Explore our products</span>
            </a>
          </div>

          <div className="relative h-[60vh] lg:h-[80vh]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-cream to-sand opacity-20"></div>
                <div className="relative h-full w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1617104551722-3b2d51366400?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Door handles" 
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <a 
            href="#products"
            className="flex flex-col items-center justify-center text-sm text-muted-foreground hover:text-charcoal transition-colors"
          >
            <span className="mb-2">Scroll down</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
