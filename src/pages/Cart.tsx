import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector(state => state.cart);
  const shipping = 0; // Free shipping
  const discount = 0;

  const calculateSubtotal = (items: any[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center mb-8 space-x-3">
            <span className="text-black font-medium underline">SHOPPING CART</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">CHECKOUT</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">ORDER COMPLETE</span>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="bg-white p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 font-medium text-gray-500">PRODUCT</th>
                      <th className="text-left py-4 font-medium text-gray-500">PRICE</th>
                      <th className="text-left py-4 font-medium text-gray-500">QUANTITY</th>
                      <th className="text-right py-4 font-medium text-gray-500">SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="mr-4 text-gray-400 hover:text-gray-600"
                            >
                              <span className="text-xl">×</span>
                            </button>
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4">
                              <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-gray-600">
                                {item.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-900">{item.price} ден</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center border rounded max-w-[120px]">
                            <button 
                              className="px-3 py-1 border-r"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity}
                              readOnly
                              className="w-10 px-2 py-1 text-center outline-none"
                            />
                            <button 
                              className="px-3 py-1 border-l"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="text-gray-900 font-medium">{(item.price * item.quantity)} ден</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row justify-between mt-8 gap-6">
                <div className="md:w-1/2 max-w-md">
                  <div className="flex border">
                    <input 
                      type="text" 
                      placeholder="Coupon code" 
                      className="flex-grow px-4 py-2 outline-none"
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 uppercase text-sm font-medium">
                      Apply coupon
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2 max-w-md ml-auto">
                  <div className="border p-6">
                    <h3 className="text-lg font-medium mb-4">CART TOTALS</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between border-b pb-3">
                        <span>Subtotal</span>
                        <span>{subtotal} ден</span>
                      </div>
                      <div className="flex justify-between border-b pb-3">
                        <span>Shipping</span>
                        <span className="text-right">
                          {shipping === 0 ? (
                            <button className="text-black underline">Calculate shipping</button>
                          ) : (
                            `${shipping} ден`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 font-medium">
                        <span>Total</span>
                        <span>{total} ден</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => navigate('/checkout')}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white">
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Browse our products to add items to your cart</p>
              <Button 
                onClick={() => navigate('/catalog')}
                className="bg-black text-white hover:bg-gray-800"
              >
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
