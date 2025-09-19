import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
          <Icon name="Play" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
        Welcome to ChurchMedia Pro
      </h1>
      
      <p className="font-body text-muted-foreground max-w-sm mx-auto">
        Sign in to access your media ministry dashboard and manage your team's operations
      </p>
    </div>
  );
};

export default WelcomeMessage;