import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaGrid = ({ 
  mediaItems, 
  viewMode, 
  selectedItems, 
  onSelectItem, 
  onPreviewItem,
  onDeleteItem,
  isLoading 
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Video';
      case 'audio':
        return 'Music';
      case 'document':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'image':
        return 'bg-blue-100 text-blue-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      case 'audio':
        return 'bg-green-100 text-green-700';
      case 'document':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 animate-pulse">
            <div className="aspect-video bg-muted rounded-lg mb-3"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        mediaItems?.forEach(item => onSelectItem(item?.id, true));
                      } else {
                        mediaItems?.forEach(item => onSelectItem(item?.id, false));
                      }
                    }}
                  />
                </th>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">Name</th>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">Type</th>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">Size</th>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">Modified</th>
                <th className="text-left py-3 px-4 font-heading font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems?.map((item) => (
                <tr key={item?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedItems?.includes(item?.id)}
                      onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {item?.type === 'image' ? (
                          <Image
                            src={item?.thumbnail}
                            alt={item?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon name={getFileIcon(item?.type)} size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">{item?.name}</p>
                        <p className="font-caption text-xs text-muted-foreground">{item?.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(item?.type)}`}>
                      {item?.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">
                    {formatFileSize(item?.size)}
                  </td>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">
                    {formatDate(item?.modifiedAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onPreviewItem(item)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => window.open(item?.url, '_blank')}
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onDeleteItem(item?.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mediaItems?.map((item) => (
        <div
          key={item?.id}
          className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-medium transition-all duration-250 cursor-pointer"
          onMouseEnter={() => setHoveredItem(item?.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => onPreviewItem(item)}
        >
          <div className="relative aspect-video bg-muted">
            {item?.type === 'image' ? (
              <Image
                src={item?.thumbnail}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name={getFileIcon(item?.type)} size={48} className="text-muted-foreground" />
              </div>
            )}
            
            {/* Overlay controls */}
            {hoveredItem === item?.id && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  iconName="Eye"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onPreviewItem(item);
                  }}
                >
                  Preview
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  iconName="Download"
                  onClick={(e) => {
                    e?.stopPropagation();
                    window.open(item?.url, '_blank');
                  }}
                >
                  Download
                </Button>
              </div>
            )}

            {/* Selection checkbox */}
            <div className="absolute top-2 left-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border bg-card"
                checked={selectedItems?.includes(item?.id)}
                onChange={(e) => {
                  e?.stopPropagation();
                  onSelectItem(item?.id, e?.target?.checked);
                }}
              />
            </div>

            {/* File type badge */}
            <div className="absolute top-2 right-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(item?.type)}`}>
                {item?.type}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-body font-medium text-foreground mb-1 truncate">{item?.name}</h3>
            <p className="font-caption text-sm text-muted-foreground mb-2 line-clamp-2">{item?.description}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-caption">{formatFileSize(item?.size)}</span>
              <span className="font-caption">{formatDate(item?.modifiedAt)}</span>
            </div>

            {item?.tags && item?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item?.tags?.slice(0, 3)?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {item?.tags?.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                    +{item?.tags?.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;