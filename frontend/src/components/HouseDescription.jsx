import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./HouseDescription.css";

const BOOK_HOUSE_MUTATION = gql`
  mutation BookHouse($houseId: ID!) {
    bookHouse(houseId: $houseId) {
      id
      house {
        id
        title
      }
      bookingDate
      status
    }
  }
`;

function HouseDescription() {
  const navigate = useNavigate();
  const { state: house } = useLocation();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // For confirmation popup
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);

  const [bookHouse] = useMutation(BOOK_HOUSE_MUTATION, {
    onCompleted: () => {
      setTimeout(() => {
        setShowLoadingOverlay(false);
        setIsPopupVisible(false); // Close the confirmation popup
        setIsConfirmationPopupVisible(true); // Show confirmation success popup
      }, 3000);
    },
    onError: (error) => {
      setShowLoadingOverlay(false);
      setBookingError(error.message);
    },
  });

  // Function to trigger the booking confirmation popup
  const openBookingConfirmationPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to confirm the booking
  const handleBookingConfirmation = async () => {
    setShowLoadingOverlay(true);
    setIsPopupVisible(false); // Close the confirmation popup
    try {
      await bookHouse({
        variables: {
          houseId: house.id,
        },
      });
    } catch (err) {
      setShowLoadingOverlay(false);
      console.error("Booking error:", err);
    }
  };

  // Function to close the confirmation success popup
  const closeConfirmationPopup = () => {
    setIsConfirmationPopupVisible(false);
    navigate("/user-listings");
  };

  if (!house) {
    return navigate("/buyer-dashboard");
  }

  return (
    <div className="description-container">
      {showLoadingOverlay && (
        <div className="loading-overlay">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div className="description-card">
        {/* Image Section */}
        <div className="image-container">
          <img
            src={
              house.images ||
              "https://via.placeholder.com/800x600?text=No+Image"
            }
            alt={house.title}
            className={`house-image ${
              isImageZoomed ? "scale-110" : "scale-100"
            }`}
            onClick={() => setIsImageZoomed(!isImageZoomed)}
          />
          <button
            onClick={() => navigate("/buyer-dashboard")}
            className="back-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-white">{house.title}</h1>
            <span className="text-3xl font-bold text-gray-100">
              ${house.price.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <span className="info-badge">{house.houseType}</span>
            <span className="info-badge">{house.location}</span>
            <span className="info-badge">
              Listed on:{" "}
              {new Date(house.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {house.description || "No description available."}
            </p>
          </div>

          {/* Details Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="details-card">
              <h3 className="text-lg font-semibold text-white mb-4">
                Location Details
              </h3>
              <p className="text-gray-300">{house.location}</p>
            </div>
            <div className="details-card">
              <h3 className="text-lg font-semibold text-white mb-4">
                Property Type
              </h3>
              <p className="text-gray-300">{house.houseType}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/buyer-dashboard")}
              className="action-button flex-1"
            >
              Go Back
            </button>
            <button
              onClick={openBookingConfirmationPopup} // Open confirmation popup
              disabled={showLoadingOverlay}
              className={`action-button book-button flex-1 ${
                showLoadingOverlay ? "disabled" : ""
              }`}
            >
              {showLoadingOverlay ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Booking...
                </div>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className="popup-overlay active">
          <div className="popup-content">
            <h2>Confirm Booking</h2>
            <p>Are you sure you want to book this property?</p>
            <div className="popup-buttons">
              <button
                className="confirm-button"
                onClick={handleBookingConfirmation} // Confirm booking
              >
                Yes, Book
              </button>
              <button className="cancel-button" onClick={() => setIsPopupVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Success Popup */}
      {isConfirmationPopupVisible && (
        <div className="popup-overlay active">
          <div className="popup-content">
            <h2>Booking Confirmed!</h2>
            <p>Your booking for the property <strong>{house.title}</strong> has been successfully confirmed.</p>
            <div className="popup-buttons">
              <button
                className="confirm-button"
                onClick={closeConfirmationPopup} // Close and go to listings
              >
                Go to Listings
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingError && <div className="error-message">{bookingError}</div>}
    </div>
  );
}

export default HouseDescription;
