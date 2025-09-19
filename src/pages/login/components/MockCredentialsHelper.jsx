import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MockCredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Administrator',
      email: 'admin@churchmedia.org',
      password: 'ChurchAdmin2024!',
      description: 'Full system access and user management'
    },
    {
      role: 'Media Lead',
      email: 'lead@churchmedia.org',
      password: 'MediaLead2024!',
      description: 'Team scheduling and service planning'
    },
    {
      role: 'Volunteer',
      email: 'volunteer@churchmedia.org',
      password: 'Volunteer2024!',
      description: 'Schedule viewing and basic tasks'
    }
  ];

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-body text-sm font-medium text-foreground">
            Demo Credentials
          </span>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="font-caption text-xs text-muted-foreground">
            Use these credentials to explore different user roles:
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-body font-medium text-sm text-foreground">
                  {cred?.role}
                </h4>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    navigator.clipboard?.writeText(`${cred?.email}\n${cred?.password}`);
                  }}
                  iconName="Copy"
                  iconSize={12}
                >
                  Copy
                </Button>
              </div>
              <div className="space-y-1">
                <p className="font-data text-xs text-muted-foreground">
                  Email: {cred?.email}
                </p>
                <p className="font-data text-xs text-muted-foreground">
                  Password: {cred?.password}
                </p>
                <p className="font-caption text-xs text-muted-foreground italic">
                  {cred?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockCredentialsHelper;