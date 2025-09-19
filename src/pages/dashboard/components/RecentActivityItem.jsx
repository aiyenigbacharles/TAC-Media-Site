import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'schedule':
        return 'Calendar';
      case 'media':
        return 'FolderOpen';
      case 'team':
        return 'Users';
      case 'communication':
        return 'MessageSquare';
      case 'system':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'schedule':
        return 'text-primary bg-primary/10';
      case 'media':
        return 'text-secondary bg-secondary/10';
      case 'team':
        return 'text-success bg-success/10';
      case 'communication':
        return 'text-warning bg-warning/10';
      case 'system':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
      <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-body">
          <span className="font-medium">{activity?.user}</span> {activity?.action}
        </p>
        <p className="text-xs text-muted-foreground font-caption mt-1">
          {formatTimeAgo(activity?.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default RecentActivityItem;