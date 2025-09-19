import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';
import TrustSignals from './components/TrustSignals';
import MockCredentialsHelper from './components/MockCredentialsHelper';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authData = localStorage.getItem('churchMediaAuth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        const loginTime = new Date(parsedAuth.loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
        
        // Auto-logout after 24 hours unless "remember me" is checked
        if (parsedAuth?.rememberMe || hoursSinceLogin < 24) {
          navigate('/dashboard');
          return;
        } else {
          localStorage.removeItem('churchMediaAuth');
        }
      } catch (error) {
        localStorage.removeItem('churchMediaAuth');
      }
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - ChurchMedia Pro</title>
        <meta name="description" content="Sign in to ChurchMedia Pro to access your media ministry dashboard and manage your team's operations." />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-pronounced border border-border p-8">
            <WelcomeMessage />
            <LoginForm />
            <TrustSignals />
            <MockCredentialsHelper />
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="font-caption text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} ChurchMedia Pro. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="font-caption text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="font-caption text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="font-caption text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;