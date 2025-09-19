import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'list', label: 'List', icon: 'List' }
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {views?.map((view) => (
        <Button
          key={view?.id}
          variant={currentView === view?.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view?.id)}
          iconName={view?.icon}
          iconPosition="left"
          iconSize={16}
          className="px-4"
        >
          {view?.label}
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;