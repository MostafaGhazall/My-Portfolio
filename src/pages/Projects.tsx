import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink } from "react-icons/fi";

interface Project {
  title: string;
  link: string;
  image?: string;
  tools: string[];
}

const projectList: Project[] = [
  {
    title: "Marketing Agency 2",
    link: "https://marketing-agency-2-mostafa-ghazals-projects.vercel.app/",
    image: "/projects/marketing-agency-2.jpg",
    tools: ["React.js", "Typescript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Marketing Agency",
    link: "https://marketing-agency-98pk-mostafa-ghazals-projects.vercel.app/",
    image: "/projects/marketing-agency.jpg",
    tools: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Green-Co Website",
    link: "https://green-co-git-main-mostafa-ghazals-projects.vercel.app/",
    image: "/projects/green.jpg",
    tools: ["React.js", "Tailwind CSS", "TypeScript", "Zustand"],
  },
  {
    title: "E-Commerce Platform",
    link: "https://e-commerce-website-mostafa-ghazals-projects.vercel.app/",
    image: "/projects/ecommerce.jpg",
    tools: ["React.js", "Tailwind CSS", "TypeScript", "Zustand"],
  },
];

const Projects: React.FC = () => {
  // Observe the title animation and trigger it only once
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="projects" className="min-h-screen px-4 py-16 bg-gradient-to-t from-gray-300 via-gray-100 to-gray-50">
      {/* Title Section */}
      <div ref={titleRef} className="text-center mb-12">
        {/* Animated title */}
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {"Projects".split("").map((char, index) => (
            <motion.span
              key={index}
              className="
                text-5xl font-bold leading-[1.4]
                bg-gradient-to-t from-cyan-500 to-slate-950
                bg-clip-text text-transparent
              "
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: [20, -10, 0],
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <p className="text-lg text-gray-600 mt-5">
          Here are some of the projects I have worked on, showcasing my skills
          in modern web development technologies.
        </p>
      </div>

      {/* Project Grid with Floating Animation */}
      <div className="max-w-7xl mx-auto animate-[float_4s_infinite]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectList.map((project, idx) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

            return (
              <motion.div
                key={idx}
                ref={ref}
                className="relative group rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                {/* Image Section */}
                <div className="w-full h-[300px]">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Hover Overlay */}
                <div
                  className="
                    absolute bottom-0 left-0 w-full h-full
                    bg-gradient-to-t from-slate-900 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    flex flex-col justify-end p-4
                  "
                >
                  <ul className="flex flex-wrap gap-3 text-left mb-4">
                    {project.tools.map((tool, toolIdx) => (
                      <li
                        key={toolIdx}
                        className="bg-slate-600 px-3 py-1 rounded-full text-sm text-cyan-400"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-500 transition flex items-center"
                  >
                    <FiExternalLink className="mr-2" />
                    Visit
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
