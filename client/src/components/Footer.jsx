// Footer.js
import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white p-4 fixed inset-x-0 bottom-0">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <p>© 2024 My Website. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <IconContext.Provider
            value={{
              className: "transition-colors duration-300 hover:text-blue-500",
            }}
          >
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FaGithub />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
