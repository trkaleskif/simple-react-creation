
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity, closeCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleViewCart = () => {
    navigate("/cart");
    handleCloseCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
    handleCloseCart();
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleCloseCart}>
      <SheetContent className="w-[400px] sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Shopping cart</SheetTitle>
            <SheetClose className="rounded-full hover:bg-slate-100 p-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-10rem)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border-b pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-20 w-20 bg-slate-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center mt-2 justify-between">
                          <div className="flex border rounded">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 border-r"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border-l"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-medium">{item.price} ден</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">{calculateSubtotal()} ден</span>
                </div>
                <Button
                  onClick={handleViewCart}
                  variant="outline"
                  className="w-full"
                >
                  VIEW CART
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  CHECKOUT
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
