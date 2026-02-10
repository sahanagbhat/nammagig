import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ProgressBar } from '../../components/ProgressBar';
import { MultiSelect } from '../../components/MultiSelect';
import { registrationAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const touristSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Country is required'),
  locationPreference: z.string().min(2, 'Location is required'),
  farmTypePreference: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  activities: z.array(z.string()).min(1, 'Select at least one activity'),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type TouristFormData = z.infer<typeof touristSchema>;

const ACTIVITIES = ['Farm Tour', 'Content Shoot', 'Farm Stay', 'Yoga & Wellness', 'Workshops'];

export const TouristRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<TouristFormData>({
    resolver: zodResolver(touristSchema),
    defaultValues: {
      activities: [],
      locationPreference: '',
      farmTypePreference: '',
    },
  });

  const steps = ['Personal Info', 'Trip Details'];
  const activities = watch('activities') || [];

  const onSubmit = async (data: TouristFormData) => {
    setLoading(true);
    try {
      await registrationAPI.registerTourist(data);

      if (user && token) {
        login(token, { ...user, role: 'tourist' });
      }

      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof TouristFormData)[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ['name', 'mobile', 'email', 'country'];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
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

            <form onSubmit={(e) => e.preventDefault()}>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location Preference *
                      </label>
                      <input
                        {...register('locationPreference')}
                        type="text"
                        className="input-field"
                        placeholder="Where are you going?"
                      />
                      {errors.locationPreference && (
                        <p className="mt-1 text-sm text-red-600">{errors.locationPreference.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Type Preference
                      </label>
                      <input
                        {...register('farmTypePreference')}
                        type="text"
                        className="input-field"
                        placeholder="Farm name, description..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        {...register('startDate')}
                        type="date"
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        {...register('endDate')}
                        type="date"
                        className="input-field"
                        min={watch('startDate') || new Date().toISOString().split('T')[0]}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                      )}
                    </div>
                  </div>

                  <MultiSelect
                    label="Activities of Interest *"
                    options={ACTIVITIES}
                    selected={activities}
                    onChange={(selected) => setValue('activities', selected, { shouldValidate: true })}
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
                    type="button"
                    onClick={handleSubmit(onSubmit)}
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
