import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="justify-start text-4xl m-3">
      <Link to="/">
        <FaHome />
      </Link>
    </div>
  );
};

export default Navbar;
