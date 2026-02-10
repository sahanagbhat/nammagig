import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Camera, MapPin, ArrowRight } from 'lucide-react';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'tourist' | 'farmer' | 'creator'>('tourist');

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile-setup');
    }
  }, [isAuthenticated, navigate]);

  const handleEmailLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    // Mock login logic for demo
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      email: email,
      name: email.split('@')[0], // Use part of email as name
      role: 'tourist' as const, // Default to tourist for login if unknown
      profileComplete: true,
    };
    login('mock-jwt-token', mockUser);
    setShowLogin(false); // Explicitly close modal
    toast.success("Welcome back!");
    navigate('/profile-setup');
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    const newUser = {
      id: 'new-user-' + Date.now(),
      email: email,
      name: name,
      role: selectedRole,
      profileComplete: true,
    };

    login('mock-jwt-token', newUser);
    setShowLogin(false); // Explicitly close modal
    toast.success(`Account created! Welcome, ${name}.`);
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2540&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto glass-dark rounded-3xl p-8 md:p-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
              Discover Rural Karnataka
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-earth-100 font-light max-w-2xl mx-auto drop-shadow-sm">
              Connecting content creators and tourists with authentic farm experiences.
            </p>
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-2 bg-white text-primary-900 hover:bg-earth-100 border-none shadow-2xl transform hover:scale-105 transition-transform"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all scale-100">
            {/* Header / Tabs */}
            <div className="flex border-b border-earth-100">
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${authTab === 'login' ? 'text-primary-900 border-b-2 border-primary-600 bg-white' : 'text-earth-500 hover:text-primary-900 bg-surface-50'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${authTab === 'register' ? 'text-primary-900 border-b-2 border-primary-600 bg-white' : 'text-earth-500 hover:text-primary-900 bg-surface-50'}`}
              >
                Register
              </button>
            </div>

            <div className="p-8">
              {/* Branding */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-2">Gig-Economy Nomad Matcher</h2>
                <p className="text-xs text-earth-500 uppercase tracking-wider">Work • Stay • Create in Rural Karnataka</p>
              </div>

              {authTab === 'login' ? (
                <>
                  {/* Welcome Text */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900">Welcome Back</h3>
                    <p className="text-earth-600 text-sm">Sign in to continue your workation journey.</p>
                  </div>

                  {/* Login Form */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={handleEmailLogin}
                      className="w-full btn-primary bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-3 font-semibold shadow-none"
                    >
                      Login with Email
                    </button>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-earth-200"></div>
                      <span className="flex-shrink-0 mx-4 text-earth-400 text-sm">or</span>
                      <div className="flex-grow border-t border-earth-200"></div>
                    </div>

                    <div className="flex justify-center">
                      <GoogleLoginButton />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Register Text */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Create Account</h3>
                    <p className="text-earth-600 text-sm">Join the community today.</p>
                  </div>

                  {/* Register Form */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* Role Selection */}
                    <div className="grid grid-cols-3 gap-2">
                      {['tourist', 'farmer', 'creator'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          className={`text-xs py-2 px-1 border rounded-lg capitalize transition-colors ${selectedRole === role ? 'bg-primary-600 text-white border-primary-600' : 'hover:bg-earth-50 border-earth-200 text-earth-700'}`}
                          onClick={() => setSelectedRole(role as any)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full btn-primary bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-3 font-semibold shadow-none"
                    >
                      Create Account
                    </button>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-earth-200"></div>
                      <span className="flex-shrink-0 mx-4 text-earth-400 text-sm">or</span>
                      <div className="flex-grow border-t border-earth-200"></div>
                    </div>

                    <div className="flex justify-center">
                      <GoogleLoginButton />
                    </div>
                  </div>
                </>
              )}

              {/* Footer links */}
              <div className="mt-8 text-center text-xs text-earth-400">
                By continuing, you agree to our <a href="#" className="underline hover:text-earth-600">Terms of Service</a> and <a href="#" className="underline hover:text-earth-600">Privacy Policy</a>.
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="mt-4 w-full text-center text-sm text-earth-500 hover:text-earth-800 p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Types Section */}
      <div className="bg-surface-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Join the Ecosystem
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">Choose your role to get started.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Farmer Card */}
            <div
              onClick={() => navigate('/register/farmer')}
              className="card group cursor-pointer text-center relative overflow-hidden border-t-4 border-t-primary-600 hover:border-t-primary-800"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                  <Tractor className="h-12 w-12 text-primary-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-900">Farmer</h3>
              <p className="text-earth-600 mb-6 leading-relaxed">
                List your farm for content shoots and tourist experiences. Earn extra income.
              </p>
              <span className="text-primary-700 font-semibold group-hover:underline flex items-center justify-center gap-2">
                Join as Farmer <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Content Creator Card */}
            <div
              onClick={() => navigate('/register/creator')}
              className="card group cursor-pointer text-center relative overflow-hidden border-t-4 border-t-earth-400 hover:border-t-earth-600"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-earth-50 rounded-2xl group-hover:bg-earth-100 transition-colors">
                  <Camera className="h-12 w-12 text-earth-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-900">Creator</h3>
              <p className="text-earth-600 mb-6 leading-relaxed">
                Find unique farm locations for your content styling and portfolios.
              </p>
              <span className="text-earth-700 font-semibold group-hover:underline flex items-center justify-center gap-2">
                Join as Creator <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tourist Card */}
            <div
              onClick={() => navigate('/register/tourist')}
              className="card group cursor-pointer text-center relative overflow-hidden border-t-4 border-t-primary-600 hover:border-t-primary-800"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                  <MapPin className="h-12 w-12 text-primary-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-900">Tourist</h3>
              <p className="text-earth-600 mb-6 leading-relaxed">
                Experience authentic agritourism. Stay, tour, and support local communities.
              </p>
              <span className="text-primary-700 font-semibold group-hover:underline flex items-center justify-center gap-2">
                Join as Tourist <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 border-t border-earth-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center relative">
              <div className="bg-primary-100 text-primary-800 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm rotate-3 hover:rotate-6 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Sign Up</h3>
              <p className="text-earth-600 leading-relaxed">
                Create your profile as a farmer, creator, or tourist using Google sign-in.
              </p>
            </div>

            <div className="text-center relative">
              <div className="bg-primary-100 text-primary-800 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm -rotate-3 hover:-rotate-6 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Get Matched</h3>
              <p className="text-earth-600 leading-relaxed">
                Our AI algorithm finds the perfect opportunities based on your preferences.
              </p>
            </div>

            <div className="text-center relative">
              <div className="bg-primary-100 text-primary-800 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm rotate-3 hover:rotate-6 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Connect</h3>
              <p className="text-earth-600 leading-relaxed">
                Book experiences, create content, and build meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
