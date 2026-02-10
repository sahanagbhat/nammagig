import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { FarmerRegistration } from './pages/Register/FarmerRegistration';
import { FarmerLanding } from './pages/Register/FarmerLanding';
import { CreatorRegistration } from './pages/Register/CreatorRegistration';
import { TouristRegistration } from './pages/Register/TouristRegistration';
import { Gigs } from './pages/Gigs';

import { GOOGLE_CLIENT_ID } from './config';

function App() {
  const AppShell = (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Make farmer landing and registration public so farmers can register without sign-in */}
            <Route path="/register/farmer" element={<FarmerLanding />} />
            <Route path="/register/farmer/register" element={<FarmerRegistration />} />
            <Route
              path="/register/creator"
              element={
                <ProtectedRoute>
                  <CreatorRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register/tourist"
              element={
                <ProtectedRoute>
                  <TouristRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gigs"
              element={
                <ProtectedRoute>
                  <Gigs />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );

  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>{AppShell}</AuthProvider>
      </GoogleOAuthProvider>
    );
  }

  return <AuthProvider>{AppShell}</AuthProvider>;
}

export default App;
