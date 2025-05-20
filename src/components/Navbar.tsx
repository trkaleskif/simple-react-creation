
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-sm shadow-sm py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-medium">
          <span className="text-charcoal">
            <span className="inline-block mr-1">x</span>
            <span>fimet</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/catalog" className="hover:text-charcoal fancy-hover-effect">Catalog</Link>
          <Link to="#contact" className="hover:text-charcoal fancy-hover-effect">Contact</Link>
          <button 
            className="ml-8 text-charcoal" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-charcoal" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Full Screen Navigation Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-cream z-40 flex items-center justify-center">
            <button 
              className="absolute top-6 right-6 text-charcoal" 
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
            
            <nav className="text-center">
              <ul className="flex flex-col space-y-6">
                <li>
                  <Link
                    to="#products" 
                    className="text-3xl md:text-5xl font-light tracking-tight hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="#projects" 
                    className="text-3xl md:text-5xl font-light tracking-tight hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="#information" 
                    className="text-3xl md:text-5xl font-light tracking-tight hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Information
                  </Link>
                </li>
                <li>
                  <Link
                    to="#news" 
                    className="text-3xl md:text-5xl font-light tracking-tight hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact" 
                    className="text-3xl md:text-5xl font-light tracking-tight hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                <li className="pt-8">
                  <Link
                    to="/catalog" 
                    className="text-xl hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Catalog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
