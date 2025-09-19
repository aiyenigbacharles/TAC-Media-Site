import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ action }) => {
  const getActionColor = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'success':
        return 'bg-success text-success-foreground hover:bg-success/90';
      case 'warning':
        return 'bg-warning text-warning-foreground hover:bg-warning/90';
      case 'accent':
        return 'bg-accent text-accent-foreground hover:bg-accent/90';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  const handleClick = () => {
    if (action?.onClick) {
      action?.onClick();
    }
  };

  const buttonContent = (
    <div className={`p-6 rounded-lg transition-all duration-250 hover:shadow-medium cursor-pointer ${getActionColor(action?.color)}`}>
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-full bg-white/20">
          <Icon name={action?.icon} size={24} />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sm mb-1">
            {action?.title}
          </h3>
          <p className="font-caption text-xs opacity-90">
            {action?.description}
          </p>
        </div>
      </div>
    </div>
  );

  if (action?.path) {
    return (
      <Link to={action?.path} className="block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <div onClick={handleClick}>
      {buttonContent}
    </div>
  );
};

export default QuickActionButton;