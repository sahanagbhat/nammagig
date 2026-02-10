import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ProgressBar } from '../../components/ProgressBar';
import { FileUpload } from '../../components/FileUpload';
import { MultiSelect } from '../../components/MultiSelect';
import { registrationAPI } from '../../services/api';

const farmerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email: z.string().email('Invalid email address'),
  farmLocation: z.string().min(3, 'Location is required'),
  farmType: z.string().min(1, 'Farm type is required'),
  activities: z.array(z.string()).min(1, 'Select at least one activity'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
});

type FarmerFormData = z.infer<typeof farmerSchema>;

const FARM_TYPES = ['Organic', 'Coffee', 'Spice', 'Rice', 'Vegetable', 'Mixed'];
const ACTIVITIES = ['Content Shoot', 'Farm Tour', 'Yoga & Wellness', 'Workshops', 'Stay'];
const LANGUAGES = ['Kannada', 'English', 'Hindi', 'Tamil', 'Telugu'];

export const FarmerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [farmPhoto, setFarmPhoto] = useState<File | null>(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FarmerFormData>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      activities: [],
      languages: [],
    },
  });

  const steps = ['Personal Info', 'Farm Details', 'Documents'];
  const activities = watch('activities') || [];
  const languages = watch('languages') || [];

  const onSubmit = async (data: FarmerFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (farmPhoto) formData.append('farmPhoto', farmPhoto);
      if (aadhaarPhoto) formData.append('aadhaarPhoto', aadhaarPhoto);

      await registrationAPI.registerFarmer(formData);
      toast.success('Profile created successfully!');
      navigate('/gigs');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Farmer Registration
            </h1>

            <ProgressBar
              currentStep={currentStep}
              totalSteps={steps.length}
              steps={steps}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      {...register('mobile')}
                      type="tel"
                      className="input-field"
                      placeholder="10-digit mobile number"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Location *
                    </label>
                    <input
                      {...register('farmLocation')}
                      type="text"
                      className="input-field"
                      placeholder="Village, Taluk, District"
                    />
                    {errors.farmLocation && (
                      <p className="mt-1 text-sm text-red-600">{errors.farmLocation.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Type *
                    </label>
                    <select {...register('farmType')} className="input-field">
                      <option value="">Select farm type</option>
                      {FARM_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.farmType && (
                      <p className="mt-1 text-sm text-red-600">{errors.farmType.message}</p>
                    )}
                  </div>

                  <MultiSelect
                    label="Activities Offered *"
                    options={ACTIVITIES}
                    selected={activities}
                    onChange={(selected) => setValue('activities', selected)}
                    error={errors.activities?.message}
                  />

                  <MultiSelect
                    label="Languages Spoken *"
                    options={LANGUAGES}
                    selected={languages}
                    onChange={(selected) => setValue('languages', selected)}
                    error={errors.languages?.message}
                  />
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FileUpload
                    label="Farm Photo"
                    accept="image/*"
                    onChange={setFarmPhoto}
                  />

                  <FileUpload
                    label="Aadhaar Card Photo"
                    accept="image/*"
                    onChange={setAadhaarPhoto}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Your Aadhaar information will be kept confidential and used only for verification purposes.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary"
                  >
                    Previous
                  </button>
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary ml-auto"
                  >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
