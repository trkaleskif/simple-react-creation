
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");

  // Calculate cart totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // We could calculate this based on user location, product weight, etc.
  const total = subtotal + shipping;

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/catalog");
  };

  const handleApplyCoupon = () => {
    // Implementation for coupon application would go here
    console.log("Applying coupon:", couponCode);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-light text-center mb-8">Shopping Cart</h1>
            <div className="flex flex-col items-center justify-center py-16 border">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
              <Button 
                onClick={handleContinueShopping}
                className="bg-ebony text-white hover:bg-black"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light text-center mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 text-left font-medium">Product</th>
                      <th className="py-4 text-center font-medium">Quantity</th>
                      <th className="py-4 text-right font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border"
                            >
                              -
                            </button>
                            <div className="w-12 h-8 flex items-center justify-center border-t border-b">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end space-x-4">
                            <span className="font-medium">
                              ${Number(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button 
                  onClick={handleClearCart}
                  variant="outline"
                  className="text-sm"
                >
                  CLEAR CART
                </Button>
                <Button 
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="text-sm"
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border p-6">
                <h2 className="text-xl font-medium mb-4">Cart Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${Number(subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Calculated at checkout" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>
                
                <div className="my-4 border-t border-b py-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${Number(total).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="coupon" className="text-sm font-medium">
                      Apply Discount Code
                    </label>
                    <div className="flex">
                      <Input 
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-r-none"
                        placeholder="Coupon code"
                      />
                      <Button 
                        onClick={handleApplyCoupon}
                        className="rounded-l-none"
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-ebony text-white hover:bg-black"
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
