import { X, Calendar, MapPin, Star, User, Phone, CheckCircle, Instagram, Youtube } from 'lucide-react';
import { API_URL } from '../services/api';

interface ProfileDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: any;
    onBook: () => void;
}

export const ProfileDetailsModal = ({ isOpen, onClose, profile, onBook }: ProfileDetailsModalProps) => {
    if (!isOpen || !profile) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-earth-100 transition-colors z-10"
                >
                    <X className="w-6 h-6 text-earth-600" />
                </button>

                {/* Header Image / Pattern */}
                <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                </div>

                <div className="px-8 pb-8 -mt-12 relative">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg overflow-hidden">
                            {profile.image ? (
                                <img
                                    src={`${API_URL}${profile.image}`}
                                    alt={profile.name || "Profile"}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full bg-surface-100 rounded-xl flex items-center justify-center">
                                    <User className="w-12 h-12 text-primary-300" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 pt-14 md:pt-14"> {/* Adjusted padding */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-primary-900 mb-1">
                                        {profile.name || profile.creator_name || profile.farm_title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-earth-600 text-sm">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {profile.location || profile.farmLocation || "Karnataka, India"}
                                        </span>
                                        {(profile.type || profile.farmType) && (
                                            <span className="flex items-center gap-1 bg-surface-100 px-2 py-0.5 rounded-full">
                                                <Star className="w-3 h-3 text-orange-400" />
                                                {profile.type || profile.farmType}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {profile.match_score && (
                                    <div className="text-right hidden md:block">
                                        <span className="text-2xl font-bold text-primary-700">{profile.match_score}%</span>
                                        <p className="text-xs text-earth-500">Match Score</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="mt-8 space-y-8">
                        {/* About / Reason */}
                        <div className="bg-surface-50 p-6 rounded-2xl border border-surface-200">
                            <h3 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                Why we matched you
                            </h3>
                            <p className="text-earth-700 leading-relaxed italic">
                                "{profile.reason}"
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Skills/Activities */}
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">
                                    {profile.activities ? 'Farm Activities' : 'Skills & Equipment'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(profile.skills || profile.activities || []).map((tag: string, idx: number) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-earth-200 rounded-lg text-sm text-earth-700 flex items-center gap-2">
                                            <CheckCircle className="w-3 h-3 text-primary-500" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact / Availability (Mock) */}
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">Availability & Contact</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-earth-600">
                                        <Calendar className="w-5 h-5 text-earth-400" />
                                        <span>Available for next 2 weeks</span>
                                    </div>
                                    {profile.mobile && (
                                        <div className="flex items-center gap-3 text-earth-600">
                                            <Phone className="w-5 h-5 text-earth-400" />
                                            <span>{profile.mobile}</span>
                                        </div>
                                    )}
                                    <div className="flex gap-3 pt-2">
                                        {profile.instagramUrl && (
                                            <a
                                                href={profile.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-sm hover:bg-pink-100 transition-colors"
                                            >
                                                <Instagram className="w-4 h-4" />
                                                <span>Instagram</span>
                                            </a>
                                        )}
                                        {profile.youtubeUrl && (
                                            <a
                                                href={profile.youtubeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
                                            >
                                                <Youtube className="w-4 h-4" />
                                                <span>YouTube</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="pt-6 border-t border-earth-100 flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 px-6 rounded-xl border border-earth-200 text-earth-600 font-semibold hover:bg-earth-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={onBook}
                                className="flex-[2] py-3 px-6 rounded-xl bg-primary-600 text-white font-bold shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                Book / Connect Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
