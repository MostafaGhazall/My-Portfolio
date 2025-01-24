import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

const Contact: React.FC = () => {
  const icons = [
    {
      icon: <FaPhoneAlt />,
      link: "tel:+0201145054551",
      label: "Call",
    },
    {
      icon: <FaWhatsapp />,
      link: "https://wa.me/+0201145054551",
      label: "WhatsApp",
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/mostafa-ghazal-software-engineer/",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/MostafaGhazall",
      label: "GitHub",
    },
    {
      icon: <FaEnvelope />,
      link: "mailto:mostafaghazal210@gmail.com",
      label: "Email",
    },
  ];

  // Split the title text into characters
  const titleText = "Get In Touch".split("");

  // Intersection Observer to replay animations on reveal
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Variants for wave animation on the title
  const waveContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const waveLetter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: [20, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Typing animation for the first paragraph
  const typingContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const typingLetter = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
  };

  // Icons bounce animation
  const iconBounce = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f8] text-white px-6 py-16"
    >
      {/* Title with wave animation */}
      <motion.div
        className="text-5xl font-bold mb-8 flex justify-center"
        variants={waveContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {titleText.map((char, index) => (
          <motion.span
            key={index}
            className="
              leading-tight
              bg-gradient-to-t from-cyan-500 to-slate-950
              bg-clip-text text-transparent
            "
            variants={waveLetter}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Typing Animation for the Tagline */}
      <motion.p
        className="text-center text-lg text-black max-w-3xl mb-4"
        variants={typingContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {"Let’s discuss your project and collaborate to achieve outstanding results in web development and graphic design."
          .split("")
          .map((char, index) => (
            <motion.span key={index} variants={typingLetter}>
              {char}
            </motion.span>
          ))}
      </motion.p>

      <motion.p
        className="text-center text-sm text-gray-500 italic mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        "Empowering businesses through innovative design and development solutions."
      </motion.p>

      {/* Icons - bounce simultaneously */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-5 gap-6 animate-[float_4s_infinite]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {icons.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={iconBounce}
            whileHover={{ scale: 1.1 }} // Scale on hover
            transition={{ type: "spring", stiffness: 300 }}
            className="
              flex flex-col items-center justify-center
              w-16 h-16 rounded-full
              bg-gradient-to-t from-cyan-500 to-slate-950
              shadow-lg
            "
            title={item.label}
          >
            <span className="text-2xl">{item.icon}</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Contact;
