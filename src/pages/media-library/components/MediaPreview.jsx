import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MediaPreview = ({ item, isOpen, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    category: item?.category || 'worship',
    tags: item?.tags || []
  });

  const categoryOptions = [
    { value: 'worship', label: 'Worship' },
    { value: 'sermons', label: 'Sermons' },
    { value: 'events', label: 'Events' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'backgrounds', label: 'Backgrounds' },
    { value: 'graphics', label: 'Graphics' },
    { value: 'music', label: 'Music' }
  ];

  const tagOptions = [
    { value: 'christmas', label: 'Christmas' },
    { value: 'easter', label: 'Easter' },
    { value: 'baptism', label: 'Baptism' },
    { value: 'communion', label: 'Communion' },
    { value: 'youth', label: 'Youth' },
    { value: 'children', label: 'Children' },
    { value: 'worship', label: 'Worship' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'missions', label: 'Missions' },
    { value: 'outreach', label: 'Outreach' }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    onSave({ ...item, ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: item?.name || '',
      description: item?.description || '',
      category: item?.category || 'worship',
      tags: item?.tags || []
    });
    setIsEditing(false);
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">Media Preview</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => window.open(item?.url, '_blank')}
            >
              Download
            </Button>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
          {/* Media Display */}
          <div className="flex-1 bg-muted/30 flex items-center justify-center p-6">
            {item?.type === 'image' ? (
              <div className="max-w-full max-h-full">
                <Image
                  src={item?.url}
                  alt={item?.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-medium"
                />
              </div>
            ) : item?.type === 'video' ? (
              <video
                controls
                className="max-w-full max-h-full rounded-lg shadow-medium"
                poster={item?.thumbnail}
              >
                <source src={item?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : item?.type === 'audio' ? (
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
                  <Icon name="Music" size={64} className="text-muted-foreground" />
                </div>
                <audio controls className="w-full max-w-md">
                  <source src={item?.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-6">
                  <Icon name="FileText" size={64} className="text-muted-foreground" />
                </div>
                <p className="font-body text-muted-foreground mb-4">Document preview not available</p>
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  onClick={() => window.open(item?.url, '_blank')}
                >
                  Open Document
                </Button>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-96 border-l border-border overflow-y-auto">
            <div className="p-6">
              {!isEditing ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground">Details</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">Name</label>
                      <p className="font-body text-foreground mt-1">{item?.name}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">Description</label>
                      <p className="font-body text-foreground mt-1">{item?.description || 'No description'}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">Category</label>
                      <p className="font-body text-foreground mt-1 capitalize">{item?.category}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">File Type</label>
                      <p className="font-body text-foreground mt-1 capitalize">{item?.type}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">File Size</label>
                      <p className="font-body text-foreground mt-1">{formatFileSize(item?.size)}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">Created</label>
                      <p className="font-body text-foreground mt-1">{formatDate(item?.createdAt)}</p>
                    </div>

                    <div>
                      <label className="font-body font-medium text-sm text-muted-foreground">Modified</label>
                      <p className="font-body text-foreground mt-1">{formatDate(item?.modifiedAt)}</p>
                    </div>

                    {item?.tags && item?.tags?.length > 0 && (
                      <div>
                        <label className="font-body font-medium text-sm text-muted-foreground">Tags</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground">Edit Details</h3>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={editData?.name}
                      onChange={(e) => setEditData({ ...editData, name: e?.target?.value })}
                    />

                    <Input
                      label="Description"
                      value={editData?.description}
                      onChange={(e) => setEditData({ ...editData, description: e?.target?.value })}
                    />

                    <Select
                      label="Category"
                      options={categoryOptions}
                      value={editData?.category}
                      onChange={(value) => setEditData({ ...editData, category: value })}
                    />

                    <Select
                      label="Tags"
                      options={tagOptions}
                      value={editData?.tags}
                      onChange={(value) => setEditData({ ...editData, tags: value })}
                      multiple
                      searchable
                    />

                    <div className="flex items-center space-x-3 pt-4">
                      <Button variant="default" onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Usage History */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-heading font-medium text-foreground mb-4">Usage History</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Sunday Service</span>
                    <span className="font-caption text-muted-foreground">Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Christmas Event</span>
                    <span className="font-caption text-muted-foreground">Dec 10, 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Youth Meeting</span>
                    <span className="font-caption text-muted-foreground">Dec 8, 2024</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(item?.id)}
                  fullWidth
                >
                  Delete File
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;