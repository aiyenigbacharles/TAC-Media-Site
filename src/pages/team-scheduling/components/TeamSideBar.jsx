import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const TeamSidebar = ({ volunteers, onVolunteerSelect, selectedVolunteer, isCollapsed, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Scheduled' },
    { value: 'conflicts', label: 'Has Conflicts' }
  ];

  const getVolunteerStatus = (volunteer) => {
    const upcomingAssignments = volunteer?.upcomingAssignments || 0;
    const conflicts = volunteer?.conflicts || 0;
    
    if (conflicts > 0) return { status: 'conflicts', color: 'text-destructive', icon: 'AlertTriangle' };
    if (upcomingAssignments > 0) return { status: 'busy', color: 'text-warning', icon: 'Clock' };
    return { status: 'available', color: 'text-success', icon: 'CheckCircle' };
  };

  const filteredVolunteers = volunteers?.filter(volunteer => {
      const matchesSearch = volunteer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           volunteer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      
      const status = getVolunteerStatus(volunteer);
      return matchesSearch && status?.status === filterBy;
    });

  const getSkillIcon = (skill) => {
    const skillIcons = {
      'audio': 'Volume2',
      'video': 'Video',
      'lighting': 'Lightbulb',
      'streaming': 'Wifi',
      'photography': 'Camera',
      'graphics': 'Image',
      'social-media': 'Share2'
    };
    return skillIcons?.[skill] || 'Star';
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="ChevronLeft"
            iconSize={16}
            className="w-full"
          />
        </div>
        <div className="flex-1 p-2 space-y-2">
          {filteredVolunteers?.slice(0, 8)?.map((volunteer) => {
            const status = getVolunteerStatus(volunteer);
            return (
              <button
                key={volunteer?.id}
                onClick={() => onVolunteerSelect(volunteer)}
                className={`w-full p-2 rounded-lg transition-colors duration-200 ${
                  selectedVolunteer?.id === volunteer?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
                title={volunteer?.name}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted mx-auto">
                    <Image
                      src={volunteer?.avatar}
                      alt={volunteer?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                    status?.status === 'available' ? 'bg-success' :
                    status?.status === 'busy' ? 'bg-warning' : 'bg-destructive'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Team Members</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
        
        <Input
          type="search"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />
        
        <div className="flex space-x-1">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filterBy === option?.value ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setFilterBy(option?.value)}
              className="text-xs"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Team List */}
      <div className="flex-1 overflow-y-auto">
        {filteredVolunteers?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No team members found</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredVolunteers?.map((volunteer) => {
              const status = getVolunteerStatus(volunteer);
              const isSelected = selectedVolunteer?.id === volunteer?.id;
              
              return (
                <div
                  key={volunteer?.id}
                  onClick={() => onVolunteerSelect(volunteer)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={volunteer?.avatar}
                          alt={volunteer?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                        status?.status === 'available' ? 'bg-success' :
                        status?.status === 'busy' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-body font-medium text-foreground truncate">{volunteer?.name}</h4>
                        <Icon name={status?.icon} size={14} className={status?.color} />
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">{volunteer?.role}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {volunteer?.skills?.slice(0, 3)?.map((skill) => (
                          <div key={skill} className="flex items-center space-x-1 px-2 py-1 bg-muted rounded text-xs">
                            <Icon name={getSkillIcon(skill)} size={12} />
                            <span className="capitalize">{skill?.replace('-', ' ')}</span>
                          </div>
                        ))}
                        {volunteer?.skills?.length > 3 && (
                          <div className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                            +{volunteer?.skills?.length - 3}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{volunteer?.upcomingAssignments || 0} upcoming</span>
                        {volunteer?.conflicts > 0 && (
                          <span className="text-destructive">{volunteer?.conflicts} conflicts</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Selected Volunteer Details */}
      {selectedVolunteer && (
        <div className="border-t border-border p-4 bg-muted/30">
          <h4 className="font-body font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
            >
              View Schedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="User"
              iconPosition="left"
              iconSize={16}
            >
              View Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSidebar;