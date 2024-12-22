import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKED_HOUSES = gql`
  query GetBookedHouses($userId: ID!) {
    getBookedHouses(userId: $userId) {
      id
      title
      description
      price
      location
      houseType
      images
      createdAt
      owner
    }
  }
`;

function DetailedHouseCard({ house }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={house.images || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={house.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white">{house.title}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Price and Location Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-3xl font-bold text-green-600">
              ${house.price.toLocaleString()}
            </span>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {house.location}
            </p>
          </div>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {house.houseType}
          </span>
        </div>

        {/* Description Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
          <p className="text-gray-600 leading-relaxed">
            {house.description || "No description available."}
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Purchase Date</h4>
            <p className="text-gray-600">
              {new Date(parseInt(house.createdAt)).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Property Type</h4>
            <p className="text-gray-600">{house.houseType}</p>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-green-800">Purchase Confirmed</h4>
              <p className="text-sm text-green-600">Property successfully purchased</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserListings() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const { loading, error, data } = useQuery(GET_BOOKED_HOUSES, {
    variables: { userId },
    fetchPolicy: 'network-only'
  });

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
          <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
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
        {data?.getBookedHouses?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">You haven't purchased any properties yet.</p>
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data?.getBookedHouses.map((house) => (
              <DetailedHouseCard key={house.id} house={house} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserListings; 