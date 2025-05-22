
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { closeWishlist, removeFromWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const WishlistDrawer = () => {
  const { isOpen, items } = useAppSelector(state => state.wishlist);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleClose = () => {
    dispatch(closeWishlist());
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast({
      title: t("wishlist.itemRemoved"),
      description: t("wishlist.itemRemovedDesc"),
    });
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      ...item,
      quantity: 1,
    }));
    toast({
      title: t("wishlist.addedToCart"),
      description: t("wishlist.addedToCartDesc", { name: item.name }),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md w-full">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">
            {t("wishlist.title")} ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-8rem)]">
          {items.length > 0 ? (
            <div className="flex-1 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <button 
                          onClick={() => handleRemove(item.id)} 
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description || ""}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm font-medium">€{item.price}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8" 
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          {t("wishlist.addToCart")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">{t("wishlist.empty")}</p>
                <Button asChild>
                  <Link to="/catalog">{t("wishlist.continueShopping")}</Link>
                </Button>
              </div>
            </div>
          )}
          
          {items.length > 0 && (
            <div className="pt-4 border-t">
              <Button asChild className="w-full">
                <Link to="/wishlist">{t("wishlist.viewWishlist")}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleClose}
              >
                {t("wishlist.continueShopping")}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
