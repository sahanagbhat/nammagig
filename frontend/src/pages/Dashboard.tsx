import { useNavigate } from 'react-router-dom';
import { Tractor, Camera, MapPin } from 'lucide-react';
import { RoleCard } from '../components/RoleCard';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRoleSelection = (role: string) => {
    navigate(`/register/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-xl text-gray-600">
              Choose your role to get started with Nomad Matcher
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard
              icon={Tractor}
              title="Farmer"
              description="List your farm for content shoots and tourist experiences. Earn extra income while showcasing your agricultural heritage."
              onClick={() => handleRoleSelection('farmer')}
              color="green"
            />

            <RoleCard
              icon={Camera}
              title="Content Creator"
              description="Find unique farm locations for shoots. Work remotely while experiencing authentic rural life."
              onClick={() => handleRoleSelection('creator')}
              color="blue"
            />

            <RoleCard
              icon={MapPin}
              title="Tourist"
              description="Experience authentic agritourism. Participate in farm activities and support local communities."
              onClick={() => handleRoleSelection('tourist')}
              color="orange"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Not sure which role fits you? You can always come back and change it later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
