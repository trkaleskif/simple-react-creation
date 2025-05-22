
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { removeFromWishlist, clearWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { addToCart } from '@/redux/features/cart/cartSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Wishlist = () => {
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast({
      title: t("wishlist.cleared"),
      description: t("wishlist.clearedDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light tracking-tight">
            {t("wishlist.title")} {wishlistItems.length > 0 && `(${wishlistItems.length})`}
          </h1>
          {wishlistItems.length > 0 && (
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={handleClearWishlist}
            >
              <Trash2 size={16} className="mr-2" />
              {t("wishlist.clearAll")}
            </Button>
          )}
        </div>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border rounded-md overflow-hidden">
                <div className="aspect-square bg-[#f8f8f8] relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h2 className="font-medium hover:underline">{item.name}</h2>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description || ""}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-medium">€{item.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      {t("wishlist.addToCart")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Heart size={24} />
            </div>
            <h2 className="text-xl font-medium mb-2">{t("wishlist.emptyState")}</h2>
            <p className="text-gray-500 mb-6">{t("wishlist.emptyStateDesc")}</p>
            <Button asChild>
              <Link to="/catalog">{t("wishlist.startShopping")}</Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
