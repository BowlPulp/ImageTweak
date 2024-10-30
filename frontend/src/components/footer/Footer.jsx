import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/" className="hover:text-gray-200">
              Home
            </a>
            <a href="/contact" className="hover:text-gray-200">
              Contact
            </a>
            <a href="https://github.com/BowlPulp/ImageTweak" className="hover:text-gray-200">
              Contribute
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p>© 2024 Image Converter. All rights reserved.</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
    <a href="https://github.com/BowlPulp/ImageTweak" target="_blank" rel="noopener noreferrer">
        <svg
            className="w-6 h-6 hover:text-gray-200"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.37 7.84 10.87.57.1.78-.25.78-.55v-2c-3.19.69-3.86-1.52-3.86-1.52-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.17.08 1.8 1.21 1.8 1.21 1.03 1.8 2.7 1.28 3.36.98.1-.75.4-1.28.72-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.1-.12-.3-.51-1.52.1-3.18 0 0 .97-.31 3.2 1.18.91-.26 1.88-.39 2.84-.39s1.93.13 2.84.39c2.23-1.49 3.2-1.18 3.2-1.18.61 1.66.22 2.88.1 3.18.73.8 1.18 1.84 1.18 3.1 0 4.43-2.68 5.41-5.24 5.7.41.35.76 1.05.76 2.12v3.14c0 .3.21.65.79.54A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
    </a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
