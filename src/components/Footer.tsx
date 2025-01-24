import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[radial-gradient(circle_at_50%_50%,_#01173d_0%,_#000_90%)] text-white py-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-3">
        {/* Social / External Links with Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/MostafaGhazall"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-300 transition"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/mostafa-ghazal-software-engineer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-300 transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:mostafaghazal210@gmail.com"
            className="text-2xl hover:text-gray-300 transition"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
