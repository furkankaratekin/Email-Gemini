import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <p>© 2024 Furkan Karatekin</p>
        </div>
        <div className="flex space-x-4">
          <IconContext.Provider
            value={{
              className: "transition-colors duration-300 hover:text-blue-500",
            }}
          >
            <a
              href="https://www.instagram.com/furkankaratekinnn/"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/furkan-karatekin-479017234/"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/furkankaratekin" aria-label="GitHub">
              <FaGithub />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
