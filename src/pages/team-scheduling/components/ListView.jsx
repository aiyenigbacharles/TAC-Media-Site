import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ListView = ({ services, volunteers, onScheduleClick, onAssignVolunteer }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Service Name' },
    { value: 'status', label: 'Staffing Status' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'upcoming', label: 'Upcoming Only' },
    { value: 'understaffed', label: 'Needs Staff' },
    { value: 'conflicts', label: 'Has Conflicts' }
  ];

  const getAssignmentStatus = (service) => {
    const totalRoles = service?.requiredRoles?.length || 0;
    const filledRoles = service?.assignments?.length || 0;
    
    if (filledRoles === 0) return { status: 'none', label: 'Needs Staff', color: 'text-muted-foreground bg-muted' };
    if (filledRoles < totalRoles) return { status: 'partial', label: 'Partially Staffed', color: 'text-warning bg-warning/20' };
    return { status: 'complete', label: 'Fully Staffed', color: 'text-success bg-success/20' };
  };

  const filteredAndSortedServices = services?.filter(service => {
      if (filterBy === 'upcoming') {
        return new Date(service.date) >= new Date();
      }
      if (filterBy === 'understaffed') {
        const status = getAssignmentStatus(service);
        return status?.status !== 'complete';
      }
      if (filterBy === 'conflicts') {
        return service?.conflicts > 0;
      }
      return true;
    })?.filter(service => 
      service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      service?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'name') {
        return a?.name?.localeCompare(b?.name);
      }
      if (sortBy === 'status') {
        const statusA = getAssignmentStatus(a);
        const statusB = getAssignmentStatus(b);
        return statusA?.status?.localeCompare(statusB?.status);
      }
      return 0;
    });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAvailableVolunteers = (service, roleId) => {
    return volunteers?.filter(volunteer => 
      volunteer?.skills?.includes(roleId) && 
      volunteer?.availability?.includes(service?.date) &&
      !service?.assignments?.some(assignment => assignment?.volunteerId === volunteer?.id)
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header with Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-heading font-semibold text-foreground">Service Schedule</h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-40"
            />
            
            <Select
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
              placeholder="Filter"
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>
      {/* Services List */}
      <div className="divide-y divide-border">
        {filteredAndSortedServices?.length === 0 ? (
          <div className="p-12 text-center">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">No Services Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredAndSortedServices?.map((service) => {
            const assignmentStatus = getAssignmentStatus(service);
            const isPast = new Date(service.date) < new Date();
            
            return (
              <div key={service?.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-heading font-medium text-foreground">{service?.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${assignmentStatus?.color}`}>
                        {assignmentStatus?.label}
                      </span>
                      {service?.conflicts > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-destructive bg-destructive/20">
                          {service?.conflicts} Conflicts
                        </span>
                      )}
                      {isPast && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-muted-foreground bg-muted">
                          Past
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={16} />
                        <span>{formatDate(service?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={16} />
                        <span>{service?.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={16} />
                        <span>{service?.location}</span>
                      </div>
                    </div>
                    
                    {service?.description && (
                      <p className="text-sm text-muted-foreground mt-2">{service?.description}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onScheduleClick(service)}
                      iconName="Edit"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Manage
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onScheduleClick(service)}
                      iconName="Users"
                      iconPosition="left"
                      iconSize={16}
                    >
                      View Team
                    </Button>
                  </div>
                </div>
                {/* Role Assignments */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Role Assignments:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {service?.requiredRoles?.map((role) => {
                      const assignment = service?.assignments?.find(a => a?.roleId === role?.id);
                      const availableVolunteers = getAvailableVolunteers(service, role?.id);
                      
                      return (
                        <div key={role?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Icon name={role?.icon} size={16} className="text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{role?.name}</span>
                            </div>
                            {assignment ? (
                              <div className="text-xs text-success mt-1">
                                {volunteers?.find(v => v?.id === assignment?.volunteerId)?.name}
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground mt-1">
                                {availableVolunteers?.length} available
                              </div>
                            )}
                          </div>
                          {!assignment && availableVolunteers?.length > 0 && (
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => onAssignVolunteer(service?.id, role?.id, availableVolunteers?.[0]?.id)}
                              iconName="Plus"
                              iconSize={14}
                            >
                              Assign
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListView;