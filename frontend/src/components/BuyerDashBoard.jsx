import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./BuyerDashboard.css";

const GET_HOUSES = gql`
  query GetHouses(
    $location: String
    $priceRange: [Float!]
    $houseType: String
  ) {
    getHouses(
      location: $location
      priceRange: $priceRange
      houseType: $houseType
    ) {
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
    minPrice: "",
    maxPrice: "",
    houseType: "",
    location: "",
  });

  const [activeFilters, setActiveFilters] = useState({
    location: undefined,
    priceRange: undefined,
    houseType: undefined,
  });

  const { loading, error, data, refetch } = useQuery(GET_HOUSES, {
    variables: activeFilters,
    fetchPolicy: "network-only",
  });

  const handleFilterChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let priceRange;
    if (filterData.minPrice && filterData.maxPrice) {
      priceRange = [
        parseFloat(filterData.minPrice),
        parseFloat(filterData.maxPrice),
      ];
    } else if (filterData.minPrice) {
      priceRange = [parseFloat(filterData.minPrice), Number.MAX_SAFE_INTEGER];
    } else if (filterData.maxPrice) {
      priceRange = [0, parseFloat(filterData.maxPrice)];
    }

    const newFilters = {
      location: filterData.location || undefined,
      priceRange: priceRange,
      houseType: filterData.houseType || undefined,
    };
    setActiveFilters(newFilters);
    refetch(newFilters);
  };

  const handleClearFilters = () => {
    setFilterData({
      minPrice: "",
      maxPrice: "",
      houseType: "",
      location: "",
    });
    setActiveFilters({
      location: undefined,
      priceRange: undefined,
      houseType: undefined,
    });
    refetch({
      location: undefined,
      priceRange: undefined,
      houseType: undefined,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="text-3xl font-bold text-yellow-500">
            Buyer Dashboard
          </h1>
          <div className="buttons-container">
            <button
              onClick={() => navigate("/user-listings")}
              className="dashboard-btn"
            >
              My Purchases
            </button>
            <button onClick={handleLogout} className="dashboard-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="filter-section p-6 mb-6">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filterData.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md 
                         shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                         text-white placeholder-gray-400"
                placeholder="Min Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filterData.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md 
                         shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                         text-white placeholder-gray-400"
                placeholder="Max Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                House Type
              </label>
              <select
                name="houseType"
                value={filterData.houseType}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-white/20 rounded-md 
                         shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                         text-white"
              >
                <option value="" className="bg-gray-700">All Types</option>
                <option value="Villa" className="bg-gray-700">Villa</option>
                <option value="Apartment" className="bg-gray-700">Apartment</option>
                <option value="House" className="bg-gray-700">House</option>
                <option value="Condo" className="bg-gray-700">Condo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filterData.location}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md 
                         shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                         text-white placeholder-gray-400"
                placeholder="Location"
              />
            </div>
            <div className="flex items-end gap-2">
              <button 
                type="submit" 
                className="dashboard-btn bg-emerald-500/90 hover:bg-emerald-600 transform hover:-translate-y-0.5 
                         transition-all duration-200 shadow-md hover:shadow-lg drop-shadow-md flex-1"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="dashboard-btn bg-gray-500/90 hover:bg-gray-600 transform hover:-translate-y-0.5 
                         transition-all duration-200 shadow-md hover:shadow-lg drop-shadow-md"
              >
                Clear
              </button>
            </div>
          </form>

          {(activeFilters.location ||
            activeFilters.priceRange ||
            activeFilters.houseType) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-white font-medium">Active Filters:</span>
              {activeFilters.location && (
                <span className="px-2 py-1 rounded-full text-sm bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  Location: {activeFilters.location}
                </span>
              )}
              {activeFilters.priceRange && (
                <span className="px-2 py-1 rounded-full text-sm bg-green-500/20 text-green-200 border border-green-400/30">
                  Price: ${activeFilters.priceRange[0]} - ${activeFilters.priceRange[1]}
                </span>
              )}
              {activeFilters.houseType && (
                <span className="px-2 py-1 rounded-full text-sm bg-purple-500/20 text-purple-200 border border-purple-400/30">
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
              className="house-card"
              onClick={() => navigate("/house-description", { state: house })}
            >
              <div className="house-card-content">
                <img
                  src={
                    house.images ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={house.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {house.title}
                  </h3>
                  <p className="text-gray-100 mt-2 truncate group relative cursor-help">
                    {house.description}
                    {/* Tooltip for full description */}
                    <span className="invisible group-hover:visible absolute left-0 top-full w-64 bg-black text-white text-sm rounded p-2 z-10">
                      {house.description}
                    </span>
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-300">
                      ${house.price.toLocaleString()}
                    </span>
                    <span className="text-gray-100">{house.location}</span>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {house.houseType}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/house-description", { state: house });
                    }}
                    className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.getHouses?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">
              No houses found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default BuyerDashBoard;
