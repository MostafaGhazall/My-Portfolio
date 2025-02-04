import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaLinkedin,
  // FaGithub,
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
    // {
    //   icon: <FaGithub />,
    //   link: "https://github.com/MostafaGhazall",
    //   label: "GitHub",
    // },
    {
      icon: <FaEnvelope />,
      link: "mailto:mostafaghazal210@gmail.com",
      label: "Email",
    },
  ];

  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://formspree.io/f/xvgzrnnl", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setSubmitted(true);
    }
  };

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
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f0f4f8] px-6 py-16 gap-10"
    >
      {/* Left Side: Text & Icons */}
      <motion.div className="flex flex-col items-center lg:items-start max-w-lg text-center lg:text-left">
        {/* Title with wave animation */}
        <motion.div
          className="text-6xl font-bold mb-3 flex justify-center"
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
          className="text-left text-xl text-black max-w-xl mb-4"
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
          "Empowering businesses through innovative design and development
          solutions."
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
              w-16 h-16 rounded-full text-white
              bg-gradient-to-t from-cyan-500 to-slate-950
              shadow-lg
            "
              title={item.label}
            >
              <span className="text-2xl">{item.icon}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Side - Contact Form */}
      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-lg p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input type="text" name="_gotcha" style={{ display: "none" }} />
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-slate-950 text-white font-bold py-3 rounded-md transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        ) : (
          <p className="bg-gradient-to-t from-cyan-500 to-slate-950 bg-clip-text text-transparent text-lg font-semibold text-center">
            Thank you! We'll get in touch soon.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
