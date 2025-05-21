import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCartItems } from "@/redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems, isLoading, error } = useAppSelector(state => state.cart);
  const shipping = 5;
  const discount = 0;

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const calculateTotal = (items: any[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total;
  };

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>Error loading cart: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-light tracking-tight mb-8">Shopping Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-4 text-sm font-medium text-gray-500">Product</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Price</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Total</th>
                        <th className="px-6 py-4 sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                <p className="text-gray-500 text-sm">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{item.quantity}</div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="text-sm text-gray-500">€{item.price}</div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="relative inline-flex">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-semibold text-gray-500 hover:bg-gray-100"
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="bg-gray-50 rounded-md p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>€{calculateTotal(cartItems).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping > 0 ? `€${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-€{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-xl">€{(calculateTotal(cartItems) + shipping - discount).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                  </div>
                  
                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
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
