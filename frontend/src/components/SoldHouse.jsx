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

function SoldHouse() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const { loading, error, data } = useQuery(GET_SOLD_HOUSES, {
    variables: { userId },
    fetchPolicy: 'network-only'
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Sold Properties</h1>
          <button
            onClick={() => navigate('/seller-dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {data?.getSoldHouses?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No properties sold yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data?.getSoldHouses.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={booking.house.images || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={booking.house.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{booking.house.title}</h3>
                  <p className="text-gray-600">{booking.house.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ${booking.house.price.toLocaleString()}
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                      {booking.house.houseType}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold mb-2">Buyer Details</h4>
                    <p className="text-gray-600">Name: {booking.user.username}</p>
                    <p className="text-gray-600">Email: {booking.user.email}</p>
                    <p className="text-gray-600">
                      Purchase Date: {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SoldHouse;
