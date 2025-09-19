import React from 'react';
import Icon from '../../../components/AppIcon';

const MediaStats = ({ stats, isLoading }) => {
  const statItems = [
    {
      label: 'Total Files',
      value: stats?.totalFiles,
      icon: 'Files',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Images',
      value: stats?.images,
      icon: 'Image',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Videos',
      value: stats?.videos,
      icon: 'Video',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Audio Files',
      value: stats?.audio,
      icon: 'Music',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Documents',
      value: stats?.documents,
      icon: 'FileText',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'Storage Used',
      value: stats?.storageUsed,
      icon: 'HardDrive',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const formatStorageSize = (bytes) => {
    if (bytes === 0) return '0 GB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(1)) + ' ' + sizes?.[i];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-lg mb-3"></div>
            <div className="h-6 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 hover:shadow-gentle transition-shadow duration-250">
          <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center mb-3`}>
            <Icon name={item?.icon} size={20} className={item?.color} />
          </div>
          <div className="space-y-1">
            <p className="font-heading font-semibold text-lg text-foreground">
              {item?.label === 'Storage Used' ? formatStorageSize(item?.value) : item?.value?.toLocaleString()}
            </p>
            <p className="font-caption text-sm text-muted-foreground">{item?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaStats;