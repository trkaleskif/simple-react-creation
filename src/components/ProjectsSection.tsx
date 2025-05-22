
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      title: "Projects",
      description: "Discover our collaborations with architects and designers",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "INOX",
      description: "Quality stainless steel hardware for modern architecture",
      image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <section id="projects" className="py-12 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative h-[40vh] md:h-[50vh] overflow-hidden bg-cream"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 sm:p-6 md:p-8 transition-all duration-300 group-hover:bg-opacity-30">
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-1 md:mb-2">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
