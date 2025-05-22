import { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { toggleCart } from '@/redux/features/cart/cartSlice';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { t } = useTranslation();

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

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleCart());
  };

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
          <Link to="/catalog" className="hover:text-charcoal fancy-hover-effect">{t('navbar.catalog')}</Link>
          <Link to="/events" className="hover:text-charcoal fancy-hover-effect">{t('navbar.events')}</Link>
          <Link to="/contact" className="hover:text-charcoal fancy-hover-effect">{t('navbar.contact')}</Link>
          <Link to="/signin" className="hover:text-charcoal fancy-hover-effect flex items-center">
            <LogIn size={18} className="mr-1" /> {t('navbar.signin')}
          </Link>
          <Link to="/signup" className="hover:text-charcoal fancy-hover-effect flex items-center">
            <UserPlus size={18} className="mr-1" /> {t('navbar.signup')}
          </Link>
          <LanguageSwitcher />
          <button 
            onClick={handleCartClick}
            className="relative hover:text-charcoal fancy-hover-effect flex items-center"
            aria-label="Cart"
          >
            <ShoppingCart size={18} className="mr-1" /> {t('navbar.cart')}
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full"
              >
                {totalItems}
              </Badge>
            )}
          </button>
          <button 
            className="ml-8 text-charcoal" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {t('navbar.menu')}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <button 
            onClick={handleCartClick}
            className="relative hover:text-charcoal mr-4 ml-4"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full"
              >
                {totalItems}
              </Badge>
            )}
          </button>
          <button
            className="text-charcoal" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                    to="/contact" 
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
                <li>
                  <Link
                    to="/events" 
                    className="text-xl hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalogues" 
                    className="text-xl hover:text-charcoal/70 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    Catalogues
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart" 
                    className="text-xl hover:text-charcoal/70 transition-colors flex items-center justify-center" 
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart size={18} className="mr-1" /> Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin" 
                    className="text-xl hover:text-charcoal/70 transition-colors flex items-center justify-center" 
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={18} className="mr-1" /> Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup" 
                    className="text-xl hover:text-charcoal/70 transition-colors flex items-center justify-center" 
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus size={18} className="mr-1" /> Sign Up
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
