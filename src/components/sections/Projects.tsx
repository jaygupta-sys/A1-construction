import React, { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";
import { Lightbox } from "@/components/ui/Lightbox";
import { Eye } from "lucide-react";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Residential", "Luxury", "Structural", "Custom"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  const handleOpen = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIdx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = (currentIdx - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIdx]);
  };

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIdx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (currentIdx + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIdx]);
  };

  return (
    <section
      id="projects"
      className="relative bg-navy-950 text-ivory-100 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gold-500/20">
          <div>
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-2">
              04 / PORTFOLIO ARCHIVE
            </span>
            <h2 className="headline-section font-serif font-bold text-ivory-100">
              Architectural <span className="italic font-normal text-gold-400">Showcase.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? "bg-gold-500 text-navy-950 font-semibold"
                    : "border border-gold-500/30 text-ivory-200/80 hover:border-gold-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical column spans: alternating wide (7 cols) and narrow (5 cols)
            const colSpan = idx % 3 === 0 ? "md:col-span-7" : idx % 3 === 1 ? "md:col-span-5" : "md:col-span-12";
            const aspect = idx % 3 === 2 ? "aspect-[21/9]" : "aspect-[16/11]";

            return (
              <div
                key={project.id}
                onClick={() => handleOpen(project)}
                className={`${colSpan} group cursor-pointer relative overflow-hidden rounded-sm border border-gold-500/20 bg-navy-900 shadow-luxury transition-all duration-500 hover:border-gold-500/60`}
              >
                {/* Image Container with Hover Scale */}
                <div className={`relative w-full ${aspect} overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Sample Image Badge (Honest Transparency) */}
                  <div className="absolute top-4 left-4 z-10 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-sm border border-gold-500/25">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                      {project.tag}
                    </span>
                  </div>

                  {/* Hover "VIEW" Circular Floating Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-gold-500 text-navy-950 flex flex-col items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300 font-mono text-[10px] font-bold tracking-widest">
                      <Eye className="w-4 h-4 mb-0.5" />
                      <span>VIEW</span>
                    </div>
                  </div>

                  {/* Caption Bar (Bottom) */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-gold-500 font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-ivory-100 group-hover:text-gold-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-ivory-200/70 mt-1 max-w-lg font-light line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Real Photos */}
        <p className="text-center text-xs font-mono text-ivory-200/50 mt-12 tracking-wider">
          * Images displayed above are architectural sample visualizations representing construction typologies.
        </p>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!selectedProject}
        onClose={handleClose}
        project={selectedProject}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
