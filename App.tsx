import React, { useState } from 'react';
import NavBar from './components/NavBar';
import UploadZone from './components/UploadZone';
import ResultView from './components/ResultView';
import LoadingOverlay from './components/LoadingOverlay';
import { AppState, ProcessingStatus, ProcessedImage } from './types';
import { removeBackground } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ProcessingStatus.IDLE,
    image: null,
    error: null,
  });

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelected = async (file: File) => {
    try {
      setState(prev => ({ ...prev, status: ProcessingStatus.UPLOADING, error: null }));
      
      const base64 = await convertFileToBase64(file);
      
      // Update state to show we are processing
      setState(prev => ({ 
        ...prev, 
        status: ProcessingStatus.PROCESSING,
        image: {
            originalUrl: base64,
            processedUrl: null,
            mimeType: file.type
        }
      }));

      // Call Gemini Service
      const processedImageBase64 = await removeBackground(base64, file.type);

      setState({
        status: ProcessingStatus.SUCCESS,
        error: null,
        image: {
            originalUrl: base64,
            processedUrl: processedImageBase64,
            mimeType: 'image/png' // Gemini 2.5 flash image output usually
        }
      });

    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        status: ProcessingStatus.ERROR, 
        error: err.message || "Failed to process image. Please try again."
      }));
    }
  };

  const handleReset = () => {
    setState({
        status: ProcessingStatus.IDLE,
        image: null,
        error: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex flex-col items-center justify-start pb-20">
        
        {/* Error Notification */}
        {state.error && (
            <div className="w-full max-w-4xl px-4 mt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm flex items-start">
                    <div className="flex-shrink-0">
                         <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{state.error}</p>
                    </div>
                    <button onClick={() => setState(s => ({...s, error: null}))} className="ml-auto text-red-400 hover:text-red-500">
                         <span className="sr-only">Close</span>
                         <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        )}

        {/* View Switcher */}
        {state.status === ProcessingStatus.IDLE || state.status === ProcessingStatus.UPLOADING ? (
          <UploadZone onFileSelected={handleFileSelected} />
        ) : state.status === ProcessingStatus.PROCESSING ? (
            <LoadingOverlay />
        ) : state.status === ProcessingStatus.SUCCESS && state.image ? (
            <ResultView image={state.image} onReset={handleReset} />
        ) : null}

        {/* Features / Social Proof (only on home) */}
        {state.status === ProcessingStatus.IDLE && (
            <div className="w-full max-w-6xl mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Stunning Quality</h3>
                    <p className="text-gray-500 text-sm">Handles hair, fur, and complex edges with ease using Gemini 2.5.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Time Saving</h3>
                    <p className="text-gray-500 text-sm">Just drag and drop. No Photoshop or complex tools needed.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">100% Free</h3>
                    <p className="text-gray-500 text-sm">Process images without any hidden costs or subscriptions.</p>
                </div>
            </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
            &copy; 2024 Remove.bg Clone. Powered by Google Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;
