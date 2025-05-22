
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsSection = () => {
  return (
    <section id="products" className="py-12 lg:py-32 bg-cream">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Minimalist door handle in a wooden door" 
              className="w-full h-[50vh] md:h-[70vh] object-cover rounded-none"
            />
          </div>
          
          <div className="flex flex-col lg:pl-12">
            <div className="mb-8 lg:mb-12">
              <h2 className="section-title">
                Shape, material, technique and color
              </h2>
              <p className="text-muted-foreground mb-6">
                Every product is the result of meticulous research and Italian craftsmanship, creating a perfect blend of form and function.
              </p>
              <Link to="/catalog" className="inline-flex items-center space-x-2 btn-outline mt-4">
                <span>View all products</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-lg lg:text-xl font-medium mb-2">Door hardware</h3>
                <p className="text-sm text-muted-foreground mb-3 lg:mb-4">
                  Elegant and functional door handles crafted with precision
                </p>
                <Link to="/catalog" className="text-sm fancy-hover-effect inline-block">
                  Discover more
                </Link>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-medium mb-2">Bathroom accessories</h3>
                <p className="text-sm text-muted-foreground mb-3 lg:mb-4">
                  Carefully designed elements for a sophisticated bathroom
                </p>
                <Link to="/catalog" className="text-sm fancy-hover-effect inline-block">
                  Discover more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
