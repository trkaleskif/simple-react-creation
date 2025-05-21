
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity, closeCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer open={isOpen} onOpenChange={handleCloseCart}>
      <DrawerContent className="h-full">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Shopping cart</DrawerTitle>
            <DrawerClose>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b pb-4"
                  >
                    <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded-md hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded-md hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive mt-2 text-xs hover:underline"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleViewCart}
                  variant="outline"
                  className="w-full"
                >
                  VIEW CART
                </Button>
                <Button onClick={handleCheckout} className="w-full bg-ebony text-white hover:bg-black">
                  CHECKOUT
                </Button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
