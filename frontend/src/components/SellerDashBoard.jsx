import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import "./SellerDashboard.css";

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
  const userId = localStorage.getItem("userId"); // Make sure to store userId during login

  const { loading, error, data, refetch } = useQuery(GET_USER_LISTINGS, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const [deleteHouse] = useMutation(DELETE_HOUSE, {
    onCompleted: () => {
      refetch(); // Refresh the list after deletion
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [houseToDelete, setHouseToDelete] = useState(null); // State to store houseId to delete

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleDelete = (houseId) => {
    setHouseToDelete(houseId); // Set the houseId to delete
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    try {
      await deleteHouse({
        variables: { houseId: houseToDelete },
      });
      setIsModalOpen(false); // Close the modal after deletion
    } catch (err) {
      console.error("Error deleting house:", err);
      setIsModalOpen(false); // Close the modal on error
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal if cancel
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner animate-spin rounded-full h-32 w-32 border-4"></div>
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
            Sales Hub
          </h1>
          <div className="buttons-container">
            <button
              onClick={() => navigate("/add-house")}
              className="dashboard-btn btn-add"
            >
              Add New House
            </button>
            <button
              onClick={() => navigate("/sold-houses")}
              className="dashboard-btn btn-sold"
            >
              Sold Houses
            </button>
            <button onClick={handleLogout} className="dashboard-btn btn-logout">
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
              onClick={() => navigate("/add-house")}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.getUserListings.map((house) => (
              <div key={house.id} className="house-card">
                <div className="house-card-content">
                  <div className="relative">
                    <img
                      src={
                        house.images ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={house.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDelete(house.id)}
                        className="button"
                        title="Delete Property"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 69 14"
                          className="svgIcon bin-top"
                        >
                          <g clipPath="url(#clip0_35_24)">
                            <path
                              fill="white"
                              d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_35_24">
                              <rect fill="white" height="14" width="69"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 69 57"
                          className="svgIcon bin-bottom"
                        >
                          <g clipPath="url(#clip0_35_22)">
                            <path
                              fill="white"
                              d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_35_22">
                              <rect fill="white" height="57" width="69"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="card-title text-xl font-semibold">
                      {house.title}
                    </h3>
                    <div className="mt-2">
                      <p className="card-description truncate group relative cursor-help">
                        {house.description}
                        <span className="invisible group-hover:visible absolute left-0 top-full w-64 bg-black text-white text-sm rounded p-2 z-10">
                          {house.description}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="card-price text-2xl font-bold">
                      ₹{house.price.toLocaleString()}
                      </span>
                      <span className="card-location">{house.location}</span>
                    </div>
                    <div className="mt-2">
                      <span className="house-type-badge inline-block text-sm px-2 py-1 rounded">
                        {house.houseType}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      Listed on:{" "}
                      {new Date(house.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Are you sure you want to delete this property?</h2>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="btn-confirm">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerDashBoard;
