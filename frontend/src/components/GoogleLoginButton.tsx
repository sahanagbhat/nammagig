import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

import { GOOGLE_CLIENT_ID } from '../config';

export const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error('Login failed. Please try again.');
        return;
      }

      const mockResponse = {
        access_token: credentialResponse.credential,
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'User',
          profileComplete: false,
        },
      };

      login(mockResponse.access_token, mockResponse.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="text-center text-sm text-gray-700">
        <p className="mb-2">Google Sign-In is not configured.</p>
        <p className="mb-2">To enable it, create a <strong>.env</strong> file in the <strong>nomad-matcher</strong> folder and add:</p>
        <pre className="bg-gray-100 p-2 rounded">VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com</pre>
        <p className="mt-2">Then restart the dev server.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="rectangular"
      />
    </div>
  );
};
