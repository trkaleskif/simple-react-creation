
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Catalogues = () => {
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  const companyInfo = {
    id: "company-profile",
    title: "Company profile",
    image: "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    color: "bg-stone-200"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreedToTerms) {
      console.log('Download requested:', { email });
      // Handle download logic here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">DOWNLOAD</p>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
              Download<br />official FIMET<br />documents
            </h1>
            <p className="text-gray-600 max-w-md">
              Access a wide range of details about our products, including technical
              specifications, finishing options, and customization possibilities.
            </p>
          </div>
          
          {/* Catalogs Section */}
          <div className="mb-24">
            <h2 className="text-2xl font-light mb-8">Catalogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {catalogues.map((catalogue) => (
                <div key={catalogue.id} className="flex flex-col">
                  <div className={`aspect-[3/4] ${catalogue.color} mb-4 relative group overflow-hidden`}>
                    <img 
                      src={catalogue.image}
                      alt={catalogue.title}
                      className="w-full h-full object-cover opacity-0"
                    />
                    <div className="absolute bottom-6 left-6">
                      <img 
                        src="/placeholder.svg"
                        alt="xfimet logo" 
                        className="h-4 w-auto"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">{catalogue.title}</h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Company Section */}
          <div className="mb-24">
            <h2 className="text-2xl font-light mb-8">Company</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className={`aspect-[3/4] ${companyInfo.color} mb-4 relative group overflow-hidden`}>
                  <img 
                    src={companyInfo.image}
                    alt={companyInfo.title}
                    className="w-full h-full object-cover opacity-0"
                  />
                  <div className="absolute bottom-6 left-6">
                    <img 
                      src="/placeholder.svg"
                      alt="xfimet logo" 
                      className="h-4 w-auto"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-medium">{companyInfo.title}</h3>
              </div>
            </div>
          </div>
          
          {/* Download Section */}
          <div className="bg-gray-800 text-white py-20 px-8 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">DOWNLOAD FILE</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-10">
                A look<br />at the world of Fimet
              </h2>
              <form onSubmit={handleSubmit} className="max-w-md">
                <p className="mb-6">Enter your email address to download the document immediately.</p>
                <div className="flex border border-gray-600">
                  <Input
                    type="email"
                    placeholder="Your e-mail address"
                    className="bg-transparent border-none focus-visible:ring-0 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-transparent px-4 py-2 border-l border-gray-600 hover:bg-gray-700 transition-colors">
                    DOWNLOAD <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
                    required
                  />
                  <label 
                    htmlFor="terms"
                    className="text-xs text-gray-400 leading-none"
                  >
                    *I consent to the processing of data as per the <Link to="/privacy" className="underline">Privacy Policy</Link>
                  </label>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Door handle"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalogues;
