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
    price: '0',
    location: '',
    images: null
  });

  const [imagePreview, setImagePreview] = useState(null);

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
    if (e.target.name === 'images') {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          images: file
        });
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePriceFieldFocus = (e) => {
    if (e.target.value === '0') {
      setFormData({
        ...formData,
        price: ''
      });
    }
  };

  const handlePriceFieldBlur = (e) => {
    if (e.target.value === '') {
      setFormData({
        ...formData,
        price: '0'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert image to base64 before sending
    const reader = new FileReader();
    reader.onloadend = () => {
      addHouse({
        variables: {
          title: formData.title,
          description: formData.description || "",
          price: parseFloat(formData.price || 0),
          location: formData.location,
          houseType: formData.houseType,
          images: reader.result || ""
        },
      });
    };
    
    if (formData.images) {
      reader.readAsDataURL(formData.images);
    } else {
      // If no image, submit without image
      addHouse({
        variables: {
          title: formData.title,
          description: formData.description || "",
          price: parseFloat(formData.price || 0),
          location: formData.location,
          houseType: formData.houseType,
          images: ""
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-100 to-purple-100 opacity-20" />
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Add New Property
              </h1>
              <p className="mt-2 text-gray-600">Fill in the details of your property listing</p>
            </div>
            <button
              onClick={() => navigate("/seller-dashboard")}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-all duration-300 hover:-translate-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-lg flex items-center gap-2 animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title Field */}
                <div className="group">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                    required
                    placeholder="e.g., Modern Villa with Pool"
                  />
                </div>

                {/* Price Field */}
                <div className="group">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Price ($) *
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      onFocus={handlePriceFieldFocus}
                      onBlur={handlePriceFieldBlur}
                      className="block w-full pl-7 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Location Field */}
                <div className="group">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Location *
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                      required
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* House Type Field */}
                <div className="group">
                  <label htmlFor="houseType" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Property Type *
                  </label>
                  <select
                    id="houseType"
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                    required
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Condo">Condo</option>
                  </select>
                </div>

                {/* Description Field */}
                <div className="group">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                    placeholder="Describe your property..."
                  />
                </div>

                {/* Image Upload Field */}
                <div className="group">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Property Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-all duration-300">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <p className="text-xs text-amber-600 font-medium mt-2">
                        ⚠️ For better performance, please use images less than 100KB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-6 animate-fadeIn">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={imagePreview}
                    alt="Property preview"
                    className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300
                  ${loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5"
                  } 
                  text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
