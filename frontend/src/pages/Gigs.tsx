import { useEffect, useState } from 'react';
import { Sparkles, MapPin, Calendar, Users } from 'lucide-react';
import { gigsAPI } from '../services/api';

export const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGigs();
  }, []);

  const loadGigs = async () => {
    try {
      // This will fail until backend is implemented, but that's okay for demo
      const data = await gigsAPI.getGigs();
      setGigs(data);
    } catch (error) {
      console.error('Error loading gigs:', error);
      // Set mock data for demo
      setGigs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">
                AI-Matched Opportunities
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Perfect matches based on your profile and preferences
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="h-24 w-24 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Perfect Matches Are Coming Soon!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI is analyzing your profile and finding the best opportunities for you. 
                You'll receive email notifications when matches are available.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-green-50 rounded-lg">
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Location-Based</h3>
                  <p className="text-sm text-gray-600">
                    Matches based on your preferred locations in Karnataka
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Date Matching</h3>
                  <p className="text-sm text-gray-600">
                    Opportunities that fit your availability
                  </p>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg">
                  <Users className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Interest Alignment</h3>
                  <p className="text-sm text-gray-600">
                    Connecting people with shared interests
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-gray-700 mb-4">
                  In the meantime, you can:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
                  <li>✓ Complete your profile with more details</li>
                  <li>✓ Upload high-quality photos</li>
                  <li>✓ Invite others to join the platform</li>
                  <li>✓ Explore Karnataka's agritourism destinations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Gig Cards (for demonstration) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Example Opportunities
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Example Gig 1 */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Organic Coffee Farm Tour</h3>
                    <p className="text-sm text-gray-600">Coorg, Karnataka</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Farm Tour
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Experience authentic coffee cultivation and processing. Perfect for content creators 
                  looking for unique footage and tourists wanting hands-on experience.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Flexible dates</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>2-8 people</span>
                  </div>
                </div>
              </div>

              {/* Example Gig 2 */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Spice Plantation Content Shoot</h3>
                    <p className="text-sm text-gray-600">Chikmagalur, Karnataka</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Content Shoot
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  Stunning spice plantation perfect for photography and videography. 
                  Farm stay available for multi-day shoots.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>March-November</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>1-4 people</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
