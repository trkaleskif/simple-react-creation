
import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Product type definition
interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
}

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock products data
  const products: Product[] = [
    { id: "1", name: "Adele 1239 DK", image: "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
    { id: "2", name: "Adele 1239 DRK", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
    { id: "3", name: "Adele 1239/709", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
    { id: "4", name: "Adele 1239/709", image: "https://images.unsplash.com/photo-1573126617818-d3c8deac7022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Classic" },
    { id: "5", name: "Adele 1239/713", image: "https://images.unsplash.com/photo-1599360889420-da1afaba9edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Classic" },
    { id: "6", name: "Adele 1239/719H", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
    { id: "7", name: "Adele 1220 DK", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Accessories" },
    { id: "8", name: "Adele 1220 DKR", image: "https://images.unsplash.com/photo-1630699144339-420f59b4747a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Accessories" },
    { id: "9", name: "Alabama 801", image: "https://images.unsplash.com/photo-1582741099331-93a18130274c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Extra Lock" },
  ];

  // Filter categories
  const categories = [
    { id: "modern", label: "Modern" },
    { id: "classic", label: "Classic" },
    { id: "accessories", label: "Accessories" },
    { id: "extra-lock", label: "Extra Lock" },
    { id: "window-accessories", label: "Window Accessories" },
  ];

  // Product types
  const productTypes = [
    { id: "plates", label: "Plates" },
    { id: "handle-handle", label: "Handle Handle" },
    { id: "recessed-handle", label: "Recessed Handle" },
    { id: "handle", label: "Handle" },
    { id: "lifting-handle", label: "Lifting Handle" },
    { id: "knob-with-key", label: "Knob with key" },
    { id: "knob", label: "Knob" },
  ];

  // Materials
  const materials = [
    { id: "aluminum", label: "Aluminum" },
    { id: "inox-aisi-304", label: "Inox AISI 304" },
    { id: "inox-aisi-316", label: "Inox AISI 316" },
    { id: "stainless-steel", label: "Stainless Steel" },
    { id: "brass", label: "Brass" },
    { id: "zamak", label: "Zamak" },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">PRODUCT CATALOG</p>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Design, technology<br />and innovation</h1>
            <p className="text-gray-600 max-w-2xl">
              The complete catalog of handles, grab bars, knobs and accessories, in stainless steel, aluminum and brass, filter by type, model, finish or select the designer who designed them.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 border-t border-b border-gray-200 py-4">
            <div className="flex items-center">
              <Search className="absolute left-3 text-gray-400" size={20} />
              <Input 
                type="text"
                placeholder="Search..."
                className="pl-10 border-none focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                RESET ALL
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              {/* Collection Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Collection</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.id}`} />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Product</h3>
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox id={`product-${type.id}`} />
                      <label 
                        htmlFor={`product-${type.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Material</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material.id} className="flex items-center space-x-2">
                      <Checkbox id={`material-${material.id}`} />
                      <label 
                        htmlFor={`material-${material.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {material.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id} 
                    className="group"
                  >
                    <div className="aspect-square bg-[#f8f8f8] mb-3 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
