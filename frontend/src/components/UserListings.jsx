import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserListings() {
  const navigate = useNavigate();
  
  // Dummy data for purchased houses - replace with actual data
  const [purchasedHouses] = useState([
    {
      id: 1,
      title: 'Modern Villa',
      description: 'Beautiful modern villa with garden',
      price: 350000,
      location: 'New York',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
      purchaseDate: '2024-03-15',
      seller: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234 567 8900'
      }
    },
    // Add more purchased houses here
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
          <button
            onClick={() => navigate('/buyer-dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedHouses.map((house) => (
            <div key={house.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={house.image}
                alt={house.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{house.title}</h3>
                <p className="mt-2 text-gray-600">{house.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ${house.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">{house.location}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Seller Information</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {house.seller.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {house.seller.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {house.seller.phone}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Purchase Date:</span> {house.purchaseDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UserListings; 