import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ScheduleModal = ({ service, volunteers, isOpen, onClose, onSave }) => {
  const [assignments, setAssignments] = useState(service?.assignments || []);
  const [draggedItem, setDraggedItem] = useState(null);

  if (!isOpen || !service) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAvailableVolunteers = (roleId) => {
    const assignedVolunteerIds = assignments?.map(a => a?.volunteerId);
    return volunteers?.filter(volunteer => 
      volunteer?.skills?.includes(roleId) && 
      volunteer?.availability?.includes(service?.date) &&
      !assignedVolunteerIds?.includes(volunteer?.id)
    );
  };

  const getAssignedVolunteer = (roleId) => {
    const assignment = assignments?.find(a => a?.roleId === roleId);
    return assignment ? volunteers?.find(v => v?.id === assignment?.volunteerId) : null;
  };

  const handleAssignVolunteer = (roleId, volunteerId) => {
    if (!volunteerId) {
      // Remove assignment
      setAssignments(prev => prev?.filter(a => a?.roleId !== roleId));
    } else {
      // Add or update assignment
      setAssignments(prev => {
        const filtered = prev?.filter(a => a?.roleId !== roleId);
        return [...filtered, { roleId, volunteerId, assignedAt: new Date()?.toISOString() }];
      });
    }
  };

  const handleDragStart = (e, volunteer) => {
    setDraggedItem(volunteer);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, roleId) => {
    e?.preventDefault();
    if (draggedItem && draggedItem?.skills?.includes(roleId)) {
      handleAssignVolunteer(roleId, draggedItem?.id);
    }
    setDraggedItem(null);
  };

  const handleSave = () => {
    onSave(service?.id, assignments);
    onClose();
  };

  const getConflicts = () => {
    const conflicts = [];
    assignments?.forEach(assignment => {
      const volunteer = volunteers?.find(v => v?.id === assignment?.volunteerId);
      if (volunteer && volunteer?.conflicts > 0) {
        conflicts?.push({
          volunteerId: volunteer?.id,
          volunteerName: volunteer?.name,
          conflictCount: volunteer?.conflicts
        });
      }
    });
    return conflicts;
  };

  const conflicts = getConflicts();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">{service?.name}</h2>
            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
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
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Role Assignments */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">Role Assignments</h3>
            
            {conflicts?.length > 0 && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive" />
                  <span className="font-medium text-destructive">Schedule Conflicts Detected</span>
                </div>
                <div className="space-y-1">
                  {conflicts?.map(conflict => (
                    <p key={conflict?.volunteerId} className="text-sm text-destructive">
                      {conflict?.volunteerName} has {conflict?.conflictCount} conflicting assignments
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {service?.requiredRoles?.map((role) => {
                const assignedVolunteer = getAssignedVolunteer(role?.id);
                const availableVolunteers = getAvailableVolunteers(role?.id);
                
                const volunteerOptions = [
                  { value: '', label: 'Unassigned' },
                  ...availableVolunteers?.map(v => ({ value: v?.id, label: v?.name })),
                  ...(assignedVolunteer ? [{ value: assignedVolunteer?.id, label: assignedVolunteer?.name }] : [])
                ];

                return (
                  <div
                    key={role?.id}
                    className="p-4 border border-border rounded-lg"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, role?.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={role?.icon} size={20} className="text-muted-foreground" />
                        <h4 className="font-body font-medium text-foreground">{role?.name}</h4>
                        {role?.required && (
                          <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Required</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {availableVolunteers?.length} available
                      </div>
                    </div>
                    {role?.description && (
                      <p className="text-sm text-muted-foreground mb-3">{role?.description}</p>
                    )}
                    <Select
                      options={volunteerOptions}
                      value={assignedVolunteer?.id || ''}
                      onChange={(value) => handleAssignVolunteer(role?.id, value)}
                      placeholder="Select volunteer"
                      className="mb-3"
                    />
                    {assignedVolunteer && (
                      <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={assignedVolunteer?.avatar}
                            alt={assignedVolunteer?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{assignedVolunteer?.name}</p>
                          <p className="text-xs text-muted-foreground">{assignedVolunteer?.role}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-success">
                          <Icon name="CheckCircle" size={14} />
                          <span>Assigned</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Volunteers */}
          <div className="w-80 border-l border-border p-6 overflow-y-auto">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">Available Volunteers</h3>
            
            <div className="space-y-3">
              {volunteers?.filter(volunteer => 
                  volunteer?.availability?.includes(service?.date) &&
                  !assignments?.some(a => a?.volunteerId === volunteer?.id)
                )?.map((volunteer) => (
                  <div
                    key={volunteer?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, volunteer)}
                    className="p-3 border border-border rounded-lg cursor-move hover:border-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={volunteer?.avatar}
                          alt={volunteer?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{volunteer?.name}</p>
                        <p className="text-xs text-muted-foreground">{volunteer?.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {volunteer?.skills?.slice(0, 2)?.map((skill) => (
                            <span key={skill} className="px-1 py-0.5 bg-muted text-xs rounded capitalize">
                              {skill?.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-1" />
                Drag volunteers to roles or use the dropdown selectors
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {assignments?.length} of {service?.requiredRoles?.length} roles assigned
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;