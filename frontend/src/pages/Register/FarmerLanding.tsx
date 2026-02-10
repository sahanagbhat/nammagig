import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

export const FarmerLanding = () => {
  const navigate = useNavigate();

  const scrollToContent = () => {
    const element = document.getElementById('statistics-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Dark Green Background */}
      <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 text-white overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Decorative Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '120px' }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.87,168.19-17.54,250.45-.39C823.78,31,906.4,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#f3f4f6"
          />
        </svg>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            List Your Farm
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-300">
            Welcome Farmers
          </h2>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 leading-relaxed">
            Earn additional income by hosting content creators and tourists. Showcase your farm, grow your business and connect with visitors seeking authentic rural experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/register/farmer/register')}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Register as Farmer
            </button>

            <button
              onClick={scrollToContent}
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 mx-auto" />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div id="statistics-section" className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-900">
            Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="p-8 bg-yellow-400 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">2003</h3>
              <p className="text-gray-800 font-semibold text-lg">Year of Survey</p>
            </div>

            <div className="p-8 bg-emerald-500 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-white mb-2">2005</h3>
              <p className="text-white font-semibold text-lg">Year of Establishment</p>
            </div>

            <div className="p-8 bg-yellow-400 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-800 font-semibold text-lg">Awards Won</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-yellow-400 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">1,000+</h3>
              <p className="text-gray-800 font-semibold text-lg">No of Registered ATC</p>
            </div>

            <div className="p-8 bg-emerald-500 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-white mb-2">80 lacs+</h3>
              <p className="text-white font-semibold text-lg">No. of Tourists</p>
            </div>

            <div className="p-8 bg-yellow-400 rounded-3xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">200%</h3>
              <p className="text-gray-800 font-semibold text-lg">Incremental Profit Impact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-900">
            Why List Your Farm?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-green-50 rounded-2xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-4">✓ Host Content Creators</h3>
              <p className="text-gray-700">
                Partner with influencers and content creators for photoshoots and content production.
              </p>
            </div>

            <div className="p-8 bg-green-50 rounded-2xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-4">✓ Offer Farm Tours</h3>
              <p className="text-gray-700">
                Provide immersive experiences and farm tours to tourists seeking authentic rural life.
              </p>
            </div>

            <div className="p-8 bg-green-50 rounded-2xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-4">✓ Generate Income</h3>
              <p className="text-gray-700">
                Earn additional revenue streams while showcasing and promoting your farm.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/register/farmer/register')}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Register Your Farm Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
