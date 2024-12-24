import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_SOLD_HOUSES = gql`
  query GetSoldHouses($userId: ID!) {
    getSoldHouses(userId: $userId) {
      id
      bookingDate
      status
      house {
        id
        title
        description
        price
        location
        houseType
        images
        createdAt
      }
      user {
        id
        username
        email
      }
    }
  }
`;

function DetailedSoldHouseCard({ booking }) {
  const house = booking.house;
  const buyer = booking.user;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl 
                    hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={house.images || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={house.title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
                        backdrop-blur-sm p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{house.title}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Price and Location Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-3xl font-bold text-emerald-400 drop-shadow-md">
              ${house.price.toLocaleString()}
            </span>
            <p className="text-gray-300">
              <i className="fas fa-map-marker-alt"></i>
              {house.location}
            </p>
          </div>
          <span className="px-4 py-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 
                        rounded-full text-sm font-semibold backdrop-blur-sm">
            {house.houseType}
          </span>
        </div>

        {/* Sale Details Section */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/10">
          <div>
            <h4 className="text-sm font-semibold text-gray-200">Sale Date</h4>
            <p className="text-gray-300">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-200">Status</h4>
            <p className="text-gray-300">{booking.status}</p>
          </div>
        </div>

        {/* Buyer Information Section */}
        <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500/50 backdrop-blur-sm 
                          flex items-center justify-center border border-blue-400/30">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-300">Buyer Information</h4>
              <p className="text-sm text-gray-300">{buyer.username}</p>
              <p className="text-sm text-gray-400">{buyer.email}</p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-500/50 backdrop-blur-sm 
                          flex items-center justify-center border border-emerald-400/30">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-emerald-300">Property Sold</h4>
              <p className="text-sm text-emerald-400/80">Successfully sold property</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoldHouse() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const { loading, error, data } = useQuery(GET_SOLD_HOUSES, {
    variables: { userId },
    fetchPolicy: 'network-only'
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-400 drop-shadow-md">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Sold Properties</h1>
          <button
            onClick={() => navigate('/seller-dashboard')}
            className="px-4 py-2 bg-blue-500/90 text-white rounded-lg font-semibold 
                      hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                      duration-200 shadow-md hover:shadow-lg drop-shadow-md"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {data?.getSoldHouses?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-300 text-xl drop-shadow-md">No properties sold yet.</p>
            <button
              onClick={() => navigate('/seller-dashboard')}
              className="mt-4 px-6 py-3 bg-blue-500/90 text-white rounded-lg font-semibold 
                        hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                        duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data?.getSoldHouses.map((booking) => (
              <DetailedSoldHouseCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SoldHouse;
