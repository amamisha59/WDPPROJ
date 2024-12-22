import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Our Platform
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products and connect with sellers worldwide. 
            Join our community today and start your journey!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold 
                     hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                     duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-semibold 
                     hover:bg-emerald-600 transform hover:-translate-y-0.5 transition-all 
                     duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;