import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      role
      token
    }
  }
`;

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data);
      localStorage.setItem('userToken', data.login.token);
      localStorage.setItem('userRole', data.login.role);
      localStorage.setItem('userId', data.login.id);
      const userRole = data.login.role;
      if (userRole === 'Seller') {
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
    login({ variables: { ...formData } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      
      <div className="fixed inset-0 bg-black/80">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4">
          {/* Main Large Image - Spans 2 columns and full height */}
          <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700 opacity-95"
              alt="House 1"
            />
          </div>
          {/* Right Column Images */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80" 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700 opacity-95"
              alt="House 2"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80" 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700 opacity-95"
              alt="House 3"
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-black/20 backdrop-blur-[0.5px]"></div>
        </div>
      </div>

      {/* Form content */}
      <div className="relative z-40 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Login</h1>
            <p className="text-gray-200 mt-2 drop-shadow-md">Welcome back! Please login to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
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

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold 
                       hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                       duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          <p className="text-center text-gray-200">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;