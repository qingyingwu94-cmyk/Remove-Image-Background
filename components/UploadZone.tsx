import React, { useRef, useState } from 'react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    // Basic validation for images
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    onFileSelected(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 relative z-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Illustration / Text */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Remove Image <br />
            <span className="text-brand-600 relative">
              Background
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-100 -z-10" viewBox="0 0 200 9" fill="currentColor">
                <path d="M2.00025 6.99999C28.5135 3.32187 86.8405 -1.9723 198.001 3.49999" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            100% Automatic and Free using Gemini 2.5 Flash.
          </p>
          
          <div 
            className={`w-full group cursor-pointer transition-all duration-300 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-brand-50 ${isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/png, image/jpeg, image/jpg, image/webp" 
              onChange={handleFileInput}
            />
            
            <div className="bg-brand-600 text-white rounded-full p-4 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            
            <button className="bg-brand-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:bg-brand-700 transition-colors">
              Upload Image
            </button>
            <p className="mt-4 text-sm text-gray-500">or drop a file here</p>
          </div>
        </div>

        {/* Right Side: Demo Image */}
        <div className="w-full md:w-1/2 bg-gray-100 relative hidden md:block overflow-hidden">
          <img 
            src="https://picsum.photos/600/800" 
            alt="Demo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
            <p className="text-white font-medium">Stunning quality with AI</p>
          </div>
        </div>

      </div>
      
      <div className="mt-8 flex justify-center gap-6 text-gray-400 text-xs">
         <span>No image? Try one of these:</span>
         <div className="flex gap-2">
            <button className="w-8 h-8 rounded bg-gray-200 overflow-hidden hover:ring-2 ring-brand-500" onClick={() => {/* Mock logic would go here */}}>
                <img src="https://picsum.photos/50/50?random=1" className="w-full h-full object-cover"/>
            </button>
            <button className="w-8 h-8 rounded bg-gray-200 overflow-hidden hover:ring-2 ring-brand-500" onClick={() => {/* Mock logic */}}>
                <img src="https://picsum.photos/50/50?random=2" className="w-full h-full object-cover"/>
            </button>
         </div>
      </div>
    </div>
  );
};

export default UploadZone;
