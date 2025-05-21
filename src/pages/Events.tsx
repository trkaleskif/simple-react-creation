
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample events data
const events = [
  {
    id: "big5-saudi-2025",
    title: "BIG5 Saudi 2025: event report.",
    date: "15/03/2025",
    category: "EVENTS",
    excerpt: "We have just returned from Riyadh, where the 13th edition of Big 5 Construct Saudi, the largest construction exhibition in the Kingdom and in the entire Middle East region, took place.",
    image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "bau-2025",
    title: "BAU 2025: How did it go?",
    date: "21/01/2025",
    category: "EVENTS",
    excerpt: "BAU 2025, the world's leading trade fair for architecture, materials, and systems, was a tremendous success for Fimet.",
    image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "milan-design-week",
    title: "Milan Design Week highlights for the year",
    date: "10/12/2024",
    category: "EVENTS",
    excerpt: "The Milan Design Week concluded with extraordinary success for our new product line. Visitors from around the world appreciated our innovative solutions.",
    image: "https://images.unsplash.com/photo-1595844730298-b3c39292a3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "icff-2023",
    title: "ICFF 2023: what caught our attention",
    date: "05/10/2024",
    category: "EVENTS",
    excerpt: "The International Contemporary Furniture Fair (ICFF) in New York showcased the latest innovations in furniture design and accessories.",
    image: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">Events</h1>
            <p className="text-gray-600 max-w-2xl">
              Stay updated with our latest news, events, and participation in global design and architecture exhibitions.
            </p>
          </div>
          
          {/* Featured Event */}
          <div className="mb-16">
            <Link to={`/event/${events[0].id}`} className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 shadow-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={events[0].image} 
                    alt={events[0].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 mb-2">{events[0].date} / {events[0].category}</p>
                  <h2 className="text-3xl font-light mb-4 group-hover:text-charcoal transition-colors">
                    {events[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">{events[0].excerpt}</p>
                  <div className="flex items-center mt-auto">
                    <ArrowRight size={16} className="mr-2" />
                    <span className="fancy-hover-effect">Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.slice(1).map((event) => (
              <Link 
                to={`/event/${event.id}`} 
                key={event.id}
                className="bg-white p-6 shadow-sm group"
              >
                <div className="aspect-video overflow-hidden mb-4">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{event.date} / {event.category}</p>
                <h3 className="text-xl font-light mb-4 group-hover:text-charcoal transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center mt-2">
                  <ArrowRight size={16} className="mr-2" />
                  <span className="fancy-hover-effect">Read more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
