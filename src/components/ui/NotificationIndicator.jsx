import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationIndicator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Schedule Update',
      message: 'Sunday service schedule has been updated',
      time: '5 minutes ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'New Team Member',
      message: 'John Smith has joined the media team',
      time: '1 hour ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Equipment Check',
      message: 'Weekly equipment maintenance reminder',
      time: '2 hours ago',
      type: 'warning',
      unread: false
    }
  ]);
  
  const dropdownRef = useRef(null);
  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, unread: false }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-250"
      >
        <Icon name="Bell" size={20} className="text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-medium animate-fade-in z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-heading font-medium text-popover-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 font-body transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-body text-sm">No notifications</p>
              </div>
            ) : (
              <div className="py-2">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    onClick={() => markAsRead(notification?.id)}
                    className={`px-4 py-3 hover:bg-muted cursor-pointer transition-colors duration-200 ${
                      notification?.unread ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        name={getNotificationIcon(notification?.type)}
                        size={16}
                        className={`mt-1 ${getNotificationColor(notification?.type)}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-body font-medium text-sm ${
                            notification?.unread ? 'text-popover-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification?.title}
                          </h4>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-caption mt-1">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground font-caption mt-1">
                          {notification?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-body transition-colors duration-200">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;