
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Step indicator component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-light">
          SHOPPING CART → CHECKOUT → ORDER COMPLETE
        </h1>
      </div>
      <div className="relative pb-8">
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-1 bg-green-600"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="absolute top-2 left-0 w-full text-center">
          <p className="text-sm font-medium">STEP {currentStep} OF 4</p>
        </div>
      </div>
    </div>
  );
};

// Checkout validation schemas
const contactFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  createAccount: Yup.boolean(),
});

const shippingFormSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  company: Yup.string(),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  apartment: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("ZIP/Postal code is required"),
});

const billingFormSchema = Yup.object({
  sameAsShipping: Yup.boolean(),
  phone: Yup.string().required("Phone number is required"),
});

const paymentFormSchema = Yup.object({
  paymentMethod: Yup.string().required("Please select a payment method"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  newsletter: Yup.boolean(),
});

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({ email: "", createAccount: false });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    phone: "",
  });

  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // We could calculate this based on user location, product weight, etc.
  const total = subtotal + shipping;

  // Handle step navigation
  const handleNextStep = (values: any) => {
    switch (currentStep) {
      case 1:
        setContactInfo(values);
        break;
      case 2:
        setShippingInfo(values);
        break;
      case 3:
        setBillingInfo(values);
        break;
      case 4:
        // Submit the order
        console.log("Order submitted", {
          contactInfo,
          shippingInfo,
          billingInfo,
          paymentInfo: values,
          items,
          total,
        });
        navigate("/order-complete");
        return;
    }
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <StepIndicator currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="border p-6">
                  <h2 className="text-xl font-medium mb-6">MY CONTACT</h2>
                  <Formik
                    initialValues={contactInfo}
                    validationSchema={contactFormSchema}
                    onSubmit={handleNextStep}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div className="bg-gray-100 p-4 text-center">
                          <p>Already have an account? <a href="/signin" className="underline">Log in</a></p>
                          <p className="text-sm text-gray-500 mt-2">Or continue as a guest</p>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email address <span className="text-red-500">*</span>
                          </label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            className="w-full border p-2"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Order number and receipt will be sent to this email address.
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Field
                            id="createAccount"
                            name="createAccount"
                            type="checkbox"
                            className="rounded"
                          />
                          <label htmlFor="createAccount" className="text-sm">
                            Create an account (optional)
                          </label>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          PROCEED TO SHIPPING
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {currentStep === 2 && (
                <div className="border p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">MY CONTACT</h2>
                      <p className="text-sm text-gray-500">{contactInfo.email}</p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-medium mb-6">SHIPPING TO</h2>
                  
                  <Formik
                    initialValues={shippingInfo}
                    validationSchema={shippingFormSchema}
                    onSubmit={handleNextStep}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                              First name <span className="text-red-500">*</span>
                            </label>
                            <Field
                              id="firstName"
                              name="firstName"
                              className="w-full border p-2"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                              Last name <span className="text-red-500">*</span>
                            </label>
                            <Field
                              id="lastName"
                              name="lastName"
                              className="w-full border p-2"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-1">
                            Company name (optional)
                          </label>
                          <Field
                            id="company"
                            name="company"
                            className="w-full border p-2"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-1">
                            Country / Region <span className="text-red-500">*</span>
                          </label>
                          <Field
                            as="select"
                            id="country"
                            name="country"
                            className="w-full border p-2"
                          >
                            <option value="">Select a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </Field>
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-1">
                            Street address <span className="text-red-500">*</span>
                          </label>
                          <Field
                            id="address"
                            name="address"
                            className="w-full border p-2"
                            placeholder="House number and street name"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="apartment" className="block text-sm font-medium mb-1">
                            Apartment, suite, unit, etc. (optional)
                          </label>
                          <Field
                            id="apartment"
                            name="apartment"
                            className="w-full border p-2"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-1">
                              Town / City <span className="text-red-500">*</span>
                            </label>
                            <Field
                              id="city"
                              name="city"
                              className="w-full border p-2"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium mb-1">
                              State / County <span className="text-red-500">*</span>
                            </label>
                            <Field
                              id="state"
                              name="state"
                              className="w-full border p-2"
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium mb-1">
                            Postcode / ZIP <span className="text-red-500">*</span>
                          </label>
                          <Field
                            id="zip"
                            name="zip"
                            className="w-full border p-2"
                          />
                          <ErrorMessage
                            name="zip"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <h2 className="text-xl font-medium mt-8 mb-4">SHIPPING METHOD</h2>
                        <div className="bg-gray-100 p-4 mb-4">
                          <p>Shipping options will be selected in the next step</p>
                        </div>
                        
                        <div>
                          <h2 className="text-xl font-medium mb-4">ADDITIONAL NOTES</h2>
                          <Field
                            as="textarea"
                            name="notes"
                            placeholder="Add order notes (optional)"
                            className="w-full border p-2 h-24"
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          PROCEED TO BILLING
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {currentStep === 3 && (
                <div className="border p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">MY CONTACT</h2>
                      <p className="text-sm text-gray-500">{contactInfo.email}</p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">SHIPPING TO</h2>
                      <p className="text-sm text-gray-500">
                        {shippingInfo.firstName} {shippingInfo.lastName}, {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}, {shippingInfo.country}
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">SHIPPING METHOD</h2>
                      <p className="text-sm text-gray-500">
                        Standard shipping
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-medium mb-6">BILLING TO</h2>
                  
                  <Formik
                    initialValues={billingInfo}
                    validationSchema={billingFormSchema}
                    onSubmit={handleNextStep}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Field
                            id="sameAsShipping"
                            name="sameAsShipping"
                            type="checkbox"
                            className="rounded"
                          />
                          <label htmlFor="sameAsShipping" className="text-sm">
                            Same as shipping address
                          </label>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <Field
                            id="phone"
                            name="phone"
                            className="w-full border p-2"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          PROCEED TO PAYMENT
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {currentStep === 4 && (
                <div className="border p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">MY CONTACT</h2>
                      <p className="text-sm text-gray-500">{contactInfo.email}</p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">SHIPPING TO</h2>
                      <p className="text-sm text-gray-500">
                        {shippingInfo.firstName} {shippingInfo.lastName}, {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}, {shippingInfo.country}
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">SHIPPING METHOD</h2>
                      <p className="text-sm text-gray-500">
                        Standard shipping
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <Check className="text-green-600" size={20} />
                    <div>
                      <h2 className="text-xl font-medium">BILLING TO</h2>
                      <p className="text-sm text-gray-500">
                        {billingInfo.sameAsShipping
                          ? `Same as shipping address`
                          : `Custom billing address`}
                        <br />
                        Phone: {billingInfo.phone}
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="ml-auto text-sm text-gray-500 hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  
                  <Formik
                    initialValues={{
                      paymentMethod: "credit",
                      acceptTerms: false,
                      newsletter: false,
                    }}
                    validationSchema={paymentFormSchema}
                    onSubmit={handleNextStep}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div>
                          <h2 className="text-xl font-medium mb-4">PAYMENT METHOD</h2>
                          
                          <div className="border p-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Field
                                id="creditCard"
                                name="paymentMethod"
                                type="radio"
                                value="credit"
                              />
                              <label htmlFor="creditCard" className="font-medium">
                                Credit card
                              </label>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 ml-6">
                              Pay with credit card on the next screen.
                            </p>
                          </div>
                          
                          <ErrorMessage
                            name="paymentMethod"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <h2 className="text-lg font-medium mb-2">Add coupon code</h2>
                          <div className="flex">
                            <Input placeholder="Coupon code" className="rounded-r-none" />
                            <Button variant="outline" className="rounded-l-none">Apply</Button>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex items-start space-x-2">
                            <Field
                              id="acceptTerms"
                              name="acceptTerms"
                              type="checkbox"
                              className="mt-1"
                            />
                            <label htmlFor="acceptTerms" className="text-sm">
                              I have read and agree to the website <a href="/terms" className="underline">terms and conditions</a>
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <Field
                              id="newsletter"
                              name="newsletter"
                              type="checkbox"
                              className="rounded"
                            />
                            <label htmlFor="newsletter" className="text-sm">
                              Subscribe to our newsletter
                            </label>
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          PLACE ORDER
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">ORDER SUMMARY</h2>
                  <a href="/cart" className="text-sm text-gray-500 hover:text-black">
                    Edit cart
                  </a>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="flex py-4 border-t">
                    <div className="relative mr-4">
                      <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${Number(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Number(subtotal).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        "Calculate shipping"
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>TOTAL</span>
                    <span>${Number(total).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium uppercase mb-2">SHOP MENU</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/catalog" className="text-sm hover:underline">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="/catalog/furniture" className="text-sm hover:underline">
                        Furniture
                      </a>
                    </li>
                    <li>
                      <a href="/catalog/accessories" className="text-sm hover:underline">
                        Accessories
                      </a>
                    </li>
                    <li>
                      <a href="/catalog/lighting" className="text-sm hover:underline">
                        Lighting
                      </a>
                    </li>
                  </ul>
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
