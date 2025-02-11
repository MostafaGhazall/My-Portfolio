import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillIcons = [
  { name: "HTML5", src: "/logos/html.png" },
  { name: "CSS3", src: "/logos/css.png" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "Tailwind CSS", src: "/logos/Tailwind.png" },
  { name: "NPM", src: "/logos/npm.svg" },
  { name: "Figma", src: "/logos/figma.png" },
  { name: "React", src: "/logos/React.png" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "Zustand", src: "/logos/zustand.svg" },
  { name: "Git", src: "/logos/git.png" },
  { name: "GitHub", src: "/logos/github.png" },
  { name: "Photoshop", src: "/logos/photoshop.png" },
];

const Skills: React.FC = () => {
  // Observe the section
  const { ref, inView } = useInView({
    triggerOnce: true, // Replay animations on reveal
    threshold: 0.2, // Trigger animations when 20% of the section is visible
  });

  // Title Animation Variants
  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: [50, -10, 0], // Wave bounce
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        delay: i * 0.1, // Stagger each character
      },
    }),
  };

  // Icon Animation Variants
  const iconVariants = {
    hidden: { scale: 0.8, y: 50, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.1,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[radial-gradient(circle_at_50%_50%,_#01173d_0%,_#000_90%)]
      "
    >
      <div className="max-w-5xl w-full px-4 py-16 text-center">
        {/* Wave Animation for Title */}
        <motion.div
          className="flex justify-center mb-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {Array.from("SKILLS").map((char, index) => (
            <motion.span
              key={index}
              className="text-5xl font-bold bg-gradient-to-r from-fuchsia-700 to-purple-700 bg-clip-text text-transparent"
              custom={index}
              variants={titleVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subheading */}
        <p className="text-xl mb-8 text-white pb-10">
          The skills, tools and technologies I use:
        </p>

        {/* Icons Grid */}
        <motion.ul
          className="
            grid
            grid-cols-3
            sm:grid-cols-4
            md:grid-cols-6
            gap-8
            place-items-center
            animate-[float_4s_infinite]
          "
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillIcons.map((skill) => (
            <motion.li
              key={skill.name}
              className="flex flex-col items-center group"
              variants={iconVariants}
            >
              {/* Icon with Hover Effect */}
              <div className="w-16 h-16 flex items-center justify-center relative">
                <img
                  src={skill.src}
                  alt={skill.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]"
                />
              </div>
              {/* Label connected to hover */}
              <p
                className="
                  mt-2 text-sm md:text-base opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:text-cyan-400
                "
              >
                {skill.name}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Skills;
