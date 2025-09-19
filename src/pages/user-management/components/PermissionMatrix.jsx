import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PermissionMatrix = ({ isOpen, onClose, onSave }) => {
  const [permissions, setPermissions] = useState({
    admin: {
      user_management: true,
      team_scheduling: true,
      media_library: true,
      communication: true,
      system_settings: true,
      reports: true,
      bulk_actions: true,
      export_data: true
    },
    media_lead: {
      user_management: false,
      team_scheduling: true,
      media_library: true,
      communication: true,
      system_settings: false,
      reports: true,
      bulk_actions: true,
      export_data: true
    },
    volunteer: {
      user_management: false,
      team_scheduling: false,
      media_library: false,
      communication: false,
      system_settings: false,
      reports: false,
      bulk_actions: false,
      export_data: false
    }
  });

  const permissionCategories = [
    {
      id: 'user_management',
      label: 'User Management',
      description: 'Create, edit, and manage user accounts and roles'
    },
    {
      id: 'team_scheduling',
      label: 'Team Scheduling',
      description: 'Create and manage service schedules and assignments'
    },
    {
      id: 'media_library',
      label: 'Media Library',
      description: 'Upload, organize, and manage media resources'
    },
    {
      id: 'communication',
      label: 'Communication',
      description: 'Send announcements and manage team communications'
    },
    {
      id: 'system_settings',
      label: 'System Settings',
      description: 'Configure application settings and preferences'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      description: 'View and generate system reports and analytics'
    },
    {
      id: 'bulk_actions',
      label: 'Bulk Actions',
      description: 'Perform actions on multiple items simultaneously'
    },
    {
      id: 'export_data',
      label: 'Export Data',
      description: 'Export schedules, reports, and other data'
    }
  ];

  const roles = [
    { id: 'admin', label: 'Admin', color: 'text-destructive' },
    { id: 'media_lead', label: 'Media Lead', color: 'text-primary' },
    { id: 'volunteer', label: 'Volunteer', color: 'text-success' }
  ];

  const handlePermissionChange = (role, permission, checked) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev?.[role],
        [permission]: checked
      }
    }));
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">Permission Matrix</h2>
              <p className="font-caption text-sm text-muted-foreground">Configure role-based access permissions</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4">
                    <span className="font-heading font-medium text-foreground">Permission</span>
                  </th>
                  {roles?.map((role) => (
                    <th key={role?.id} className="text-center py-3 px-4 min-w-[120px]">
                      <div className="flex flex-col items-center">
                        <span className={`font-heading font-medium ${role?.color}`}>
                          {role?.label}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionCategories?.map((category) => (
                  <tr key={category?.id} className="border-b border-border hover:bg-muted/30">
                    <td className="py-4 pr-4">
                      <div>
                        <h4 className="font-body font-medium text-foreground">{category?.label}</h4>
                        <p className="font-caption text-sm text-muted-foreground mt-1">
                          {category?.description}
                        </p>
                      </div>
                    </td>
                    {roles?.map((role) => (
                      <td key={role?.id} className="text-center py-4 px-4">
                        <Checkbox
                          checked={permissions?.[role?.id]?.[category?.id]}
                          onChange={(e) => handlePermissionChange(role?.id, category?.id, e?.target?.checked)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Permission Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles?.map((role) => {
              const rolePermissions = permissions?.[role?.id];
              const enabledCount = Object.values(rolePermissions)?.filter(Boolean)?.length;
              const totalCount = Object.keys(rolePermissions)?.length;
              
              return (
                <div key={role?.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-heading font-medium ${role?.color}`}>{role?.label}</h4>
                    <span className="font-caption text-sm text-muted-foreground">
                      {enabledCount}/{totalCount}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {permissionCategories?.map((category) => (
                      <div key={category?.id} className="flex items-center justify-between">
                        <span className="font-caption text-xs text-muted-foreground">
                          {category?.label}
                        </span>
                        <Icon
                          name={rolePermissions?.[category?.id] ? 'Check' : 'X'}
                          size={14}
                          className={rolePermissions?.[category?.id] ? 'text-success' : 'text-muted-foreground'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
          >
            Save Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;