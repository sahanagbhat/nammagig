import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  color?: string;
}

export const RoleCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  color = 'primary'
}: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer transform hover:scale-105 transition-all duration-300 group"
    >
      <div className={`flex justify-center mb-4`}>
        <div className={`p-4 bg-${color}-100 rounded-full group-hover:bg-${color}-200 transition-colors`}>
          <Icon className={`h-12 w-12 text-${color}-600`} />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center leading-relaxed">
        {description}
      </p>
      
      <button className="btn-primary w-full mt-6">
        Select
      </button>
    </div>
  );
};
