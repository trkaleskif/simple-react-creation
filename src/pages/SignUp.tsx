
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name is too short")
    .required("Last name is required"),
  company: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  privacyConsent: Yup.boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required("Privacy consent is required"),
});

const SignUp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Account created!",
        description: "Welcome to Fimet.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-lg">
            <div className="mb-10 text-center">
              <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
                Create an Account
              </h1>
              <p className="text-gray-500">
                Join Fimet to access exclusive content and features
              </p>
            </div>
            
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                company: "",
                email: "",
                password: "",
                confirmPassword: "",
                privacyConsent: false,
              }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        className={`w-full border ${
                          errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded px-4 py-2`}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Field
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        className={`w-full border ${
                          errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded px-4 py-2`}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <Field
                      id="company"
                      name="company"
                      placeholder="Company name"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      } rounded px-4 py-2`}
                      disabled={isLoading}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create password"
                        className={`w-full border ${
                          errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                        } rounded px-4 py-2`}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className={`w-full border ${
                          errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded px-4 py-2`}
                        disabled={isLoading}
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3">
                    <Field
                      id="privacyConsent"
                      name="privacyConsent"
                      type="checkbox"
                      className="mt-1"
                      disabled={isLoading}
                    />
                    <div className="space-y-1">
                      <label htmlFor="privacyConsent" className="text-sm font-normal">
                        I consent to the processing of data as per the <a href="#" className="underline">Privacy Policy</a>
                      </label>
                      <ErrorMessage name="privacyConsent" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-ebony text-white hover:bg-black"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Creating account..."
                    ) : (
                      <>
                        Create Account <UserPlus className="ml-2" size={16} />
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center mt-6">
                    <p className="text-gray-500">
                      Already have an account?{" "}
                      <Link to="/signin" className="text-black hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
