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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="fixed inset-0 bg-black/80">
        <div className="absolute inset-0">
          {/* Floating Images with Random Positioning */}
          <div className="absolute h-[58vh] w-[32vw] left-[10vw] top-[10vh] z-20 shadow-2xl overflow-hidden rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 1"
            />
          </div>
          <div className="absolute h-[45vh] w-[28vw] right-[8vw] top-[15vh] z-10 shadow-2xl overflow-hidden -rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 2"
            />
          </div>
          <div className="absolute h-[50vh] w-[30vw] right-[12vw] bottom-[12vh] z-30 shadow-2xl overflow-hidden rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 3"
            />
          </div>
          <div className="absolute h-[42vh] w-[26vw] left-[15vw] bottom-[8vh] z-15 shadow-2xl overflow-hidden -rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80" 
              className="w-full h-full object-cover"
              alt="House 4"
            />
          </div>
        </div>
      </div>

      {/* Original Form Content with z-index to appear above background */}
      <div className="relative z-40 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 max-w-7xl mx-auto">
          <div className="relative px-4 py-10 bg-black/50 backdrop-blur-xl mx-8 md:mx-0 shadow-2xl rounded-3xl sm:p-10">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
              <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-100 to-purple-100 opacity-20" />
            </div>

            <div className="rounded-2xl p-8">
              {/* Header Section */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                    Add New Property
                  </h1>
                  <p className="mt-2 text-gray-200 drop-shadow-md">Fill in the details of your property listing</p>
                </div>
                <button
                  onClick={() => navigate("/seller-dashboard")}
                  className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 
                           transform hover:-translate-y-1 hover:shadow-lg 
                           transition-all duration-300 active:translate-y-0 
                           shadow-md relative overflow-hidden
                           before:absolute before:inset-0 before:bg-red-600 
                           before:translate-y-full hover:before:translate-y-0 
                           before:transition-transform before:duration-300 
                           before:rounded-full"
                  title="Back to Dashboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
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
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Title Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-200 drop-shadow-sm mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 
                                 rounded-lg shadow-sm focus:outline-none focus:ring-2 
                                 focus:ring-white focus:border-transparent text-white 
                                 placeholder-gray-400 focus:bg-white focus:text-gray-900 
                                 focus:placeholder-gray-500 transition-all duration-300"
                        required
                        placeholder="e.g., Modern Villa with Pool"
                      />
                    </div>

                    {/* Price Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-200 drop-shadow-sm mb-2">
                        Price ($) *
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          onFocus={handlePriceFieldFocus}
                          onBlur={handlePriceFieldBlur}
                          className="block w-full pl-8 px-4 py-3 bg-white/10 border border-white/20 
                                   rounded-lg shadow-sm focus:outline-none focus:ring-2 
                                   focus:ring-white focus:border-transparent text-white 
                                   placeholder-gray-400 focus:bg-white focus:text-gray-900 
                                   focus:placeholder-gray-500 transition-all duration-300"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Location Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-200 drop-shadow-sm mb-2">
                        Location *
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="block w-full pl-11 px-4 py-3 bg-white/10 border border-white/20 
                                   rounded-lg shadow-sm focus:outline-none focus:ring-2 
                                   focus:ring-white focus:border-transparent text-white 
                                   placeholder-gray-400 focus:bg-white focus:text-gray-900 
                                   focus:placeholder-gray-500 transition-all duration-300"
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
                      <label className="block text-sm font-medium text-gray-200 drop-shadow-sm mb-2">
                        Property Type *
                      </label>
                      <select
                        name="houseType"
                        value={formData.houseType}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 
                                 rounded-lg shadow-sm focus:outline-none focus:ring-2 
                                 focus:ring-white focus:border-transparent text-white 
                                 placeholder-gray-400 focus:bg-white focus:text-gray-900 
                                 transition-all duration-300"
                        required
                      >
                        <option value="House" className="bg-gray-600 text-white">House</option>
                        <option value="Apartment" className="bg-gray-600 text-white">Apartment</option>
                        <option value="Villa" className="bg-gray-600 text-white">Villa</option>
                        <option value="Condo" className="bg-gray-600 text-white">Condo</option>
                      </select>
                    </div>

                    {/* Description Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-200 drop-shadow-sm mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 
                                 rounded-lg shadow-sm focus:outline-none focus:ring-2 
                                 focus:ring-white focus:border-transparent text-white 
                                 placeholder-gray-400 focus:bg-white focus:text-gray-900 
                                 focus:placeholder-gray-500 transition-all duration-300"
                        placeholder="Describe your property..."
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Photo Section - Full Width */}
                <div className="col-span-2 mt-6">
                  <div className="w-full p-6 bg-white/5 rounded-xl border-2 border-dashed border-white/20 hover:border-blue-500/50">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4 flex text-sm justify-center">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="images"
                            onChange={handleChange}
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1 text-gray-300">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Image Preview - Full Width */}
                {imagePreview && (
                  <div className="col-span-2 mt-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <img
                        src={imagePreview}
                        alt="Property preview"
                        className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({...formData, images: null});
                        }}
                        className="absolute top-2 right-2 bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button - Full Width */}
                <div className="col-span-2 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-4 rounded-lg font-medium ${loading ? "bg-gray-600" : "bg-blue-500/90 hover:bg-blue-600"} text-white transition-all duration-300`}
                  >
                    {loading ? "Adding Property..." : "Add Property"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHouse;
