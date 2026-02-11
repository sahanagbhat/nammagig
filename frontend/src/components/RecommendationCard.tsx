import React from 'react';
import { Star, MapPin, Check, User } from 'lucide-react';
import { API_URL } from '../services/api';

interface RecommendationCardProps {
    title: string;
    subtitle: string;
    matchScore: number;
    reason: string;
    tags?: string[];
    type: 'farm' | 'creator';
    mobile?: string;
    image?: string;
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
    image,
    onViewProfile,
}) => {
    // Ensure tags is always an array, even if a string is passed
    const safeTags = Array.isArray(tags)
        ? tags
        : (typeof tags === 'string' ? (tags as string).split(',').map(t => t.trim()) : []);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
            {/* Card Image */}
            <div className="h-48 w-full bg-gray-100 relative overflow-hidden group">
                {image ? (
                    <img
                        src={`${API_URL}${image}`}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-100 text-primary-200">
                        {type === 'farm' ? <MapPin className="w-16 h-16" /> : <User className="w-16 h-16" />}
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-primary-700 shadow-sm">
                    {matchScore}% Match
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{title}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                            {type === 'farm' ? <MapPin className="w-4 h-4 mr-1 text-earth-400" /> : <Star className="w-4 h-4 mr-1 text-yellow-400" />}
                            <span className="text-sm line-clamp-1">{subtitle}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800 italic line-clamp-3">
                        "{reason}"
                    </p>
                </div>

                {safeTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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

                <div className="mt-auto pt-4 border-t border-gray-100">
                    {mobile && (
                        <div className="text-xs text-gray-500 font-medium mb-3 flex items-center justify-end">
                            Tel: {mobile}
                        </div>
                    )}
                    <button
                        onClick={onViewProfile}
                        className="w-full btn-secondary text-sm py-2 hover:bg-gray-100 transition-colors"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};
