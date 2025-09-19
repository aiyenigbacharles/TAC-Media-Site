import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MediaUpload = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const categoryOptions = [
    { value: 'worship', label: 'Worship' },
    { value: 'sermons', label: 'Sermons' },
    { value: 'events', label: 'Events' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'backgrounds', label: 'Backgrounds' },
    { value: 'graphics', label: 'Graphics' },
    { value: 'music', label: 'Music' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file?.name,
      size: file?.size,
      type: getFileType(file?.type),
      category: 'worship',
      description: '',
      tags: []
    }));
    
    setUploadFiles(prev => [...prev, ...fileArray]);
  };

  const getFileType = (mimeType) => {
    if (mimeType?.startsWith('image/')) return 'image';
    if (mimeType?.startsWith('video/')) return 'video';
    if (mimeType?.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const updateFileData = (fileId, field, value) => {
    setUploadFiles(prev => 
      prev?.map(file => 
        file?.id === fileId ? { ...file, [field]: value } : file
      )
    );
  };

  const removeFile = (fileId) => {
    setUploadFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  const handleUpload = async () => {
    for (const fileData of uploadFiles) {
      setUploadProgress(prev => ({ ...prev, [fileData?.id]: 0 }));
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev?.[fileData?.id] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [fileData?.id]: currentProgress + 10 };
        });
      }, 200);
    }

    // Simulate completion after 2 seconds
    setTimeout(() => {
      onUpload(uploadFiles);
      setUploadFiles([]);
      setUploadProgress({});
      onClose();
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">Upload Media Files</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-medium text-lg text-foreground mb-2">
              Drop files here or click to browse
            </h3>
            <p className="font-body text-muted-foreground mb-4">
              Support for images, videos, audio files, and documents
            </p>
            <Button
              variant="outline"
              iconName="FolderOpen"
              onClick={() => fileInputRef?.current?.click()}
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e?.target?.files)}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>

          {/* File List */}
          {uploadFiles?.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-medium text-lg text-foreground">
                Files to Upload ({uploadFiles?.length})
              </h3>
              
              {uploadFiles?.map((fileData) => (
                <div key={fileData?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Icon 
                          name={
                            fileData?.type === 'image' ? 'Image' :
                            fileData?.type === 'video' ? 'Video' :
                            fileData?.type === 'audio' ? 'Music' : 'FileText'
                          } 
                          size={24} 
                          className="text-muted-foreground" 
                        />
                      </div>
                      <div>
                        <h4 className="font-body font-medium text-foreground">{fileData?.name}</h4>
                        <p className="font-caption text-sm text-muted-foreground">
                          {formatFileSize(fileData?.size)} • {fileData?.type}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => removeFile(fileData?.id)}
                    />
                  </div>

                  {/* Upload Progress */}
                  {uploadProgress?.[fileData?.id] !== undefined && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-caption text-sm text-muted-foreground">Uploading...</span>
                        <span className="font-caption text-sm text-muted-foreground">
                          {uploadProgress?.[fileData?.id]}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress?.[fileData?.id]}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Category"
                      options={categoryOptions}
                      value={fileData?.category}
                      onChange={(value) => updateFileData(fileData?.id, 'category', value)}
                    />

                    <Input
                      label="Description"
                      placeholder="Brief description of the file"
                      value={fileData?.description}
                      onChange={(e) => updateFileData(fileData?.id, 'description', e?.target?.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="font-body text-sm text-muted-foreground">
            {uploadFiles?.length > 0 && `${uploadFiles?.length} file(s) ready to upload`}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              iconName="Upload"
              onClick={handleUpload}
              disabled={uploadFiles?.length === 0}
            >
              Upload Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;