import React from 'react';
import Icon from '../../../components/AppIcon';

const AnnouncementCard = ({ announcement }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const announcementTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - announcementTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-250">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full bg-muted ${getPriorityColor(announcement?.priority)}`}>
          <Icon name={getPriorityIcon(announcement?.priority)} size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-heading font-medium text-foreground text-sm truncate">
              {announcement?.title}
            </h4>
            <span className="text-xs text-muted-foreground font-caption whitespace-nowrap ml-2">
              {formatTimeAgo(announcement?.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-2">
            {announcement?.message}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-caption">
              By {announcement?.author}
            </span>
            {announcement?.unread && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;