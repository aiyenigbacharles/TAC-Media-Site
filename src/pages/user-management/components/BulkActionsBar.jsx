import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);

  const bulkActions = [
    { value: 'change_role', label: 'Change Role', icon: 'UserCheck' },
    { value: 'change_status', label: 'Change Status', icon: 'ToggleLeft' },
    { value: 'send_message', label: 'Send Message', icon: 'MessageSquare' },
    { value: 'export_data', label: 'Export Data', icon: 'Download' },
    { value: 'delete', label: 'Delete Users', icon: 'Trash2', variant: 'destructive' }
  ];

  const handleActionSelect = (actionValue) => {
    onBulkAction(actionValue);
    setShowActions(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-body font-medium text-foreground">
              {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {bulkActions?.slice(0, 3)?.map((action) => (
              <Button
                key={action?.value}
                variant="outline"
                size="sm"
                iconName={action?.icon}
                onClick={() => handleActionSelect(action?.value)}
                className="bg-card"
              >
                {action?.label}
              </Button>
            ))}
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="MoreHorizontal"
                onClick={() => setShowActions(!showActions)}
                className="bg-card"
              >
                More
              </Button>
              
              {showActions && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-medium z-10">
                  <div className="py-2">
                    {bulkActions?.slice(3)?.map((action) => (
                      <button
                        key={action?.value}
                        onClick={() => handleActionSelect(action?.value)}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                          action?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={action?.icon} size={16} className="mr-3" />
                        <span className="font-body">{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setShowActions(!showActions)}
              className="bg-card"
            >
              Actions
            </Button>
            
            {showActions && (
              <div className="absolute top-full left-0 right-0 mt-1 mx-4 bg-popover border border-border rounded-lg shadow-medium z-10">
                <div className="py-2">
                  {bulkActions?.map((action) => (
                    <button
                      key={action?.value}
                      onClick={() => handleActionSelect(action?.value)}
                      className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 ${
                        action?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={action?.icon} size={16} className="mr-3" />
                      <span className="font-body">{action?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;