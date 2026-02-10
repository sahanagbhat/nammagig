import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ProgressBar } from '../../components/ProgressBar';
import { MultiSelect } from '../../components/MultiSelect';
import { registrationAPI } from '../../services/api';

const touristSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Country is required'),
  expectations: z.string().min(10, 'Please provide more details about your expectations'),
  durationDays: z.number().min(1, 'Duration must be at least 1 day').max(30, 'Maximum 30 days'),
  preferredDate: z.string().optional(),
  activities: z.array(z.string()).min(1, 'Select at least one activity'),
});

type TouristFormData = z.infer<typeof touristSchema>;

const ACTIVITIES = ['Farm Tour', 'Content Shoot', 'Farm Stay', 'Yoga & Wellness', 'Workshops'];

export const TouristRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TouristFormData>({
    resolver: zodResolver(touristSchema),
    defaultValues: {
      activities: [],
      durationDays: 3,
    },
  });

  const steps = ['Personal Info', 'Trip Details'];
  const activities = watch('activities') || [];

  const onSubmit = async (data: TouristFormData) => {
    setLoading(true);
    try {
      await registrationAPI.registerTourist(data);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Tourist Registration
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      className="input-field"
                      placeholder="Your country"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What are you looking for? *
                    </label>
                    <textarea
                      {...register('expectations')}
                      rows={4}
                      className="input-field"
                      placeholder="Tell us about your ideal agritourism experience..."
                    />
                    {errors.expectations && (
                      <p className="mt-1 text-sm text-red-600">{errors.expectations.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Days) *
                    </label>
                    <input
                      {...register('durationDays', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="30"
                      className="input-field"
                      placeholder="Number of days"
                    />
                    {errors.durationDays && (
                      <p className="mt-1 text-sm text-red-600">{errors.durationDays.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      {...register('preferredDate')}
                      type="date"
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <MultiSelect
                    label="Activities of Interest *"
                    options={ACTIVITIES}
                    selected={activities}
                    onChange={(selected) => setValue('activities', selected)}
                    error={errors.activities?.message}
                  />

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> We'll match you with farms that offer your preferred activities and can accommodate your dates!
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
