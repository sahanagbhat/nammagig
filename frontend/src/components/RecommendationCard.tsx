import React from 'react';
import { Star, MapPin, Check } from 'lucide-react';

interface RecommendationCardProps {
    title: string;
    subtitle: string;
    matchScore: number;
    reason: string;
    tags?: string[];
    type: 'farm' | 'creator';
    mobile?: string;
    onViewProfile?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
    title,
    subtitle,
    matchScore,
    reason,
    tags = [],
    type,
    mobile,
    onViewProfile,
}) => {
    // Ensure tags is always an array, even if a string is passed
    const safeTags = Array.isArray(tags)
        ? tags
        : (typeof tags === 'string' ? (tags as string).split(',').map(t => t.trim()) : []);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                            {type === 'farm' ? <MapPin className="w-4 h-4 mr-1" /> : <Star className="w-4 h-4 mr-1" />}
                            <span className="text-sm">{subtitle}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${matchScore > 80 ? 'bg-green-100 text-green-700' :
                            matchScore > 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                            {matchScore}% Match
                        </div>
                        {mobile && (
                            <div className="text-xs text-gray-500 mt-1">Tel: {mobile}</div>
                        )}
                    </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800 italic">
                        "{reason}"
                    </p>
                </div>

                {safeTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {safeTags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                            >
                                <Check className="w-3 h-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                        {safeTags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500">
                                +{safeTags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <button
                    onClick={onViewProfile}
                    className="w-full mt-4 btn-secondary text-sm py-2 hover:bg-gray-100 transition-colors"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};
