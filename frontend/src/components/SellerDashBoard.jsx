import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SellerDashBoard() {
  const navigate = useNavigate();
  
  // Dummy data - replace with your actual data
  const [houses, setHouses] = useState([
    {
      id: 1,
      title: 'Modern Villa',
      description: 'Beautiful modern villa with garden and swimming pool. This luxurious property features 4 bedrooms, 3 bathrooms, a spacious living area, and a modern kitchen. Perfect for families looking for a comfortable and elegant living space.',
      price: 350000,
      location: 'New York',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
      buyer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        purchaseDate: '2024-03-15'
      }
    },
    {
      id: 2,
      title: 'Cozy Apartment',
      description: 'Centrally located apartment with amazing city views. Features 2 bedrooms, a modern kitchen, and a balcony. Close to public transportation and shopping centers. Recently renovated with high-end finishes.',
      price: 200000,
      location: 'Los Angeles',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
      buyer: null
    },
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleDelete = (houseId) => {
    // Add confirmation before deleting
    if (window.confirm('Are you sure you want to delete this property?')) {
      setHouses(houses.filter(house => house.id !== houseId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/add-house')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add New House
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <div key={house.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={house.image}
                  alt={house.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(house.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Delete Property"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{house.title}</h3>
                <div className="mt-2">
                  <p className="text-gray-600 truncate group relative cursor-help">
                    {house.description}
                    {/* Tooltip for full description */}
                    <span className="invisible group-hover:visible absolute left-0 top-full w-64 bg-black text-white text-sm rounded p-2 z-10">
                      {house.description}
                    </span>
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ${house.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">{house.location}</span>
                </div>

                {/* Buyer Information Section - Shown on Hover */}
                <div className="mt-4 relative group">
                  <button 
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors
                      ${house.buyer 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {house.buyer ? 'View Buyer Info' : 'No Buyer Information'}
                  </button>
                  
                  {house.buyer && (
                    <div className="invisible group-hover:visible absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-4 z-20 border border-gray-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Buyer Information</h4>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p className="flex justify-between">
                          <span className="font-medium">Name:</span>
                          <span>{house.buyer.name}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-medium">Email:</span>
                          <span>{house.buyer.email}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-medium">Phone:</span>
                          <span>{house.buyer.phone}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-medium">Purchase Date:</span>
                          <span>{house.buyer.purchaseDate}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SellerDashBoard;