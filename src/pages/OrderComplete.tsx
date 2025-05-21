
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderComplete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  
  // Clear the cart when order is complete
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  
  // If there are no items and it wasn't just cleared, redirect to home
  useEffect(() => {
    const timer = setTimeout(() => {
      if (items.length === 0) {
        // navigate("/");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [items, navigate]);
  
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light">SHOPPING CART → CHECKOUT → ORDER COMPLETE</h1>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white p-8 border">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Check className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-medium mb-2">Thank you for your order!</h2>
              <p className="text-gray-500">
                Your order has been received and is now being processed.
              </p>
            </div>
            
            <div className="border-t border-b py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">ORDER NUMBER</p>
                <p className="font-medium">#12345</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">DATE</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">TOTAL</p>
                <p className="font-medium">$199.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PAYMENT METHOD</p>
                <p className="font-medium">Credit Card</p>
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="font-medium mb-4">ORDER DETAILS</h3>
              <div className="border-b pb-4 mb-4">
                <p className="font-medium mb-2">PRODUCT</p>
                <div className="flex justify-between">
                  <span>Modern Chair × 1</span>
                  <span>$199.00</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$199.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free shipping</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment method:</span>
                  <span>Credit Card</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>$199.00</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">BILLING ADDRESS</h3>
                  <p className="text-sm text-gray-600">
                    John Doe<br />
                    123 Main St<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States<br />
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">SHIPPING ADDRESS</h3>
                  <p className="text-sm text-gray-600">
                    John Doe<br />
                    123 Main St<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States<br />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate("/catalog")}
                className="bg-ebony text-white hover:bg-black"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderComplete;
