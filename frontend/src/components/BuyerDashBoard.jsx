import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BuyerDashBoard() {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    minPrice: '',
    maxPrice: '',
    houseType: '',
    location: ''
  });

  // Dummy data for houses - replace with your actual dataZZZ
  const [houses] = useState([
    {
      id: 1,
      title: 'Modern Villa',
      description: 'Beautiful modern villa with garden and swimming pool. This luxurious property features 4 bedrooms, 3 bathrooms, a spacious living area, and a modern kitchen. Perfect for families looking for a comfortable and elegant living space.',
      price: 350000,
      location: 'New York',
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'
    },
    {
      id: 2,
      title: 'Cozy Apartment',
      description: 'Centrally located apartment with amazing city views. Features 2 bedrooms, a modern kitchen, and a balcony. Close to public transportation and shopping centers. Recently renovated with high-end finishes.',
      price: 200000,
      location: 'Los Angeles',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'
    },
  ]);

  const handleFilterChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement filter logic here
    console.log('Filter data:', filterData);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/user-listings')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              My Purchases
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
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={filterData.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Min Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={filterData.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Max Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">House Type</label>
              <select
                name="houseType"
                value={filterData.houseType}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={filterData.location}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Location"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* House Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <div 
              key={house.id} 
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/house-description', { state: house })}
            >
              <img
                src={house.image}
                alt={house.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{house.title}</h3>
                <p className="text-gray-600 mt-2 truncate group relative cursor-help">
                  {house.description}
                  {/* Tooltip for full description */}
                  <span className="invisible group-hover:visible absolute left-0 top-full w-64 bg-black text-white text-sm rounded p-2 z-10">
                    {house.description}
                  </span>
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ${house.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">{house.location}</span>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {house.type}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking the button
                    console.log('Purchase house:', house.id);
                  }}
                  className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BuyerDashBoard;