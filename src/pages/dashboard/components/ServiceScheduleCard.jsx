import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceScheduleCard = ({ service }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'pending':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-250">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {service?.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} className="mr-2" />
            <span className="font-body">{service?.date}</span>
            <Icon name="Clock" size={16} className="ml-4 mr-2" />
            <span className="font-body">{service?.time}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center ${getStatusColor(service?.status)}`}>
          <Icon name={getStatusIcon(service?.status)} size={14} className="mr-1" />
          {service?.status?.charAt(0)?.toUpperCase() + service?.status?.slice(1)}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Team Lead:</span>
          <span className="text-sm text-foreground font-medium">{service?.teamLead}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Team Size:</span>
          <span className="text-sm text-foreground font-medium">{service?.teamSize} members</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Preparation:</span>
          <div className="flex items-center">
            <div className="w-16 bg-muted rounded-full h-2 mr-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${service?.preparationProgress}%` }}
              />
            </div>
            <span className="text-sm text-foreground font-medium">{service?.preparationProgress}%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
          onClick={() => console.log('View service details')}
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          className="flex-1"
          onClick={() => console.log('Edit service')}
        >
          Edit Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceScheduleCard;