import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const ProfileSetup = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContinue = () => {
        // In a real app, we would upload the image to backend here
        // For now, we'll just update the local user state if we could (but useAuth might not expose update)
        // We'll just simulate it and navigate

        if (user && selectedImage) {
            // Mock update user with new image
            const updatedUser = { ...user, picture: selectedImage };
            // We might need to re-login to update context, or just assume it's done
            // For this demo, we can re-call login to update the stored user
            login('mock-jwt-token', updatedUser);
        }

        toast.success("Profile picture updated!");
        navigate('/dashboard');
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-surface-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-primary-600 p-8 text-center">
                    <div className="mx-auto bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Camera className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
                    <p className="text-primary-100">Add a photo so others can recognize you.</p>
                </div>

                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-40 h-40 rounded-full bg-surface-100 border-4 border-white shadow-lg overflow-hidden mb-6 relative group">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-surface-50 text-earth-400">
                                    <Upload className="w-12 h-12 opacity-50" />
                                </div>
                            )}

                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white font-medium text-sm">Change Photo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>

                        {!selectedImage && (
                            <label className="btn-secondary cursor-pointer bg-surface-50 hover:bg-surface-100 text-earth-700 border border-earth-200 px-6 py-2 rounded-full text-sm font-medium transition-colors">
                                Choose Photo
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        )}
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleContinue}
                            className="w-full btn-primary bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary-200 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            {selectedImage ? 'Save & Continue' : 'Continue without Photo'}
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        {!selectedImage && (
                            <button
                                onClick={handleSkip}
                                className="w-full text-earth-500 hover:text-earth-700 text-sm font-medium py-2"
                            >
                                Skip for now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
