
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
        isScrolled ? "bg-background shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-medium">
          <span className="text-charcoal">Fimet</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#products" className="hover:text-charcoal fancy-hover-effect">Products</a></li>
            <li><a href="#projects" className="hover:text-charcoal fancy-hover-effect">Projects</a></li>
            <li><a href="#information" className="hover:text-charcoal fancy-hover-effect">Information</a></li>
            <li><a href="#news" className="hover:text-charcoal fancy-hover-effect">News</a></li>
            <li><a href="#contact" className="hover:text-charcoal fancy-hover-effect">Contact</a></li>
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-charcoal" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-background pt-16 px-4 z-40">
            <nav>
              <ul className="flex flex-col space-y-6 items-center text-xl">
                <li>
                  <a 
                    href="#products" 
                    className="hover:text-charcoal" 
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="hover:text-charcoal" 
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#information" 
                    className="hover:text-charcoal" 
                    onClick={() => setIsOpen(false)}
                  >
                    Information
                  </a>
                </li>
                <li>
                  <a 
                    href="#news" 
                    className="hover:text-charcoal" 
                    onClick={() => setIsOpen(false)}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="hover:text-charcoal" 
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
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
