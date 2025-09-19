import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 3);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'schedule':
        return 'Calendar';
      case 'announcement':
        return 'Megaphone';
      case 'system':
        return 'Settings';
      case 'reminder':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
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
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Notifications
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground font-caption">
            {notifications?.filter(n => n?.unread)?.length} unread
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            onClick={() => console.log('More options')}
          />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {displayedNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground font-body text-sm">No notifications</p>
          </div>
        ) : (
          displayedNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`border-l-4 pl-4 pr-3 py-3 rounded-r-lg ${getPriorityColor(notification?.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={getNotificationIcon(notification?.type)}
                  size={18}
                  className="text-muted-foreground mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-body font-medium text-sm text-foreground">
                      {notification?.title}
                    </h4>
                    {notification?.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-caption mb-2">
                    {notification?.message}
                  </p>
                  <span className="text-xs text-muted-foreground font-caption">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        {notifications?.length > 3 && (
          <div className="pt-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All (${notifications?.length})`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;