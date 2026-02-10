import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Camera, MapPin, ArrowRight } from 'lucide-react';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { useAuth } from '../hooks/useAuth';

export const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI Matches Creators with Farm Workations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Freelance shoots + tourist experiences = rural jobs
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-green-100">
              Connect Karnataka farmers with content creators and tourists for unique agritourism experiences that empower rural communities.
            </p>
            
            <button
              onClick={() => setShowLogin(true)}
              className="btn-primary text-lg px-8 py-4 bg-white text-primary-700 hover:bg-gray-100 inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Sign in to Continue
            </h2>
            <GoogleLoginButton />
            <button
              onClick={() => setShowLogin(false)}
              className="mt-6 w-full text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* User Types Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Who Are You?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Farmer Card */}
          <div
            onClick={() => navigate('/register/farmer')}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate('/register/farmer') : null)}
            role="button"
            tabIndex={0}
            className="card text-center group hover:border-2 hover:border-primary-500 cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                <Tractor className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Farmer</h3>
            <p className="text-gray-600 mb-4">
              List your farm for content shoots and tourist experiences. Earn extra income while showcasing Karnataka's agricultural beauty.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>✓ Host content creators</li>
              <li>✓ Offer farm tours</li>
              <li>✓ Share your expertise</li>
              <li>✓ Generate additional income</li>
            </ul>
          </div>

          {/* Content Creator Card */}
          <div
            onClick={() => navigate('/register/creator')}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate('/register/creator') : null)}
            role="button"
            tabIndex={0}
            className="card text-center group hover:border-2 hover:border-primary-500 cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <Camera className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Content Creator</h3>
            <p className="text-gray-600 mb-4">
              Find unique farm locations for your content. Work remotely while experiencing authentic rural Karnataka life.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>✓ Unique shooting locations</li>
              <li>✓ Remote workation spaces</li>
              <li>✓ Authentic farm experiences</li>
              <li>✓ Build your portfolio</li>
            </ul>
          </div>

          {/* Tourist Card */}
          <div
            onClick={() => navigate('/register/tourist')}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate('/register/tourist') : null)}
            role="button"
            tabIndex={0}
            className="card text-center group hover:border-2 hover:border-primary-500 cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                <MapPin className="h-16 w-16 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Tourist</h3>
            <p className="text-gray-600 mb-4">
              Experience authentic agritourism in Karnataka. Participate in farm activities and support local communities.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>✓ Farm stays & tours</li>
              <li>✓ Cultural immersion</li>
              <li>✓ Support local farmers</li>
              <li>✓ Unique experiences</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your profile as a farmer, creator, or tourist using Google sign-in.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our AI algorithm matches you with perfect opportunities based on your preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Collaborate</h3>
              <p className="text-gray-600">
                Book experiences, create content, and build meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
