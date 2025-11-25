import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                 <path d="M15 8h.01" />
                 <rect width="16" height="16" x="4" y="4" rx="3" />
                 <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
                 <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
               </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Remove.bg<span className="text-brand-600">Clone</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">How to use</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Tools & API</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Pricing</a>
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Log In / Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
