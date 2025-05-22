
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast({
        title: "Email is required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!newsletterConsent) {
      toast({
        title: "Consent is required",
        description: "Please accept the privacy policy",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter."
    });
    
    setNewsletterEmail("");
    setNewsletterConsent(false);
  };

  return (
    <section className="py-12 md:py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Contact Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-4 md:mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">Contact us</h2>
            <p className="text-gray-400 mb-6 md:mb-8">
              For more information or to define your project together.
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center py-2 px-4 border border-white hover:bg-white hover:text-black transition-colors"
            >
              <ArrowRight size={16} className="mr-2" />
              Contact us for more information
            </Link>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mb-2">SIGN UP FOR NEWSLETTER</p>
            <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">
              A look<br />
              at the world of Fimet
            </h2>
            <p className="text-gray-400 mb-6 md:mb-8 max-w-md">
              Periodic updates on products, innovations, new collections and major
              industry events.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md">
              <div className="flex flex-col md:flex-row mb-4">
                <Input
                  type="email"
                  placeholder="Your e-mail address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent border border-gray-600 rounded-none mb-3 md:mb-0 md:mr-3"
                />
                <Button 
                  type="submit" 
                  className="bg-transparent border border-white hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                >
                  SIGN UP <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter-consent" 
                  checked={newsletterConsent}
                  onCheckedChange={(checked) => {
                    setNewsletterConsent(checked === true);
                  }}
                />
                <label htmlFor="newsletter-consent" className="text-xs md:text-sm font-light">
                  I consent to the processing of data as per the <a href="#" className="underline">Privacy Policy</a>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
