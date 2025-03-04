import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About: React.FC = () => {
  // Split the header text into an array of characters
  const headerText = "About Me".split("");

  // Observe the section
  const { ref, inView } = useInView({
    triggerOnce: true, // Replay the animation on section reveal
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  // Variants for typing animation
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const paragraphVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.01, // Faster typing delay
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-start px-6 py-16 bg-[radial-gradient(circle_at_50%_50%,_#01173d_0%,_#000_90%)] text-white"
    >
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1, // Delay for each character
              },
            },
          }}
        >
          {headerText.map((char, index) => (
            <motion.span
              key={index}
              className="text-5xl font-bold leading-tight bg-gradient-to-r from-fuchsia-700 to-purple-700 bg-clip-text text-transparent"
              variants={{
                hidden: { opacity: 0, y: 20 }, // Start below with no opacity
                visible: {
                  opacity: 1,
                  y: [20, -10, 0], // Bounce up and settle
                  transition: {
                    duration: 0.5, // Duration of the bounce
                    ease: "easeOut",
                  },
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10">
        {/* Text Section */}
        <div className="grid gap-6 justify-items-start md:justify-items-stretch">
          <motion.div
            className="text-left text-lg max-w-xl whitespace-pre-wrap leading-relaxed"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={paragraphVariants}
          >
            {"I am a dedicated and multifaceted developer with expertise in front-end development and graphic design. I excel at crafting innovative and highly functional solutions, blending technical precision with artistic creativity. With a sharp eye for detail and a passion for delivering remarkable digital experiences, I bring a harmonious balance of technical prowess and creative vision to every project I embrace."
              .split(" ")
              .map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      className="inline-block"
                      variants={charVariants}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span>{"\u00A0"}</span>
                </span>
              ))}
          </motion.div>

          {/* Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            <div className="relative inline-flex items-center justify-center">
              {/* Conic Gradient behind the button (animate only the angle) */}
              <motion.span
                className="
                absolute
                -inset-1
                rounded-full
                pointer-events-none
                z-0
                blur-sm
              "
                style={{
                  ["--angle" as any]: "0deg",
                  background: `conic-gradient(
                  from var(--angle),
                  /* Half fuchsia, half purple, both at alpha=0.6 */
                  rgba(192,38,211,0.6) 0deg,
                  rgba(192,38,211,0.6) 180deg,
                  rgba(126,34,206,0.6) 180deg,
                  rgba(126,34,206,0.6) 360deg
                )`,
                }}
                animate={{ "--angle": "360deg" }}
                transition={{
                  // Smooth constant rotation
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
              />

              {/* Actual Button (front layer) */}
              <motion.a
                href="/C.V.pdf"
                download
                className="
                relative z-10
                inline-block
                px-8 py-3
                rounded-full
                text-white text-lg font-semibold
                bg-gray-950
                border-2 border-transparent
                transition-all duration-300
              "
                whileHover={{
                  // Matches the gradient color, so the swirl is 'hidden' behind it
                  boxShadow: "0 0 10px 3px rgba(192, 38, 211, 0.6)",
                }}
              >
                Get My Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 }, // Start hidden
            visible: { opacity: 1 }, // Fade in on reveal
          }}
          transition={{
            duration: 0.8, // Initial fade-in duration
            ease: "easeOut",
          }}
        >
          <motion.img
            key={inView ? "visible" : "hidden"} // Change key to trigger re-render
            src="/about22.png"
            alt="Mostafa Ghazal About"
            className="about-image rounded-3xl shadow-lg w-[350px] h-[450px] object-cover"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { rotateY: 0, opacity: 0 },
              visible: {
                rotateY: [0, 180, 360], // Double flip
                opacity: 1,
                scale: 1, // Normal size after flip
              },
            }}
            transition={{
              rotateY: {
                duration: 0.9, // Flip duration
                ease: "easeOut",
              },
              opacity: {
                duration: 0.9, // Match opacity timing with flip
                ease: "easeOut",
              },
            }}
            onAnimationComplete={() => {
              const element = document.querySelector(
                ".about-image"
              ) as HTMLElement;
              if (element) {
                // Add breathing animation after the flip
                element.style.animation = "breathing 4s infinite ease-in-out";
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
