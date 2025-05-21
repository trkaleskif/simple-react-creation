
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Sample event data - in a real app, this would come from an API
const eventData = {
  "big5-saudi-2025": {
    id: "big5-saudi-2025",
    title: "BIG5 Saudi 2025: event report.",
    date: "15/03/2025",
    category: "NEWS / EVENTS",
    content: `
      <p>We have just returned from Riyadh, where the 13th edition of Big 5 Construct Saudi, the largest construction exhibition in the Kingdom and in the entire Middle East region, took place.This year it adopted an innovative format over two weeks: February 15-18 and February 24-27, 2025 (we were present in the second one), at the Riyadh Front Exhibition & Conference Center.</p>
      <p>The event recorded extraordinary numbers, with more than <strong>75,000 visitors</strong> and more than <strong>2,000 exhibitors</strong> from over 60 countries, confirming it as a strategic platform for the construction industry in the Middle East.</p>
      <p>Once again, we at FIMET presented <strong>SECRET</strong> (find out more <a href="#" className="underline">here</a>), our new and innovative locking systems, and again the response from the public proved to be very positive, with many industry professionals showing interest in our cutting-edge solutions.</p>
      <p>The second week of the fair, in particular, focused on finishes and services that transform buildings into functional and aesthetic spaces. Topics such as sustainability, energy efficiency, and urban design were the focus of numerous conferences and workshops, offering interesting insights into the future of construction in Saudi Arabia, a country with a very important design vibrancy in recent years.</p>
      <p>Big 5 Construct Saudi proved to be a unique opportunity to connect with decision makers, architects and developers involved in the country's major projects in line with <strong>Vision 2030</strong>. We are proud to have contributed with our innovative solutions and to have strengthened the presence of Made in Italy in a rapidly expanding market.</p>
      <p>We thank everyone who visited our booth and shared this experience with us. For more information about our news, please follow us on our official channels.</p>
    `,
    image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  "bau-2025": {
    id: "bau-2025",
    title: "BAU 2025: How did it go?",
    date: "21/01/2025",
    category: "NEWS / EVENTS",
    content: `
      <p>BAU 2025, the world's leading trade fair for architecture, materials, and systems, was a tremendous success for Fimet. We showcased our latest innovations in door and window hardware systems to an enthusiastic audience of architects, designers, and industry professionals.</p>
      <p>Our booth featured live demonstrations of our new SECRET locking system, which garnered significant attention from visitors. The integration of smart technology with elegant design proved to be a winning combination.</p>
      <p>We had the pleasure of connecting with partners from over 40 countries and discussing exciting upcoming projects. The event provided valuable insights into emerging trends in sustainable building practices and innovative materials.</p>
      <p>We're grateful to everyone who visited our booth and contributed to making this event a success. We look forward to implementing the new connections and ideas generated at BAU 2025.</p>
    `,
    image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
};

const EventDetails = () => {
  const { eventId } = useParams();
  const event = eventData[eventId as keyof typeof eventData];
  
  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl font-light">Event not found</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Event Header */}
          <div className="mb-8">
            <p className="text-sm text-gray-500">{event.date}</p>
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">{event.category}</p>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">{event.title}</h1>
          </div>
          
          {/* Event Content */}
          <div className="mb-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </div>
          
          {/* Event Image */}
          <div className="mb-16">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* More Events Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-light">FROM THE SAME CATEGORY</h3>
              <Link 
                to="/events" 
                className="inline-flex items-center space-x-2 text-sm hover:text-charcoal"
              >
                <span>ALL THE NEWS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.values(eventData)
                .filter(e => e.id !== eventId)
                .slice(0, 2)
                .map((relatedEvent) => (
                  <Link 
                    to={`/event/${relatedEvent.id}`} 
                    key={relatedEvent.id}
                    className="group"
                  >
                    <div className="aspect-video overflow-hidden mb-4">
                      <img 
                        src={relatedEvent.image} 
                        alt={relatedEvent.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-gray-500">{relatedEvent.date} / EVENTS</p>
                    <h3 className="text-xl font-light group-hover:text-charcoal transition-colors">
                      {relatedEvent.title}
                    </h3>
                    <div className="flex items-center mt-2 text-sm">
                      <ArrowRight size={16} className="mr-2" />
                      <span className="fancy-hover-effect">Read more</span>
                    </div>
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

export default EventDetails;
