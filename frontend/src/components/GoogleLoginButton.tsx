import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// import { authAPI } from '../services/api'; // Not used yet
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
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

      // Decode the Google JWT to get user info
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("Logged in user:", decoded);

      const user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        profileComplete: false, // User needs to select role/complete profile
      };

      login(credentialResponse.credential, user);
      toast.success(`Welcome, ${decoded.name}!`);
      navigate('/profile-setup');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  // If Client ID is missing, show error (though user provided it now)
  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="text-red-500 text-sm p-4 border border-red-200 rounded bg-red-50">
        Error: Google Client ID is missing. Please check .env file.
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
};
