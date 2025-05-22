import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { useTranslation } from 'react-i18next';

// Mock product database with details
const productsDatabase = [
  { 
    id: "1", 
    name: "Adele 1239 DK", 
    image: "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", 
    category: "Modern",
    price: "64.15",
    currency: "€",
    sku: "ADELE1239DK",
    description: "The Adele 1239 DK is a premium door handle with a modern design that combines functionality with contemporary aesthetics. Made from high-quality aluminum with a brushed finish, it's ideal for interior doors in modern homes and offices.",
    material: "Aluminum",
    finish: "Brushed",
    dimensions: {
      height: "59mm",
      width: "135mm",
      depth: "15mm"
    },
    weight: "320g",
    packageContents: ["1x Handle", "2x Connecting screws", "1x Allen key", "Installation guide"],
    installationOptions: ["Surface mounted", "No drilling required"],
    compatibility: ["Wooden doors", "Glass doors (with adapter)", "Interior doors"],
    colors: ["Silver", "Black", "Gold"],
    warranty: "5 years"
  },
  { 
    id: "2", 
    name: "Adele 1239 DRK", 
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", 
    category: "Modern",
    price: "72.90",
    currency: "€",
    sku: "ADELE1239DRK",
    description: "The Adele 1239 DRK is a sophisticated door handle designed for premium interiors. Its sleek profile and ergonomic grip provide both comfort and style. The reinforced mechanism ensures durability and smooth operation over years of use.",
    material: "Stainless Steel AISI 316",
    finish: "Polished",
    dimensions: {
      height: "62mm",
      width: "142mm",
      depth: "16mm"
    },
    weight: "370g",
    packageContents: ["1x Handle", "2x Connecting screws", "1x Allen key", "Installation guide"],
    installationOptions: ["Surface mounted", "Suitable for 35-45mm door thickness"],
    compatibility: ["Wooden doors", "Metal doors", "Interior and exterior doors"],
    colors: ["Silver", "Black", "Antique Bronze"],
    warranty: "10 years"
  },
  // Add the rest of the products from the catalog page with their details
  { id: "3", name: "Adele 1239/709", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
  { id: "4", name: "Adele 1239/709", image: "https://images.unsplash.com/photo-1573126617818-d3c8deac7022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Classic" },
  { id: "5", name: "Adele 1239/713", image: "https://images.unsplash.com/photo-1599360889420-da1afaba9edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Classic" },
  { id: "6", name: "Adele 1239/719H", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Modern" },
  { id: "7", name: "Adele 1220 DK", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Accessories" },
  { id: "8", name: "Adele 1220 DKR", image: "https://images.unsplash.com/photo-1630699144339-420f59b4747a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Accessories" },
  { id: "9", name: "Alabama 801", image: "https://images.unsplash.com/photo-1582741099331-93a18130274c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", category: "Extra Lock" },
];

// Related products recommendation function
const getRelatedProducts = (currentId: string, category: string) => {
  return productsDatabase
    .filter(product => product.id !== currentId && product.category === category)
    .slice(0, 4);
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  // Find the product with the matching ID
  const product = productsDatabase.find(p => p.id === id) || productsDatabase[0];
  
  // Get related products
  const relatedProducts = getRelatedProducts(product.id, product.category);
  
  // Check if product is in wishlist
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      quantity: quantity,
      image: product.image,
      description: product.description
    }));
    
    toast({
      title: t('cart.added'),
      description: `${quantity} × ${product.name} ${t('cart.addedDesc')}`,
    });
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: t('wishlist.itemRemoved'),
        description: `${product.name} ${t('wishlist.removedDesc')}`,
      });
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image,
        description: product.description
      }));
      toast({
        title: t('wishlist.itemAdded'),
        description: `${product.name} ${t('wishlist.addedDesc')}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/catalog" className="text-sm text-gray-500 flex items-center hover:text-gray-700">
              <ChevronLeft size={16} className="mr-1" />
              {t('product.backToCatalog')}
            </Link>
          </div>

          {/* Product Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-[#f8f8f8] p-4 flex items-center justify-center h-[500px]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Thumbnail gallery - would be populated with actual images in a real product */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-[#f8f8f8] h-20 cursor-pointer">
                    <img 
                      src={product.image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover opacity-80 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-light mb-2">{product.name}</h1>
              <div className="text-sm text-gray-500 mb-4">SKU: {product.sku || "PRODUCT-CODE"}</div>
              
              {product.price && (
                <div className="text-2xl font-medium mb-6">
                  {product.currency || "€"}{product.price}
                </div>
              )}
              
              <div className="prose prose-sm mb-6">
                <p>{product.description || "Elegant door hardware piece crafted with precision and designed for modern interiors. This product combines functionality with aesthetic appeal, providing a perfect blend of form and practicality."}</p>
              </div>

              {/* Color selection */}
              {product.colors && (
                <div className="mb-8">
                  <div className="text-sm font-medium mb-2">{t('product.availableColors')}</div>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <div 
                        key={index}
                        className={`
                          w-8 h-8 rounded-full border cursor-pointer
                          ${color === 'Silver' ? 'bg-gray-300' : 
                            color === 'Black' ? 'bg-gray-800' : 
                            color === 'Gold' ? 'bg-amber-500' : 
                            color === 'Antique Bronze' ? 'bg-amber-800' : 'bg-gray-200'}
                          ${index === 0 ? 'ring-2 ring-offset-2 ring-gray-300' : ''}
                        `}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mb-8">
                <div className="text-sm font-medium mb-2">{t('product.quantity')}</div>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {t('product.addToCart')}
                </Button>
                <Button 
                  variant={isInWishlist ? "default" : "outline"}
                  className={`flex-1 ${isInWishlist ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={toggleWishlist}
                >
                  <Heart size={18} className="mr-2" />
                  {isInWishlist ? t('product.removeFromWishlist') : t('product.addToWishlist')}
                </Button>
              </div>

              {/* Available options */}
              <div className="border-t border-gray-200 mt-8 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">{t('product.material')}</div>
                    <div className="text-sm text-gray-600">{product.material || "Aluminum/Stainless Steel"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t('product.finish')}</div>
                    <div className="text-sm text-gray-600">{product.finish || "Brushed/Polished"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t('product.warranty')}</div>
                    <div className="text-sm text-gray-600">{product.warranty || "5 years"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t('product.availability')}</div>
                    <div className="text-sm text-green-600">{t('product.inStock')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full justify-start mb-6 border-b border-gray-200 pb-0">
                <TabsTrigger value="specifications" className="text-sm">Specifications</TabsTrigger>
                <TabsTrigger value="dimensions" className="text-sm">Dimensions</TabsTrigger>
                <TabsTrigger value="installation" className="text-sm">Installation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="pt-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium w-1/3">Product Code</TableCell>
                      <TableCell>{product.sku || "PRODUCT-CODE"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Material</TableCell>
                      <TableCell>{product.material || "Aluminum/Stainless Steel"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Finish</TableCell>
                      <TableCell>{product.finish || "Brushed/Polished"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Usage</TableCell>
                      <TableCell>Interior Doors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Weight</TableCell>
                      <TableCell>{product.weight || "320g"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Warranty</TableCell>
                      <TableCell>{product.warranty || "5 years"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Package Contents</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {(product.packageContents || ["1x Handle", "2x Connecting screws", "1x Allen key", "Installation guide"]).map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="dimensions" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1585420077638-02df307d4d5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                      alt="Product dimensions" 
                      className="mx-auto max-h-[350px]"
                    />
                  </div>
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dimension</TableHead>
                          <TableHead>Measurement</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Height</TableCell>
                          <TableCell>{product.dimensions?.height || "59mm"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Width</TableCell>
                          <TableCell>{product.dimensions?.width || "135mm"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Depth</TableCell>
                          <TableCell>{product.dimensions?.depth || "15mm"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Recommended Door Thickness</TableCell>
                          <TableCell>35-45mm</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="installation" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Installation Requirements</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      {(product.installationOptions || ["Surface mounted", "No drilling required"]).map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                      <li>Standard door preparation</li>
                      <li>Allen key (included in package)</li>
                      <li>Screwdriver (not included)</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6 mb-4">Compatible With</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      {(product.compatibility || ["Wooden doors", "Glass doors (with adapter)", "Interior doors"]).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Installation Guide</h3>
                    <ol className="space-y-4 list-decimal list-inside text-gray-700">
                      <li>Ensure the door is properly prepared with standard bore holes</li>
                      <li>Insert the handle mechanism through the door</li>
                      <li>Align the opposite handle and secure with the connecting screws</li>
                      <li>Tighten the screws using the provided Allen key</li>
                      <li>Test the handle operation to ensure smooth function</li>
                    </ol>
                    <div className="mt-6">
                      <Button variant="outline" className="text-sm">
                        Download Installation Manual
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-light mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group">
                  <div className="aspect-square bg-[#f8f8f8] mb-3 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
