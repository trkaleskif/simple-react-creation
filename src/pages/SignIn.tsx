
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowRight, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, clearError } from "@/redux/features/auth/authSlice";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);

  // Show error toast if there's an error from Redux
  if (error) {
    toast({
      title: "Sign in failed",
      description: error,
      variant: "destructive"
    });
    dispatch(clearError());
  }

  // Redirect if authenticated
  if (isAuthenticated) {
    navigate('/');
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast({
        title: "Sign in successful!",
        description: "Welcome back to Fimet.",
      });
    } catch (error) {
      // Error is handled in the Redux slice
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-md">
            <div className="mb-10 text-center">
              <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
                Sign In
              </h1>
              <p className="text-gray-500">
                Welcome back, sign in to your account
              </p>
            </div>
            
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
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
                      } rounded px-4 py-2 text-base`}
                      disabled={isLoading}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`w-full border ${
                        errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                      } rounded px-4 py-2 text-base`}
                      disabled={isLoading}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to="#" className="text-sm text-gray-500 hover:text-gray-800">
                      Forgot your password?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-ebony text-white hover:bg-black"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign In <LogIn className="ml-2" size={16} />
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center mt-6">
                    <p className="text-gray-500">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-black hover:underline">
                        Sign up
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

export default SignIn;
