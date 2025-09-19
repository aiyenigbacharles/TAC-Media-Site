import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserDetailPanel = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    skills: [],
    availability: [],
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    bio: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role: user?.role || '',
        status: user?.status || '',
        skills: user?.skills || [],
        availability: user?.availability || [],
        notifications: user?.notifications || {
          email: true,
          sms: false,
          push: true
        },
        bio: user?.bio || ''
      });
    }
  }, [user]);

  const roleOptions = [
    { value: 'admin', label: 'Admin', description: 'Full system access and user management' },
    { value: 'media_lead', label: 'Media Lead', description: 'Team coordination and service planning' },
    { value: 'volunteer', label: 'Volunteer', description: 'Basic access for assigned tasks' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const skillOptions = [
    { value: 'camera', label: 'Camera Operation' },
    { value: 'audio', label: 'Audio Engineering' },
    { value: 'lighting', label: 'Lighting Design' },
    { value: 'streaming', label: 'Live Streaming' },
    { value: 'editing', label: 'Video Editing' },
    { value: 'graphics', label: 'Graphics Design' }
  ];

  const availabilityOptions = [
    { value: 'sunday_morning', label: 'Sunday Morning' },
    { value: 'sunday_evening', label: 'Sunday Evening' },
    { value: 'wednesday', label: 'Wednesday Service' },
    { value: 'special_events', label: 'Special Events' },
    { value: 'rehearsals', label: 'Rehearsals' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNotificationChange = (type, checked) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [type]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData?.role) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">Edit User</h2>
              <p className="font-caption text-sm text-muted-foreground">{user?.name}</p>
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
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-heading font-medium text-lg text-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
                <Input
                  label="Bio"
                  type="text"
                  value={formData?.bio}
                  onChange={(e) => handleInputChange('bio', e?.target?.value)}
                  placeholder="Brief description..."
                />
              </div>
            </div>

            {/* Role & Status */}
            <div>
              <h3 className="font-heading font-medium text-lg text-foreground mb-4">Role & Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors?.role}
                  required
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-heading font-medium text-lg text-foreground mb-4">Skills & Expertise</h3>
              <Select
                label="Technical Skills"
                options={skillOptions}
                value={formData?.skills}
                onChange={(value) => handleInputChange('skills', value)}
                multiple
                searchable
                description="Select all applicable skills"
              />
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-heading font-medium text-lg text-foreground mb-4">Availability</h3>
              <Select
                label="Service Availability"
                options={availabilityOptions}
                value={formData?.availability}
                onChange={(value) => handleInputChange('availability', value)}
                multiple
                description="When is this person available to serve?"
              />
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="font-heading font-medium text-lg text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Email Notifications"
                  description="Receive schedule updates and announcements via email"
                  checked={formData?.notifications?.email}
                  onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
                />
                <Checkbox
                  label="SMS Notifications"
                  description="Receive urgent updates via text message"
                  checked={formData?.notifications?.sms}
                  onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
                />
                <Checkbox
                  label="Push Notifications"
                  description="Receive real-time notifications in the app"
                  checked={formData?.notifications?.push}
                  onChange={(e) => handleNotificationChange('push', e?.target?.checked)}
                />
              </div>
            </div>
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
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;