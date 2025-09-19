import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const UserTable = ({ users, onUserSelect, onRoleChange, onStatusChange, selectedUsers, onUserToggle }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'media_lead', label: 'Media Lead' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive text-destructive-foreground';
      case 'media_lead':
        return 'bg-primary text-primary-foreground';
      case 'volunteer':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatLastActivity = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return activityDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === users?.length}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      users?.forEach(user => onUserToggle(user?.id, true));
                    } else {
                      users?.forEach(user => onUserToggle(user?.id, false));
                    }
                  }}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 font-heading font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Name</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 font-heading font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Role</span>
                  <Icon 
                    name={sortField === 'role' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-medium text-sm text-foreground">Contact</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 font-heading font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Last Activity</span>
                  <Icon 
                    name={sortField === 'lastActivity' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-medium text-sm text-foreground">Status</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-medium text-sm text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => onUserToggle(user?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">{user?.name}</p>
                      <p className="font-caption text-sm text-muted-foreground">{user?.skills?.join(', ')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.replace('_', ' ')?.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-body text-sm text-foreground">{user?.email}</p>
                    <p className="font-caption text-sm text-muted-foreground">{user?.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="font-body text-sm text-muted-foreground">
                    {formatLastActivity(user?.lastActivity)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status?.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onUserSelect(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreVertical"
                    >
                      More
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedUsers?.map((user) => (
          <div key={user?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedUsers?.includes(user?.id)}
                onChange={(e) => onUserToggle(user?.id, e?.target?.checked)}
                className="mt-1 rounded border-border"
              />
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-body font-medium text-foreground truncate">{user?.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status?.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role?.replace('_', ' ')?.toUpperCase()}
                    </span>
                    <p className="font-caption text-xs text-muted-foreground">
                      {formatLastActivity(user?.lastActivity)}
                    </p>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{user?.email}</p>
                  <p className="font-caption text-xs text-muted-foreground">{user?.skills?.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onUserSelect(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;