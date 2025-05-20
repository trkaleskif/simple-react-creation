
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-ebony text-white">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light mb-4">Contact us</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          For sales, information or collaboration proposals, please get in touch.
        </p>
      </div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[50vh] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Person holding a door handle" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col items-start">
            <h3 className="text-2xl md:text-3xl font-light mb-8">
              A look<br />at the world of Fimet
            </h3>
            <p className="text-gray-400 mb-12">
              For each architecture project, a solution. Discover how we can help make your vision come to life.
            </p>
            <form className="w-full max-w-md">
              <div className="mb-6">
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="w-full py-3 px-4 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full py-3 px-4 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <textarea 
                  placeholder="Your message" 
                  rows={3}
                  className="w-full py-3 px-4 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 border border-white hover:bg-white hover:text-ebony transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
