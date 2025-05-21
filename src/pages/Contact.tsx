
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  company: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  requestType: z.string().min(1, { message: "Please select a request type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy"
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      requestType: "Information request",
      message: "",
      privacyConsent: false,
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    
    console.log("Newsletter signup:", newsletterEmail);
    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter.",
    });
    
    setNewsletterEmail("");
    setNewsletterConsent(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24">
        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-12">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">CONTACT US</p>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
                For more information<br />
                or to define your project together
              </h1>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Name*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="E-mail address*" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500">Request*</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full border-b border-gray-300 py-3 px-4 bg-transparent focus:outline-none"
                          {...field}
                        >
                          <option value="Information request">Information request</option>
                          <option value="Project collaboration">Project collaboration</option>
                          <option value="Technical support">Technical support</option>
                          <option value="Other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Message*" 
                          className="min-h-[120px] border-b rounded-none border-gray-300 focus:border-gray-800 transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I consent to the processing of data as per the <a href="#" className="underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-ebony text-white hover:bg-black w-24 float-right"
                >
                  SEND <ArrowRight className="ml-2" size={16} />
                </Button>
              </form>
            </Form>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">SIGN UP FOR NEWSLETTER</p>
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  A look<br />
                  at the world of Fimet
                </h2>
                <p className="text-gray-400 max-w-lg">
                  Periodic updates on products, innovations, new collections and major industry events.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col md:flex-row max-w-lg">
                  <div className="flex-grow md:mr-2 mb-4 md:mb-0">
                    <Input
                      type="email"
                      placeholder="Your e-mail address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-transparent border-b border-gray-600 rounded-none focus:border-white"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-transparent border border-white hover:bg-white hover:text-gray-800"
                  >
                    SIGN UP <ArrowRight className="ml-2" size={16} />
                  </Button>
                </form>
                
                <div className="mt-4 flex items-start space-x-2">
                  <Checkbox
                    id="newsletter-consent" 
                    checked={newsletterConsent}
                    onCheckedChange={(checked) => {
                      setNewsletterConsent(checked === true);
                    }}
                  />
                  <label htmlFor="newsletter-consent" className="text-sm font-light">
                    I consent to the processing of data as per the <a href="#" className="underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-end">
                <div className="relative w-full max-w-md h-80">
                  <img 
                    src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Hand holding a door handle" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
