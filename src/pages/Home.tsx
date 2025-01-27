import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if images are loaded
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Trigger animation when inView changes and content is loaded
  useEffect(() => {
    if (inView && isLoaded) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView, isLoaded]);

  // Image load handler
  const handleImageLoad = () => setIsLoaded(true);

  return (
    <section
      id="home"
      ref={ref}
      className="
        min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden
        px-6 md:px-16 flex flex-col-reverse md:flex-row items-center
      "
      style={{
        backgroundImage: "url('/cover2.jpg')",
      }}
    >
      {/* Content container */}
      <div
        className="
          w-full md:w-1/2 flex flex-col justify-center items-start
          text-left max-w-lg py-6 md:py-8
        "
      >
        <motion.h1
          className="font-tempus text-5xl md:text-7xl lg:text-8xl text-black mb-4"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -200 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Hello
        </motion.h1>
        <motion.p
          className="text-black text-base md:text-lg mb-4 md:mb-6 pr-4"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -200 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          I’m Mostafa Ghazal, a Software Engineer, specializing in Front-End
          Development &amp; UI/UX Design.
        </motion.p>
        <motion.a
          href="#about"
          className="
            inline-block px-6 py-3 rounded bg-transparent text-black
            border-2 border-black hover:bg-black hover:text-white
            transition-colors
          "
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -200 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          Learn More
        </motion.a>
      </div>

      {/* Desktop Image */}
      <motion.img
        ref={ref}
        src="/pic.png"
        alt="Mostafa Ghazal"
        loading="lazy"
        onLoad={handleImageLoad}
        className="hidden md:block absolute top-0 right-0 z-20 h-full object-cover pl-48"
        style={{ width: "auto" }}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      />

      {/* Mobile Image */}
      <motion.img
        src="/hero.png"
        alt="Mostafa Ghazal Mobile"
        loading="lazy"
        onLoad={handleImageLoad}
        className="
          block md:hidden w-[80%] max-w-sm h-auto z-10 mb-6
          shadow-2xl rounded-full
        "
        style={{
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
        }}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      />
    </section>
  );
};

export default Home;
