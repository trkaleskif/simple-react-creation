import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Check } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/redux/hooks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define validation schema
const CheckoutSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  cardName: Yup.string().required("Name on card is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Access cart items from Redux store
  const { items: cartItems } = useAppSelector(state => state.cart);
  
  // Calculate values
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Order placed:', values);
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      navigate('/order-complete');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-light tracking-tight mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  address: "",
                  apartment: "",
                  city: "",
                  postalCode: "",
                  country: "",
                  cardName: "",
                  cardNumber: "",
                  expDate: "",
                  cvv: "",
                }}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-8">
                    <div className="bg-white rounded-md p-6 border">
                      <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Field
                            as={Input}
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            className={errors.firstName && touched.firstName ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Field
                            as={Input}
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            className={errors.lastName && touched.lastName ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className={errors.email && touched.email ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Field
                            as={Input}
                            id="address"
                            name="address"
                            placeholder="123 Main St"
                            className={errors.address && touched.address ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                          <Field
                            as={Input}
                            id="apartment"
                            name="apartment"
                            placeholder="Apartment 1A"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Field
                            as={Input}
                            id="city"
                            name="city"
                            placeholder="City"
                            className={errors.city && touched.city ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Field
                            as={Input}
                            id="postalCode"
                            name="postalCode"
                            placeholder="Postal code"
                            className={errors.postalCode && touched.postalCode ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="country">Country</Label>
                          <Field
                            as="select"
                            id="country"
                            name="country"
                            className={`w-full h-10 border rounded-md px-3 py-2 ${
                              errors.country && touched.country ? "border-red-500" : "border-input"
                            }`}
                          >
                            <option value="">Select a country</option>
                            <option value="IT">Italy</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                            <option value="ES">Spain</option>
                            <option value="UK">United Kingdom</option>
                          </Field>
                          <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-md p-6 border">
                      <h2 className="text-lg font-medium mb-4">Payment Information</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Field
                            as={Input}
                            id="cardName"
                            name="cardName"
                            placeholder="Name as it appears on card"
                            className={errors.cardName && touched.cardName ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="cardName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Field
                            as={Input}
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className={errors.cardNumber && touched.cardNumber ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expDate">Expiry Date</Label>
                            <Field
                              as={Input}
                              id="expDate"
                              name="expDate"
                              placeholder="MM/YY"
                              className={errors.expDate && touched.expDate ? "border-red-500" : ""}
                            />
                            <ErrorMessage name="expDate" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Field
                              as={Input}
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              className={errors.cvv && touched.cvv ? "border-red-500" : ""}
                            />
                            <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        type="submit"
                        className="w-full md:w-auto bg-black text-white hover:bg-gray-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Processing..."
                        ) : (
                          <>
                            Complete Order <Check className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            
            <div className="w-full lg:w-96">
              <div className="bg-gray-50 rounded-md p-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
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
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-xl">€{total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
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

export default Checkout;
