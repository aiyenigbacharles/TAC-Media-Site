import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Import components
import UserTable from './components/UserTable';
import UserDetailPanel from './components/UserDetailPanel';
import BulkActionsBar from './components/BulkActionsBar';
import InviteUserModal from './components/InviteUserModal';
import PermissionMatrix from './components/PermissionMatrix';
import ActivityTracker from './components/ActivityTracker';

const UserManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [showActivityTracker, setShowActivityTracker] = useState(false);
  const [currentView, setCurrentView] = useState('table');

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 'user1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@churchmedia.org',
      phone: '+1 (555) 123-4567',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      skills: ['Camera Operation', 'Audio Engineering'],
      availability: ['sunday_morning', 'wednesday'],
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      notifications: { email: true, sms: true, push: true },
      bio: 'Experienced media coordinator with 5+ years in church production'
    },
    {
      id: 'user2',
      name: 'Michael Chen',
      email: 'michael.chen@churchmedia.org',
      phone: '+1 (555) 234-5678',
      role: 'media_lead',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      skills: ['Live Streaming', 'Video Editing'],
      availability: ['sunday_morning', 'sunday_evening'],
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
      notifications: { email: true, sms: false, push: true },
      bio: 'Technical lead specializing in live streaming and video production'
    },
    {
      id: 'user3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@churchmedia.org',
      phone: '+1 (555) 345-6789',
      role: 'volunteer',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      skills: ['Graphics Design', 'Lighting Design'],
      availability: ['sunday_morning', 'special_events'],
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
      notifications: { email: true, sms: false, push: false },
      bio: 'Creative volunteer with expertise in visual design and lighting'
    },
    {
      id: 'user4',
      name: 'David Kim',
      email: 'david.kim@churchmedia.org',
      phone: '+1 (555) 456-7890',
      role: 'volunteer',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      skills: ['Audio Engineering'],
      availability: ['wednesday'],
      lastActivity: new Date(Date.now() - 48 * 60 * 60 * 1000),
      notifications: { email: false, sms: false, push: false },
      bio: 'Audio specialist available for midweek services'
    },
    {
      id: 'user5',
      name: 'Jessica Thompson',
      email: 'jessica.thompson@churchmedia.org',
      phone: '+1 (555) 567-8901',
      role: 'media_lead',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      skills: ['Camera Operation', 'Live Streaming'],
      availability: ['sunday_evening', 'rehearsals'],
      lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
      notifications: { email: true, sms: true, push: true },
      bio: 'New team member with broadcast television experience'
    }
  ]);

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'media_lead', label: 'Media Lead' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const viewOptions = [
    { value: 'table', label: 'User Table', icon: 'Users' },
    { value: 'activity', label: 'Activity Tracker', icon: 'Activity' }
  ];

  // Filter users based on search and filters
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = !roleFilter || user?.role === roleFilter;
    const matchesStatus = !statusFilter || user?.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserToggle = (userId, checked) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev?.filter(id => id !== userId)
    );
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for users:', selectedUsers);
    // Implement bulk action logic here
    setSelectedUsers([]);
  };

  const handleInviteUser = async (inviteData) => {
    console.log('Inviting user:', inviteData);
    // Implement user invitation logic here
    // This would typically send an API request to create the invitation
  };

  const handleSaveUser = (userData) => {
    setUsers(prev => 
      prev?.map(user => 
        user?.id === selectedUser?.id 
          ? { ...user, ...userData }
          : user
      )
    );
    setSelectedUser(null);
  };

  const handleSavePermissions = (permissions) => {
    console.log('Saving permissions:', permissions);
    // Implement permission save logic here
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Management - ChurchMedia Pro</title>
        <meta name="description" content="Manage team members, roles, and permissions for your church media ministry" />
      </Helmet>
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header sidebarCollapsed={sidebarCollapsed} />
        
        <main className="pt-16 pb-20 lg:pb-8">
          <div className="px-6 py-8">
            <BreadcrumbNavigation />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-4 lg:mb-0">
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">User Management</h1>
                <p className="font-body text-muted-foreground">
                  Manage team members, assign roles, and control access permissions
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Shield"
                  onClick={() => setShowPermissionMatrix(true)}
                >
                  Permissions
                </Button>
                <Button
                  variant="default"
                  iconName="UserPlus"
                  onClick={() => setShowInviteModal(true)}
                >
                  Invite User
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-caption text-sm text-muted-foreground">Total Users</p>
                    <p className="font-heading font-bold text-2xl text-foreground">{users?.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-caption text-sm text-muted-foreground">Active Users</p>
                    <p className="font-heading font-bold text-2xl text-foreground">
                      {users?.filter(u => u?.status === 'active')?.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="UserCheck" size={24} className="text-success" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-caption text-sm text-muted-foreground">Admins</p>
                    <p className="font-heading font-bold text-2xl text-foreground">
                      {users?.filter(u => u?.role === 'admin')?.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={24} className="text-destructive" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-caption text-sm text-muted-foreground">Pending</p>
                    <p className="font-heading font-bold text-2xl text-foreground">
                      {users?.filter(u => u?.status === 'pending')?.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <h3 className="font-heading font-medium text-lg text-foreground mb-4 lg:mb-0">
                  Team Members
                </h3>
                
                <div className="flex items-center space-x-2">
                  {viewOptions?.map((option) => (
                    <Button
                      key={option?.value}
                      variant={currentView === option?.value ? 'default' : 'outline'}
                      size="sm"
                      iconName={option?.icon}
                      onClick={() => setCurrentView(option?.value)}
                    >
                      {option?.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Input
                  type="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
                <Select
                  options={roleOptions}
                  value={roleFilter}
                  onChange={setRoleFilter}
                  placeholder="Filter by role"
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                />
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('');
                    setStatusFilter('');
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            <BulkActionsBar
              selectedCount={selectedUsers?.length}
              onBulkAction={handleBulkAction}
              onClearSelection={() => setSelectedUsers([])}
            />

            {/* Main Content */}
            {currentView === 'table' ? (
              <UserTable
                users={filteredUsers}
                onUserSelect={setSelectedUser}
                selectedUsers={selectedUsers}
                onUserToggle={handleUserToggle}
                onRoleChange={(userId, newRole) => {
                  setUsers(prev => 
                    prev?.map(user => 
                      user?.id === userId 
                        ? { ...user, role: newRole }
                        : user
                    )
                  );
                }}
                onStatusChange={(userId, newStatus) => {
                  setUsers(prev => 
                    prev?.map(user => 
                      user?.id === userId 
                        ? { ...user, status: newStatus }
                        : user
                    )
                  );
                }}
              />
            ) : (
              <ActivityTracker users={users} />
            )}
          </div>
        </main>
      </div>
      {/* Modals */}
      <UserDetailPanel
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onSave={handleSaveUser}
      />
      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteUser}
      />
      <PermissionMatrix
        isOpen={showPermissionMatrix}
        onClose={() => setShowPermissionMatrix(false)}
        onSave={handleSavePermissions}
      />
    </div>
  );
};

export default UserManagement;