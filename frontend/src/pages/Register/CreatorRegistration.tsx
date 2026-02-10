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

const creatorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email: z.string().email('Invalid email address'),
  instagramUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  youtubeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
});

type CreatorFormData = z.infer<typeof creatorSchema>;

const SKILLS = ['Photography', 'Videography', 'Video Editing', 'Writing', 'Social Media'];
const LANGUAGES = ['Kannada', 'English', 'Hindi', 'Tamil', 'Telugu'];

export const CreatorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreatorFormData>({
    resolver: zodResolver(creatorSchema),
    defaultValues: {
      skills: [],
      languages: [],
    },
  });

  const steps = ['Personal Info', 'Social Profiles', 'Skills'];
  const skills = watch('skills') || [];
  const languages = watch('languages') || [];

  const onSubmit = async (data: CreatorFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value || '');
        }
      });

      if (aadhaarPhoto) formData.append('aadhaarPhoto', aadhaarPhoto);

      await registrationAPI.registerCreator(formData);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Content Creator Registration
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

                  <FileUpload
                    label="Aadhaar Card Photo *"
                    accept="image/*"
                    onChange={setAadhaarPhoto}
                  />
                </div>
              )}

              {/* Step 2: Social Profiles */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Profile URL
                    </label>
                    <input
                      {...register('instagramUrl')}
                      type="url"
                      className="input-field"
                      placeholder="https://instagram.com/username"
                    />
                    {errors.instagramUrl && (
                      <p className="mt-1 text-sm text-red-600">{errors.instagramUrl.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Channel URL
                    </label>
                    <input
                      {...register('youtubeUrl')}
                      type="url"
                      className="input-field"
                      placeholder="https://youtube.com/@username"
                    />
                    {errors.youtubeUrl && (
                      <p className="mt-1 text-sm text-red-600">{errors.youtubeUrl.message}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Adding your social profiles helps farmers and tourists discover your work!
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <MultiSelect
                    label="Your Skills *"
                    options={SKILLS}
                    selected={skills}
                    onChange={(selected) => setValue('skills', selected)}
                    error={errors.skills?.message}
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
