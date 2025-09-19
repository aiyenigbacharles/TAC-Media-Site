import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ComposeAnnouncement = ({ isOpen, onClose, onSubmit, editingAnnouncement = null }) => {
  const [formData, setFormData] = useState({
    title: editingAnnouncement?.title || '',
    content: editingAnnouncement?.content || '',
    category: editingAnnouncement?.category || 'general',
    priority: editingAnnouncement?.priority || 'normal',
    recipients: editingAnnouncement?.recipients || [],
    scheduled: editingAnnouncement?.scheduled || false,
    scheduledDate: editingAnnouncement?.scheduledDate || '',
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'training', label: 'Training' },
    { value: 'event', label: 'Event' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const recipientOptions = [
    { value: 'all', label: 'All Team Members' },
    { value: 'admins', label: 'Administrators' },
    { value: 'leads', label: 'Media Leads' },
    { value: 'volunteers', label: 'Volunteers' },
    { value: 'audio', label: 'Audio Team' },
    { value: 'video', label: 'Video Team' },
    { value: 'lighting', label: 'Lighting Team' }
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

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData?.content?.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (formData?.recipients?.length === 0) {
      newErrors.recipients = 'Please select at least one recipient';
    }
    
    if (formData?.scheduled && !formData?.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        title: '',
        content: '',
        category: 'general',
        priority: 'normal',
        recipients: [],
        scheduled: false,
        scheduledDate: '',
        attachments: []
      });
    } catch (error) {
      console.error('Error submitting announcement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-pronounced w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            {editingAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Title"
              type="text"
              placeholder="Enter announcement title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />
            
            <Select
              label="Recipients"
              options={recipientOptions}
              value={formData?.recipients}
              onChange={(value) => handleInputChange('recipients', value)}
              multiple
              searchable
              error={errors?.recipients}
              required
            />
          </div>

          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Content
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Write your announcement content here..."
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              required
            />
            {errors?.content && (
              <p className="mt-1 text-sm text-destructive">{errors?.content}</p>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="Upload" size={24} className="text-muted-foreground mb-2" />
                <span className="font-body text-sm text-muted-foreground">
                  Click to upload files or drag and drop
                </span>
              </label>
            </div>
            
            {formData?.attachments?.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData?.attachments?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                      <span className="font-caption text-sm text-foreground">{file?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => removeAttachment(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <Checkbox
              label="Schedule for later"
              checked={formData?.scheduled}
              onChange={(e) => handleInputChange('scheduled', e?.target?.checked)}
            />
            
            {formData?.scheduled && (
              <Input
                label="Scheduled Date & Time"
                type="datetime-local"
                value={formData?.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                error={errors?.scheduledDate}
                required
              />
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            {editingAnnouncement ? 'Update' : 'Send'} Announcement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComposeAnnouncement;