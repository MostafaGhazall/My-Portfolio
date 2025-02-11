import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && isLoaded) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView, isLoaded]);

  const handleImageLoad = () => setIsLoaded(true);

  return (
    <section
      id="home"
      ref={ref}
      className="
        min-h-screen bg-gradient-to-t from-gray-300 via-gray-100 to-gray-50 relative overflow-hidden
        px-6 md:px-16 flex flex-col-reverse md:flex-row justify-center items-center
      "
    >
      {/* Text container: animates in from the left */}
      <motion.div
        className="
          w-full md:w-1/2 flex flex-col items-start text-left max-w-xl
          py-6 md:py-8 md:mr-auto md:ml-32
        "
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -200 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p className="text-gray-800 text-xl md:text-2xl font-agency-bold ml-1.5">
          Hello, I am
        </motion.p>

        <motion.h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-black mb-4">
          Mostafa Ghazal
        </motion.h1>

        <motion.p className="text-black text-xl md:text-2xl font-agency-regular leading-relaxed mb-5 md:max-w-sm ml-1.5">
          A Software Engineer, specializing in Front-End Development &amp; UI/UX Design.
        </motion.p>

        {/* Learn More Button */}
        <motion.a
          href="#about"
          className="
            relative inline-block px-6 py-2 rounded-full text-black text-lg font-semibold
            border-[2px] border-black bg-transparent
            transition-all duration-300
          "
          whileHover={{ backgroundColor: "black", color: "white" }}
        >
          Learn More
        </motion.a>
      </motion.div>

      {/* MOBILE IMAGE */}
      <motion.div
        className="
          block md:hidden
          w-72 aspect-square
          rounded-full shadow-xl
          overflow-hidden bg-white
          z-20
          mt-6
        "
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/hero2.png"
          alt="Mostafa Ghazal (Mobile)"
          loading="lazy"
          onLoad={handleImageLoad}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* DESKTOP IMAGE */}
      <motion.img
        src="/hero1.png"
        alt="Mostafa Ghazal (Desktop)"
        loading="lazy"
        onLoad={handleImageLoad}
        className="
          hidden md:block
          absolute top-1 right-48 transform -translate-y-1/2
          z-20
          max-w-md h-auto
        "
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
};

export default Home;
