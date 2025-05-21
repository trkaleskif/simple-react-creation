
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsSection = () => {
  const news = [
    {
      id: "big5-saudi-2025",
      title: "Milan Design Week highlights for the year",
      image: "https://images.unsplash.com/photo-1595844730298-b3c39292a3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "EVENTS"
    },
    {
      id: "bau-2025",
      title: "ICFF 2023: what caught our attention",
      image: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "EVENTS"
    }
  ];

  const recentNews = [
    { id: "new-matte-finish", title: "New MATTE finish available for all handles" },
    { id: "milan-exhibition", title: "New exhibition in our Milan showroom" },
    { id: "paris-meeting", title: "Meet our design team in Paris next month" }
  ];

  return (
    <section id="news" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-light">News, events and new products</h2>
          <Link to="/events" className="inline-flex items-center space-x-2 mt-4 md:mt-0">
            <span>View all news</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <div key={index} className="group">
                <div className="aspect-video overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.category}</span>
                <h3 className="text-xl font-light hover:text-charcoal transition-colors">
                  <Link to={`/event/${item.id}`}>{item.title}</Link>
                </h3>
                <Link to={`/event/${item.id}`} className="text-sm fancy-hover-effect inline-block mt-2">Read more</Link>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-xl font-light mb-6">Recent highlights</h3>
            <div className="flex flex-col space-y-6">
              {recentNews.map((item, index) => (
                <div key={index} className="border-t border-gray-300 pt-6">
                  <Link to={`/event/${item.id}`} className="group">
                    <h4 className="text-lg font-light group-hover:text-charcoal transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <ArrowRight size={14} />
                      <span className="text-sm fancy-hover-effect">Read more</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
