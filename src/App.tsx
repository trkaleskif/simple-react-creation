
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Catalogues from "./pages/Catalogues";
import ProductDetails from "./pages/ProductDetails";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import './i18n'; // Make sure i18n is imported here as well

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <CartDrawer />
            <WishlistDrawer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalogues" element={<Catalogues />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </Provider>
  </ErrorBoundary>
);

export default App;
