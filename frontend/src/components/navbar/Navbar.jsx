import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Title */}
          <div className="text-white text-2xl font-bold">Image Tweak</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="/contact" className="text-white hover:text-gray-200">
              Contact
            </a>
            <a href="https://github.com/BowlPulp/ImageTweak" className="text-white hover:text-gray-200">
              Contribute
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <a href="/" className="block py-2 px-4 text-white hover:bg-blue-500">
              Home
            </a>
            <a href="/features" className="block py-2 px-4 text-white hover:bg-blue-500">
              Features
            </a>
            <a href="/pricing" className="block py-2 px-4 text-white hover:bg-blue-500">
              Pricing
            </a>
            <a href="/contact" className="block py-2 px-4 text-white hover:bg-blue-500">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
