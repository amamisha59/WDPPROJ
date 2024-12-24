import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKED_HOUSES = gql`
  query GetBookedHouses {
    getBookedHouses {
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
        owner
      }
    }
  }
`;

function DetailedHouseCard({ booking }) {
  const house = booking.house;

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
              <i className="fas fa-map-marker-alt mr-2"></i>
              {house.location}
            </p>
          </div>
          <span className="px-4 py-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 
                          rounded-full text-sm font-semibold backdrop-blur-sm">
            {house.houseType}
          </span>
        </div>

        {/* Booking Details Section */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/10">
          <div>
            <h4 className="text-sm font-semibold text-gray-200">Booking Date</h4>
            <p className="text-gray-300">
              {new Date(booking.bookingDate).toLocaleDateString('en-US', {
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
              <h4 className="text-sm font-semibold text-emerald-300">Booking {booking.status}</h4>
              <p className="text-sm text-emerald-400/80">Property successfully booked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserListings() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_BOOKED_HOUSES, {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">My Purchases</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="px-4 py-2 bg-blue-500/90 text-white rounded-lg font-semibold 
                        hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                        duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/90 text-white rounded-lg font-semibold 
                        hover:bg-red-600 transform hover:-translate-y-0.5 transition-all 
                        duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {data?.getBookedHouses?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-300 text-xl drop-shadow-md">You haven't purchased any properties yet.</p>
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="mt-4 px-6 py-3 bg-blue-500/90 text-white rounded-lg font-semibold 
                        hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                        duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data?.getBookedHouses.map((booking) => (
              <DetailedHouseCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserListings; 