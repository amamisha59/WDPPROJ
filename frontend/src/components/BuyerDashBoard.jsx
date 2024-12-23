import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_HOUSES = gql`
  query GetHouses($location: String, $priceRange: [Float!], $houseType: String) {
    getHouses(location: $location, priceRange: $priceRange, houseType: $houseType) {
      id
      title
      description
      price
      location
      houseType
      images
      createdAt
    }
  }
`;

function BuyerDashBoard() {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    minPrice: '',
    maxPrice: '',
    houseType: '',
    location: ''
  });

  const [activeFilters, setActiveFilters] = useState({
    location: undefined,
    priceRange: undefined,
    houseType: undefined
  });

  const { loading, error, data, refetch } = useQuery(GET_HOUSES, {
    variables: activeFilters,
    fetchPolicy: 'network-only'
  });

  const handleFilterChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let priceRange;
    if (filterData.minPrice && filterData.maxPrice) {
      priceRange = [parseFloat(filterData.minPrice), parseFloat(filterData.maxPrice)];
    } else if (filterData.minPrice) {
      priceRange = [parseFloat(filterData.minPrice), Number.MAX_SAFE_INTEGER];
    } else if (filterData.maxPrice) {
      priceRange = [0, parseFloat(filterData.maxPrice)];
    }

    const newFilters = {
      location: filterData.location || undefined,
      priceRange: priceRange,
      houseType: filterData.houseType || undefined
    };
    setActiveFilters(newFilters);
    refetch(newFilters);
  };

  const handleClearFilters = () => {
    setFilterData({
      minPrice: '',
      maxPrice: '',
      houseType: '',
      location: ''
    });
    setActiveFilters({
      location: undefined,
      priceRange: undefined,
      houseType: undefined
    });
    refetch({
      location: undefined,
      priceRange: undefined,
      houseType: undefined
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
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
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
          {(activeFilters.location || activeFilters.priceRange || activeFilters.houseType) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Active Filters:</span>
              {activeFilters.location && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Location: {activeFilters.location}
                </span>
              )}
              {activeFilters.priceRange && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Price: ${activeFilters.priceRange[0]} - ${activeFilters.priceRange[1]}
                </span>
              )}
              {activeFilters.houseType && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Type: {activeFilters.houseType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* House Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.getHouses?.map((house) => (
            <div 
              key={house.id} 
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/house-description', { state: house })}
            >
              <img
                src={house.images || 'https://via.placeholder.com/400x300?text=No+Image'}
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
                    {house.houseType}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/house-description', { state: house });
                  }}
                  className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {data?.getHouses?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No houses found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default BuyerDashBoard;