import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="relative">
             {/* Spinner */}
            <div className="w-24 h-24 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin"></div>
            {/* Inner Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-600 animate-pulse">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM1.5 13.5a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-6.75a.75.75 0 0 1 .75-.75h3Z" clipRule="evenodd" />
                    <path d="M13.5 1.5a.75.75 0 0 1 .75.75V7.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V2.25a.75.75 0 0 1 .75-.75h3ZM13.5 13.5a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-6.75a.75.75 0 0 1 .75-.75h3Z" />
                </svg>
            </div>
        </div>
      <h3 className="mt-8 text-xl font-bold text-gray-800">Removing Background...</h3>
      <p className="text-gray-500 mt-2">Gemini is analyzing pixels</p>
    </div>
  );
};

export default LoadingOverlay;
