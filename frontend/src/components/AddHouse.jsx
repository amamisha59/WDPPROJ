import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const ADD_HOUSE_MUTATION = gql`
  mutation AddHouse(
    $title: String!, 
    $description: String, 
    $price: Float!, 
    $location: String!, 
    $houseType: String!, 
    $images: String
  ) {
    addHouse(
      title: $title,
      description: $description,
      price: $price,
      location: $location,
      houseType: $houseType,
      images: $images
    ) {
      id
      title
      description
      price
      location
      houseType
      images
      owner
    }
  }
`;

function AddHouse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    houseType: 'House',
    price: 0,
    location: '',
    images: ''
  });

  const [addHouse, { loading, error }] = useMutation(ADD_HOUSE_MUTATION, {
    onCompleted: (data) => {
      console.log("House added successfully:", data);
      navigate("/seller-dashboard");
    },
    onError: (error) => {
      console.error("Error adding house:", error);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHouse({
      variables: {
        title: formData.title,
        description: formData.description || "",
        price: parseFloat(formData.price),
        location: formData.location,
        houseType: formData.houseType,
        images: formData.images || ""
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Property
            </h1>
            <button
              onClick={() => navigate("/seller-dashboard")}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
              Error: {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field - Required */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="e.g., Modern Villa with Pool"
              />
            </div>

            {/* Description Field - Optional */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your property..."
              />
            </div>

            {/* House Type Field - Required */}
            <div>
              <label
                htmlFor="houseType"
                className="block text-sm font-medium text-gray-700"
              >
                Property Type *
              </label>
              <select
                id="houseType"
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
              </select>
            </div>

            {/* Price Field - Required */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                placeholder="Enter price in USD"
              />
            </div>

            {/* Location Field - Required */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="e.g., New York, NY"
              />
            </div>

            {/* Image URL Field - Optional */}
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="images"
                name="images"
                value={formData.images}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>

            {/* Preview Section */}
            {formData.images && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </p>
                <img
                  src={formData.images}
                  alt="Property preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } 
                  text-white transition-colors duration-200 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {loading ? (
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
                    Adding Property...
                  </div>
                ) : (
                  "Add Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHouse;
