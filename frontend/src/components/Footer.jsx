import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 z-50">
      © {new Date().getFullYear()} HomeHunt. All rights reserved.
    </footer>
  );
};

export default Footer; 