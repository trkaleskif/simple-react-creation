
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, clearError } from "@/redux/features/auth/authSlice";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  async function onSubmit(data: SignInFormValues) {
    try {
      await dispatch(login(data)).unwrap();
      toast({
        title: "Sign in successful!",
        description: "Welcome back to Fimet.",
      });
      form.reset();
    } catch (error) {
      // Error is handled in the Redux slice
    }
  }

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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          type="email"
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password" 
                          type="password" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
              </form>
            </Form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
