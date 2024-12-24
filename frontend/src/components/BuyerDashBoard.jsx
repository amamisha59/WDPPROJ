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
              <label className="filter-label block text-sm font-medium">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filterData.minPrice}
                onChange={handleFilterChange}
                className="filter-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Min Price"
              />
            </div>
            <div>
              <label className="filter-label block text-sm font-medium">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filterData.maxPrice}
                onChange={handleFilterChange}
                className="filter-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Max Price"
              />
            </div>
            <div>
              <label className="filter-label block text-sm font-medium">
                House Type
              </label>
              <select
                name="houseType"
                value={filterData.houseType}
                onChange={handleFilterChange}
                className="filter-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
              </select>
            </div>
            <div>
              <label className="filter-label block text-sm font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filterData.location}
                onChange={handleFilterChange}
                className="filter-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Location"
              />
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="dashboard-btn flex-1">
                Search
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="dashboard-btn"
              >
                Clear
              </button>
            </div>
          </form>

          {(activeFilters.location ||
            activeFilters.priceRange ||
            activeFilters.houseType) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-300">Active Filters:</span>
              {activeFilters.location && (
                <span className="active-filter-badge px-2 py-1 rounded-full text-sm">
                  Location: {activeFilters.location}
                </span>
              )}
              {activeFilters.priceRange && (
                <span className="active-filter-badge px-2 py-1 rounded-full text-sm">
                  Price: ${activeFilters.priceRange[0]} - $
                  {activeFilters.priceRange[1]}
                </span>
              )}
              {activeFilters.houseType && (
                <span className="active-filter-badge px-2 py-1 rounded-full text-sm">
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
