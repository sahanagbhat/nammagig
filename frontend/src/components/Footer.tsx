import { Heart, Sprout } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-earth-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-6 w-6" />
              <span className="text-xl font-bold">Nomad Matcher</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting Karnataka farmers with content creators and tourists for meaningful agritourism experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Our Mission</h3>
            <p className="text-gray-300 text-sm">
              Empowering rural communities through sustainable tourism and creating opportunities for freelancers to experience farm life.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Social Impact</h3>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Supporting local farmers and rural livelihoods</span>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 Nomad Matcher. Built for Karnataka's agritourism ecosystem.</p>
        </div>
      </div>
    </footer>
  );
};
