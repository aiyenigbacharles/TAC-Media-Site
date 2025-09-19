import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustElements = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: 'Your data is protected with enterprise-grade encryption'
    },
    {
      icon: 'Users',
      text: '500+ Churches',
      description: 'Trusted by media ministries nationwide'
    },
    {
      icon: 'Award',
      text: 'Ministry Approved',
      description: 'Endorsed by church leadership organizations'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustElements?.map((element, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={element?.icon} size={16} className="text-success" />
              </div>
            </div>
            <h4 className="font-body font-medium text-sm text-foreground mb-1">
              {element?.text}
            </h4>
            <p className="font-caption text-xs text-muted-foreground">
              {element?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;