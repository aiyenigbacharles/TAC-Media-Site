import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivityTracker = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  const userOptions = users?.map(user => ({
    value: user?.id,
    label: user?.name
  }));

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  // Mock activity data
  const activityData = [
    {
      id: 1,
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      action: 'Updated service schedule',
      details: 'Modified Sunday morning service assignments',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'schedule'
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      action: 'Uploaded media file',
      details: 'Added new worship background video',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'media'
    },
    {
      id: 3,
      userId: 'user3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      action: 'Sent team announcement',
      details: 'Reminder about equipment training session',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'communication'
    },
    {
      id: 4,
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      action: 'Login',
      details: 'Accessed system dashboard',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      type: 'system'
    },
    {
      id: 5,
      userId: 'user4',
      userName: 'David Kim',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      action: 'Updated profile',
      details: 'Modified availability preferences',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      type: 'profile'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'schedule':
        return 'Calendar';
      case 'media':
        return 'FolderOpen';
      case 'communication':
        return 'MessageSquare';
      case 'system':
        return 'LogIn';
      case 'profile':
        return 'User';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'schedule':
        return 'text-primary';
      case 'media':
        return 'text-success';
      case 'communication':
        return 'text-warning';
      case 'system':
        return 'text-muted-foreground';
      case 'profile':
        return 'text-secondary';
      default:
        return 'text-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return timestamp?.toLocaleDateString();
  };

  const filteredActivities = selectedUser 
    ? activityData?.filter(activity => activity?.userId === selectedUser)
    : activityData;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Activity Tracker</h3>
              <p className="font-caption text-sm text-muted-foreground">Monitor team member activities and system usage</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Filter by User"
            options={[{ value: '', label: 'All Users' }, ...userOptions]}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select user..."
          />
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
        </div>
      </div>
      {/* Activity List */}
      <div className="p-6">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-heading font-medium text-foreground mb-2">No Activity Found</h4>
            <p className="font-body text-sm text-muted-foreground">
              No activities match the selected filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={activity?.userAvatar}
                    alt={activity?.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon
                      name={getActivityIcon(activity?.type)}
                      size={16}
                      className={getActivityColor(activity?.type)}
                    />
                    <span className="font-body font-medium text-foreground">
                      {activity?.userName}
                    </span>
                    <span className="font-body text-foreground">
                      {activity?.action}
                    </span>
                  </div>
                  
                  <p className="font-caption text-sm text-muted-foreground mb-2">
                    {activity?.details}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-xs text-muted-foreground">
                      {formatTimestamp(activity?.timestamp)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      activity?.type === 'schedule' ? 'bg-primary/10 text-primary' :
                      activity?.type === 'media' ? 'bg-success/10 text-success' :
                      activity?.type === 'communication' ? 'bg-warning/10 text-warning' :
                      activity?.type === 'system' ? 'bg-muted text-muted-foreground' :
                      'bg-secondary/10 text-secondary'
                    }`}>
                      {activity?.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTracker;