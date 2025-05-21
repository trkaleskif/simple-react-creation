
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Coupon logic would go here
    console.log("Applying coupon:", couponCode);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // We could calculate this based on user location, product weight, etc.
  const total = subtotal + shipping;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light">SHOPPING CART → CHECKOUT → ORDER COMPLETE</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button
                onClick={() => navigate("/catalog")}
                className="bg-ebony text-white hover:bg-black"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border-b grid grid-cols-12 py-4 hidden md:grid">
                  <div className="col-span-6">
                    <h2 className="font-medium uppercase">Product</h2>
                  </div>
                  <div className="col-span-2 text-center">
                    <h2 className="font-medium uppercase">Price</h2>
                  </div>
                  <div className="col-span-2 text-center">
                    <h2 className="font-medium uppercase">Quantity</h2>
                  </div>
                  <div className="col-span-2 text-right">
                    <h2 className="font-medium uppercase">Subtotal</h2>
                  </div>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="border-b py-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-6 flex items-center space-x-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-center flex justify-between md:block">
                        <span className="md:hidden font-medium">Price:</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>

                      <div className="md:col-span-2 md:text-center flex justify-between md:block">
                        <span className="md:hidden font-medium">Quantity:</span>
                        <div className="flex items-center md:justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="border h-8 w-8 flex items-center justify-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="border h-8 w-8 flex items-center justify-center"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-right flex justify-between md:block">
                        <span className="md:hidden font-medium">Subtotal:</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between">
                  <form onSubmit={handleApplyCoupon} className="flex">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      APPLY COUPON
                    </Button>
                  </form>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/catalog")}
                  >
                    UPDATE CART
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="border p-6">
                  <h2 className="text-xl font-medium mb-4">CART TOTALS</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span>Calculate shipping</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between py-2 font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <Button
                      className="w-full bg-ebony text-white hover:bg-black"
                      onClick={() => navigate("/checkout")}
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
