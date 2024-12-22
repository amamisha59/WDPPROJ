import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USER_LISTINGS = gql`
  query GetUserListings($userId: ID!) {
    getUserListings(userId: $userId) {
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

const DELETE_HOUSE = gql`
  mutation DeleteHouse($houseId: ID!) {
    deleteHouse(houseId: $houseId)
  }
`;

function SellerDashBoard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Make sure to store userId during login

  const { loading, error, data, refetch } = useQuery(GET_USER_LISTINGS, {
    variables: { userId },
    fetchPolicy: 'network-only'
  });

  const [deleteHouse] = useMutation(DELETE_HOUSE, {
    onCompleted: () => {
      refetch(); // Refresh the list after deletion
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleDelete = async (houseId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteHouse({
          variables: { houseId }
        });
      } catch (err) {
        console.error('Error deleting house:', err);
      }
    }
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
        {data?.getUserListings?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No properties listed yet.</p>
            <button
              onClick={() => navigate('/add-house')}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.getUserListings.map((house) => (
              <div key={house.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={house.images || 'https://via.placeholder.com/400x300?text=No+Image'}
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
                  <div className="mt-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {house.houseType}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Listed on: {new Date().toLocaleDateString()}
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

export default SellerDashBoard;