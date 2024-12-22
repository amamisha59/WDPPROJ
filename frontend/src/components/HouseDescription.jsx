import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function HouseDescription() {
  const navigate = useNavigate();
  const { state: house } = useLocation();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      navigate('/buyer-dashboard');
    }, 1500);
  };

  if (!house) {
    return navigate('/buyer-dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          {/* Image Section */}
          <div className="relative h-96 group">
            <img
              src={house.image}
              alt={house.title}
              className={`w-full h-full object-cover transition-transform duration-500 
                ${isImageZoomed ? 'scale-110' : 'scale-100'} 
                cursor-pointer hover:brightness-110`}
              onClick={() => setIsImageZoomed(!isImageZoomed)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg 
                       hover:bg-white transition-all duration-200 flex items-center gap-2
                       transform hover:translate-x-1 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="animate-fadeIn">
                <h1 className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                  {house.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {house.location}
                </p>
              </div>
              <div className="text-right animate-fadeIn">
                <p className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors">
                  ${house.price.toLocaleString()}
                </p>
                <span className="inline-block mt-2 px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm
                               transform hover:scale-105 transition-all duration-200 hover:bg-blue-200">
                  {house.type}
                </span>
              </div>
            </div>

            <div className="mt-8 animate-slideUp">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line hover:text-gray-700 transition-colors">
                {house.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 animate-slideUp">
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className={`w-full py-4 rounded-lg text-lg font-semibold
                         transition-all duration-300 transform hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-offset-2 
                         ${isBooking 
                           ? 'bg-green-400 cursor-wait' 
                           : 'bg-green-500 hover:bg-green-600 hover:shadow-lg focus:ring-green-500'
                         }
                         text-white`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isBooking ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book Now
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDescription;

// Add these animations to your global CSS or tailwind.config.js
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .animate-slideUp {
    animation: slideUp 0.5s ease-out;
  }
`; 