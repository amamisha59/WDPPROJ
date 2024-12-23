import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="fixed inset-0 bg-black/80">
        <div className="absolute inset-0">
          {/* Floating Images with Random Positioning */}
          <div className="absolute h-[70vh] w-[32vw] left-[8vw] top-[5vh] z-20 shadow-2xl overflow-hidden rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 1"
            />
          </div>
          <div className="absolute h-[45vh] w-[28vw] right-[12vw] top-[12vh] z-10 shadow-2xl overflow-hidden -rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80" 
              className="w-full h-full object-cover"
              alt="House 2"
            />
          </div>
          <div className="absolute h-[55vh] w-[30vw] right-[5vw] bottom-[8vh] z-30 shadow-2xl overflow-hidden rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              className="w-full h-full object-cover"
              alt="House 3"
            />
          </div>
          <div className="absolute h-[42vh] w-[25vw] left-[15vw] bottom-[10vh] z-15 shadow-2xl overflow-hidden -rotate-4">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80" 
              className="w-full h-full object-cover"
              alt="House 4"
            />
          </div>
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
    </div>
  );
}

export default LandingPage;