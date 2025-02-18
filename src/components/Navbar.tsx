import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

const Navbar: React.FC = () => {
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav, navTheme } =
    useStore();
  const textColor = navTheme === "dark" ? "text-white" : "text-black";
  const logoSrc = navTheme === "dark" ? "/logo-light.png" : "/logo-dark.png";
  const underLine = navTheme === "dark" ? "bg-white" : "bg-black";

  // Entire menu slides in from the right
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.2 },
    },
  };

  // Each link fades up slightly
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${textColor}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo with Theme-Based Image */}
        <motion.a
          href="#home"
          className="w-24 md:w-24 h-auto"
          onClick={closeMobileNav}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img
            src={logoSrc}
            alt="Ghazal Logo"
          />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-century-regular text-base pr-6">
          {["About", "Projects", "Skills", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative group text-current transition-colors"
            >
              {link}
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${underLine}`}
              />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden pr-4"
          onClick={toggleMobileNav}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6 text-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            className="absolute top-0 left-0 w-full h-screen bg-white text-black z-40 flex"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Big "MENU" text on the left side */}
            <div className="absolute top-0 left-4 h-full w-1/4 flex items-center justify-center">
              <span className="text-gray-300 text-[16rem] font-bold -rotate-90">
                MENU
              </span>
            </div>

            {/* Close Button pinned top-right */}
            <button
              className="absolute top-6 right-4 text-xl"
              onClick={closeMobileNav}
            >
              X Close
            </button>

            {/* Link List */}
            <div
              className="
                flex flex-col items-start justify-center
                w-3/4 space-y-8
                text-5xl font-bold tracking-wide
                pl-44
              "
            >
              {["About", "Projects", "Skills", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={closeMobileNav}
                  variants={linkVariants}
                  className="relative group"
                >
                  <span className="group-hover:-translate-y-2 transition-transform inline-block">
                    {link}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
