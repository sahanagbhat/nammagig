import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Camera, MapPin, Search, Sparkles } from 'lucide-react';
import { RoleCard } from '../components/RoleCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProfileDetailsModal } from '../components/ProfileDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { matchAPI } from '../services/api';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Initialize activeTab based on user role, default to 'tourist' if no role
  const [activeTab, setActiveTab] = useState<'farmer' | 'creator' | 'tourist'>('tourist');

  // Sync activeTab with user role whenever user object updates
  // Sync activeTab with user role whenever user object updates
  useEffect(() => {
    if (user?.role) {
      setActiveTab(user.role as 'farmer' | 'creator' | 'tourist');

      // Auto-search based on role
      if (user.role === 'farmer') {
        searchForCreators();
      } else if (user.role === 'creator') {
        searchForFarms();
      } else if (user.role === 'tourist') {
        searchForTrip();
      }
    }
  }, [user]);

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]); // For tourist view (farms + creators)
  const [loading, setLoading] = useState(false);

  // Search States
  const [farmerSearch, setFarmerSearch] = useState({ needs: 'drone video for harvesting', duration: 2 });
  const [creatorSearch, setCreatorSearch] = useState({ skills: 'photography videography', duration: 2 });
  const [touristSearch, setTouristSearch] = useState({
    activities: 'Farm Stay, Photography',
    expectations: 'I want to experience village life and take photos',
    durationDays: 3
  });

  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const handleBookProfile = () => {
    toast.success('Booking request sent! They will contact you shortly.');
    setSelectedProfile(null);
  };

  const handleRoleSelection = (role: string) => {
    navigate(`/register/${role}`);
  };

  const searchForCreators = async () => {
    setLoading(true);
    try {
      const res = await matchAPI.getFarmMatches(farmerSearch);
      setRecommendations(res.matches || []);
    } catch (err) {
      toast.error('Failed to find matches');
    } finally {
      setLoading(false);
    }
  };

  const searchForFarms = async () => {
    setLoading(true);
    try {
      const res = await matchAPI.getCreatorMatches(creatorSearch);
      setRecommendations(res.matches || []);
    } catch (err) {
      toast.error('Failed to find matches');
    } finally {
      setLoading(false);
    }
  };

  const searchForTrip = async () => {
    setLoading(true);
    try {
      const payload = {
        ...touristSearch,
        activities: touristSearch.activities.split(',').map(s => s.trim())
      };
      const res = await matchAPI.getTouristMatches(payload);
      setRecommendations(res.recommended_farms || []);
      setCreators(res.recommended_creators || []);
    } catch (err) {
      toast.error('Failed to find matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-earth-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-2xl font-bold text-primary-800 flex items-center gap-2">
          <span className="bg-primary-100 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-primary-600" /></span>
          NammaGig
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-earth-700 font-medium hidden md:block">Hello, {user.name}</span>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
              {user?.role ? `Dashboard - ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} View` : 'Welcome to NammaGig'}
            </h1>
            <p className="text-earth-600 text-lg">
              {user?.role
                ? `Manage your activities and find the best matches for your needs.`
                : 'Explore our AI-powered matchmaking to find your perfect connection.'}
            </p>
          </div>

          {/* AI Matcher Section - ONLY for registered users */}
          {user?.role && (
            <div className="mb-12">
              {/* Search Control Bar */}
              <div className="bg-white rounded-2xl shadow-lg border border-earth-100 overflow-hidden mb-10">
                <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary-700" />
                  <h2 className="font-semibold text-primary-900">Find Opportunities</h2>
                </div>

                <div className="p-6">
                  {activeTab === 'farmer' && (
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-earth-700 mb-1 ml-1">What service do you need?</label>
                        <input
                          type="text"
                          value={farmerSearch.needs}
                          onChange={(e) => setFarmerSearch({ ...farmerSearch, needs: e.target.value })}
                          className="input-field bg-surface-50"
                          placeholder="e.g. Drone video, Harvest help..."
                        />
                      </div>
                      <button onClick={searchForCreators} disabled={loading} className="btn-primary w-full md:w-auto h-[50px] flex items-center justify-center bg-primary-700 hover:bg-primary-800 shadow-md transform hover:-translate-y-0.5 transition-all">
                        {loading ? 'Searching...' : 'Find Creators'}
                      </button>
                    </div>
                  )}

                  {activeTab === 'creator' && (
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-earth-700 mb-1 ml-1">Your Skills</label>
                        <input
                          type="text"
                          value={creatorSearch.skills}
                          onChange={(e) => setCreatorSearch({ ...creatorSearch, skills: e.target.value })}
                          className="input-field bg-surface-50"
                          placeholder="e.g. Photography, Videography..."
                        />
                      </div>
                      <button onClick={searchForFarms} disabled={loading} className="btn-primary w-full md:w-auto h-[50px] bg-blue-600 hover:bg-blue-700">
                        {loading ? 'Searching...' : 'Find Locations'}
                      </button>
                    </div>
                  )}

                  {activeTab === 'tourist' && (
                    <div className="grid md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-earth-700 mb-1 ml-1">Interests</label>
                        <input
                          type="text"
                          value={touristSearch.activities}
                          onChange={(e) => setTouristSearch({ ...touristSearch, activities: e.target.value })}
                          className="input-field bg-surface-50"
                          placeholder="Activities (e.g. Yoga, Farm Stay)"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-earth-700 mb-1 ml-1">Expectations</label>
                        <input
                          type="text"
                          value={touristSearch.expectations}
                          onChange={(e) => setTouristSearch({ ...touristSearch, expectations: e.target.value })}
                          className="input-field bg-surface-50"
                          placeholder="e.g. Relaxing, Quiet"
                        />
                      </div>
                      <button onClick={searchForTrip} disabled={loading} className="btn-primary w-full h-[50px] bg-orange-600 hover:bg-orange-700 shadow-orange-200">
                        {loading ? 'Planning...' : 'Plan Trip'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Area */}
              {recommendations.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-primary-900 border-l-4 border-accent-500 pl-3">
                      {activeTab === 'farmer' ? 'Recommended Creators' : 'Top Matches'}
                    </h3>
                    <span className="text-sm text-earth-500">{recommendations.length} results found</span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((item, idx) => (
                      <RecommendationCard
                        key={idx}
                        title={item.name || item.creator_name || item.farm_title}
                        subtitle={activeTab === 'farmer' ? 'Content Creator' : (item.location || item.type || 'Farm')}
                        matchScore={item.match_score}
                        reason={item.reason}
                        tags={item.skills || item.activities}
                        type={activeTab === 'farmer' ? 'creator' : 'farm'}
                        mobile={item.mobile}
                        onViewProfile={() => setSelectedProfile(item)}
                      />
                    ))}
                  </div>

                  {/* Return Key Correction */}
                  {/* Special section for Tourist who gets both farms and creators */}
                  {activeTab === 'tourist' && creators.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold text-primary-900 mb-6 border-l-4 border-blue-500 pl-3">Recommended Creators (for your shoot)</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {creators.map((item, idx) => (
                          <RecommendationCard
                            key={idx}
                            title={item.name}
                            subtitle="Content Creator"
                            matchScore={item.match_score}
                            reason={item.reason}
                            tags={item.skills}
                            type="creator"
                            mobile={item.mobile}
                            onViewProfile={() => setSelectedProfile(item)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!loading && recommendations.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-earth-300">
                  <div className="bg-earth-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-earth-400" />
                  </div>
                  <p className="text-earth-500 text-lg">Adjust filters or click 'Find' to see your personal recommendations.</p>
                </div>
              )}
            </div>
          )}

          {/* Role Selection Section - ONLY for new users (no role) */}
          {!user?.role && (
            <div className="py-12 animate-fade-in-up">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-primary-900 mb-4">Join the Community</h3>
                <p className="text-earth-600 max-w-2xl mx-auto text-lg">
                  To get started, please select your role. You'll be asked to complete a quick profile so our AI can find the best matches for you.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <RoleCard
                  icon={Tractor}
                  title="Register as Farmer"
                  description="List your farm."
                  onClick={() => handleRoleSelection('farmer')}
                  color="green"
                />
                <RoleCard
                  icon={Camera}
                  title="Register as Creator"
                  description="Find unique locations."
                  onClick={() => handleRoleSelection('creator')}
                  color="blue"
                />
                <RoleCard
                  icon={MapPin}
                  title="Register as Tourist"
                  description="Experience agritourism."
                  onClick={() => handleRoleSelection('tourist')}
                  color="orange"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ProfileDetailsModal
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        onBook={handleBookProfile}
      />
    </div>
  );
};
