//import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
      token
    }
  }
`;

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Buyer'
  });

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      console.log('Registration successful:', data);
      // Store token in localStorage
      localStorage.setItem('userToken', data.register.token);
      // Store user role for easy access
      localStorage.setItem('userRole', data.register.role);
      localStorage.setItem('userId', data.register.id);
      if (data.register.role === 'Seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { ...formData } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="fixed inset-0 bg-black/80">
        <div className="absolute inset-0">
          {/* Floating Images with Random Positioning */}
          <div className="absolute h-[60vh] w-[35vw] left-[12vw] top-[8vh] z-20 shadow-2xl overflow-hidden rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80" 
              className="w-full h-full object-cover"
              alt="House 1"
            />
          </div>
          <div className="absolute h-[48vh] w-[28vw] right-[15vw] top-[15vh] z-10 shadow-2xl overflow-hidden -rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 2"
            />
          </div>
          <div className="absolute h-[52vh] w-[32vw] right-[8vw] bottom-[12vh] z-30 shadow-2xl overflow-hidden rotate-4">
            <img 
              src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 3"
            />
          </div>
          <div className="absolute h-[45vh] w-[26vw] left-[18vw] bottom-[15vh] z-15 shadow-2xl overflow-hidden -rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 4"
            />
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="relative z-40 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Register</h1>
            <p className="text-gray-200 mt-2 drop-shadow-md">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 drop-shadow-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 drop-shadow-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 drop-shadow-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-200 drop-shadow-sm">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              >
                <option value="Buyer" className="bg-gray-800">Buyer</option>
                <option value="Seller" className="bg-gray-800">Seller</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500/90 text-white rounded-lg font-semibold 
                       hover:bg-emerald-600 transform hover:-translate-y-0.5 transition-all 
                       duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Register
            </button>
          </form>

          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-400">Error: {error.message}</p>}

          <p className="text-center text-gray-200">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;