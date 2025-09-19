import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewAnnouncement, onViewArchive, onExportData, currentUser }) => {
  const canCreateAnnouncement = currentUser?.role === 'Admin' || currentUser?.role === 'Media Lead';

  const quickActionItems = [
    {
      label: 'New Announcement',
      icon: 'Plus',
      action: onNewAnnouncement,
      variant: 'default',
      show: canCreateAnnouncement
    },
    {
      label: 'View Archive',
      icon: 'Archive',
      action: onViewArchive,
      variant: 'outline',
      show: true
    },
    {
      label: 'Export Data',
      icon: 'Download',
      action: onExportData,
      variant: 'outline',
      show: canCreateAnnouncement
    }
  ];

  const visibleActions = quickActionItems?.filter(action => action?.show);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="font-heading font-medium text-foreground mb-4 flex items-center">
        <Icon name="Zap" size={18} className="mr-2" />
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-3">
        {visibleActions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            onClick={action?.action}
            iconName={action?.icon}
            iconPosition="left"
            className="flex-shrink-0"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Statistics */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">24</div>
            <div className="text-sm font-caption text-muted-foreground">Total Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success">18</div>
            <div className="text-sm font-caption text-muted-foreground">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-warning">3</div>
            <div className="text-sm font-caption text-muted-foreground">Urgent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">92%</div>
            <div className="text-sm font-caption text-muted-foreground">Read Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;