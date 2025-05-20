
import { ArrowRight } from 'lucide-react';

const InfoSection = () => {
  const catalogues = [
    {
      title: "Technical",
      image: "https://images.unsplash.com/photo-1618828272960-9403e1b85a1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      description: "Full specifications and technical details"
    },
    {
      title: "Editions",
      image: "https://images.unsplash.com/photo-1535359056830-d4badde79747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      description: "Special collections and limited editions"
    },
    {
      title: "2023",
      image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      description: "Latest collection and new releases"
    }
  ];

  return (
    <section id="information" className="py-16 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="grid grid-cols-3 gap-4">
            {catalogues.map((catalogue, index) => (
              <div key={index} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-cream mb-4">
                  <img 
                    src={catalogue.image} 
                    alt={catalogue.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{catalogue.title}</h3>
                <p className="text-xs text-muted-foreground">{catalogue.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="section-title">
              Information, details and inspiration
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore our catalogues, design guides, technical specifications and get inspired by our creations and collaborations with world-renowned architects and designers.
            </p>
            <a href="#" className="btn-primary inline-flex items-center space-x-2 w-fit">
              <span>Download catalogues</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
