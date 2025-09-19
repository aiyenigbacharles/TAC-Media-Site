import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecipientSelector = ({ isOpen, onClose, onConfirm, selectedRecipients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(selectedRecipients);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Admin', email: 'sarah@church.org', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Mike Chen', role: 'Media Lead', email: 'mike@church.org', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 3, name: 'Emily Davis', role: 'Volunteer', email: 'emily@church.org', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, name: 'David Wilson', role: 'Volunteer', email: 'david@church.org', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, name: 'Lisa Brown', role: 'Media Lead', email: 'lisa@church.org', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 6, name: 'Tom Anderson', role: 'Volunteer', email: 'tom@church.org', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }
  ];

  const groups = [
    { id: 'all', name: 'All Team Members', count: teamMembers?.length },
    { id: 'admins', name: 'Administrators', count: teamMembers?.filter(m => m?.role === 'Admin')?.length },
    { id: 'leads', name: 'Media Leads', count: teamMembers?.filter(m => m?.role === 'Media Lead')?.length },
    { id: 'volunteers', name: 'Volunteers', count: teamMembers?.filter(m => m?.role === 'Volunteer')?.length },
    { id: 'audio', name: 'Audio Team', count: 8 },
    { id: 'video', name: 'Video Team', count: 6 },
    { id: 'lighting', name: 'Lighting Team', count: 4 }
  ];

  const filteredMembers = teamMembers?.filter(member =>
    member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    member?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    member?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleGroupToggle = (groupId) => {
    setSelectedGroups(prev =>
      prev?.includes(groupId)
        ? prev?.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSelectAll = () => {
    const allUserIds = teamMembers?.map(member => member?.id);
    setSelectedUsers(allUserIds);
  };

  const handleClearAll = () => {
    setSelectedUsers([]);
    setSelectedGroups([]);
  };

  const handleConfirm = () => {
    onConfirm({
      users: selectedUsers,
      groups: selectedGroups
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-pronounced w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Select Recipients
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Search and Actions */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              iconName="CheckSquare"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              iconName="Square"
            >
              Clear All
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {selectedUsers?.length + selectedGroups?.length} selected
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          {/* Groups */}
          <div className="p-6 border-b border-border">
            <h3 className="font-heading font-medium text-foreground mb-3">Groups</h3>
            <div className="space-y-2">
              {groups?.map(group => (
                <div key={group?.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg">
                  <Checkbox
                    checked={selectedGroups?.includes(group?.id)}
                    onChange={() => handleGroupToggle(group?.id)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">{group?.name}</span>
                    <span className="text-sm text-muted-foreground">({group?.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Members */}
          <div className="p-6">
            <h3 className="font-heading font-medium text-foreground mb-3">Team Members</h3>
            <div className="space-y-2">
              {filteredMembers?.map(member => (
                <div key={member?.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg">
                  <Checkbox
                    checked={selectedUsers?.includes(member?.id)}
                    onChange={() => handleUserToggle(member?.id)}
                  />
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                    <img
                      src={member?.avatar}
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-body font-medium text-foreground">{member?.name}</div>
                    <div className="text-sm text-muted-foreground">{member?.role} • {member?.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            iconName="Check"
            iconPosition="left"
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipientSelector;