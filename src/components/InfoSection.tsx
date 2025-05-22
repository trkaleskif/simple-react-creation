
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InfoSection = () => {
  const catalogues = [
    {
      id: "modern-classic",
      title: "Modern Classic",
      image: "https://images.unsplash.com/photo-1585080384259-5cc08ef7f74b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      color: "bg-amber-700"
    },
    {
      id: "inox-project",
      title: "Inox project",
      image: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      color: "bg-gray-400"
    },
    {
      id: "secret",
      title: "SECRET",
      image: "https://images.unsplash.com/photo-1630699144339-420f59b4747a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      color: "bg-gray-800"
    }
  ];

  return (
    <section id="information" className="py-12 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {catalogues.map((catalogue) => (
              <div key={catalogue.id} className="flex flex-col">
                <div className={`aspect-[3/4] ${catalogue.color} mb-3 md:mb-4 relative group overflow-hidden`}>
                  <img 
                    src={catalogue.image}
                    alt={catalogue.title}
                    className="w-full h-full object-cover opacity-0"
                  />
                  <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6">
                    <img 
                      src="/placeholder.svg"
                      alt="xfimet logo" 
                      className="h-3 md:h-4 w-auto"
                    />
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-medium">{catalogue.title}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-2 text-xs md:text-sm uppercase tracking-wider text-gray-500">
              CATALOGS AND BROCHURES
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-10 md:mb-20">
              Information,<br />details and<br />inspiration
            </h2>
            <div>
              <Link 
                to="/catalogues" 
                className="inline-flex items-center space-x-2 border border-gray-300 px-4 py-2 md:px-6 md:py-3 hover:bg-gray-100 transition-colors text-sm"
              >
                <span>CHECK OUT ALL THE CATALOGS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
