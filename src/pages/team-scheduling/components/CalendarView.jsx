import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ selectedDate, onDateSelect, services, volunteers, onScheduleClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getServiceForDate = (date) => {
    if (!date) return null;
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return services?.find(service => service?.date === dateStr);
  };

  const getConflictCount = (service) => {
    if (!service) return 0;
    return service?.conflicts || 0;
  };

  const getAssignmentStatus = (service) => {
    if (!service) return 'none';
    const totalRoles = service?.requiredRoles?.length || 0;
    const filledRoles = service?.assignments?.length || 0;
    
    if (filledRoles === 0) return 'none';
    if (filledRoles < totalRoles) return 'partial';
    return 'complete';
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today?.setHours(0, 0, 0, 0);

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
            iconSize={16}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
          >
            Next
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-24" />;
            }

            const service = getServiceForDate(day);
            const isToday = day?.getTime() === today?.getTime();
            const isSelected = selectedDate && day?.getTime() === selectedDate?.getTime();
            const isPast = day < today;
            const conflictCount = getConflictCount(service);
            const assignmentStatus = getAssignmentStatus(service);

            return (
              <div
                key={day?.getDate()}
                onClick={() => onDateSelect(day)}
                className={`h-24 p-2 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-gentle ${
                  isSelected ? 'bg-primary/10 border-primary' : isToday ?'bg-accent/10 border-accent': isPast ?'bg-muted/50' : 'bg-card hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${
                    isToday ? 'text-accent' : isPast ?'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {day?.getDate()}
                  </span>
                  {conflictCount > 0 && (
                    <div className="w-2 h-2 bg-destructive rounded-full" title={`${conflictCount} conflicts`} />
                  )}
                </div>
                {service && (
                  <div 
                    className="space-y-1"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onScheduleClick(service);
                    }}
                  >
                    <div className={`text-xs px-2 py-1 rounded text-center font-medium ${
                      assignmentStatus === 'complete' ? 'bg-success/20 text-success' :
                      assignmentStatus === 'partial'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {service?.name}
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {service?.time}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/20 rounded" />
            <span className="text-muted-foreground">Fully Staffed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning/20 rounded" />
            <span className="text-muted-foreground">Partially Staffed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded" />
            <span className="text-muted-foreground">Needs Staff</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span className="text-muted-foreground">Conflicts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;