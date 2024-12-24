import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
function LandingPage() {
const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="fixed inset-0 bg-black/80">
        <div className="absolute inset-0 overflow-hidden">
          {/* Single Full Cover Background Image with Transparency */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80" 
              className="w-full h-full object-cover opacity-90 transform scale-105 transition-transform duration-1000"
              alt="Background House"
            />
          </div>
          {/* Additional overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
      </div>

      {/* Content remains the same */}
      <div className="relative z-40 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Welcome to Our Platform
            </h1>
            <p className="text-gray-200 text-lg drop-shadow-md">
              Discover amazing products and connect with sellers worldwide. 
              Join our community today and start your journey!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-blue-500/90 text-white rounded-lg font-semibold 
                       hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all 
                       duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-emerald-500/90 text-white rounded-lg font-semibold 
                       hover:bg-emerald-600 transform hover:-translate-y-0.5 transition-all 
                       duration-200 shadow-md hover:shadow-lg drop-shadow-md"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Transparent About Button */}
      <button
        onClick={() => navigate('/about')}
        className="absolute top-9 right-4 transform -translate-y-1/2 px-4 py-2 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 z-[999]"
      >
        About
      </button>
    </div>
  );
}

export default LandingPage;