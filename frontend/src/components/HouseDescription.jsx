import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function HouseDescription() {
  const navigate = useNavigate();
  const { state: house } = useLocation();
  const [isImageZoomed, setIsImageZoomed] = useState(false);

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
              src={house.images || 'https://via.placeholder.com/800x600?text=No+Image'}
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
                       text-gray-700 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{house.title}</h1>
              <span className="text-3xl font-bold text-green-600">
                ${house.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {house.houseType}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {house.location}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Listed on: {new Date(parseInt(house.createdAt)).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {house.description || "No description available."}
              </p>
            </div>

            {/* Additional Details Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                <p className="text-gray-600">
                  {house.location}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Type</h3>
                <p className="text-gray-600">
                  {house.houseType}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                         transition-colors duration-200 font-medium"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  // Implement booking/purchase logic here
                  console.log('Book/Purchase:', house.id);
                }}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                         transition-colors duration-200 font-medium"
              >
                Book Now
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