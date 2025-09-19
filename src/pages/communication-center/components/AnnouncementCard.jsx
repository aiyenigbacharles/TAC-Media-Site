import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AnnouncementCard = ({ announcement, onEdit, onDelete, currentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'normal':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'schedule':
        return 'Calendar';
      case 'equipment':
        return 'Settings';
      case 'training':
        return 'GraduationCap';
      case 'event':
        return 'Star';
      default:
        return 'MessageSquare';
    }
  };

  const canEdit = currentUser?.role === 'Admin' || currentUser?.role === 'Media Lead' || announcement?.author?.id === currentUser?.id;

  return (
    <div className="bg-card border border-border rounded-lg shadow-gentle hover:shadow-medium transition-all duration-250">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={announcement?.author?.avatar}
                alt={announcement?.author?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-heading font-semibold text-foreground truncate">
                  {announcement?.title}
                </h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement?.priority)}`}>
                  {announcement?.priority}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="font-body">{announcement?.author?.name}</span>
                <span className="font-caption">{formatDate(announcement?.createdAt)}</span>
                <div className="flex items-center space-x-1">
                  <Icon name={getCategoryIcon(announcement?.category)} size={14} />
                  <span className="font-caption capitalize">{announcement?.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          {canEdit && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
                onClick={() => setShowActions(!showActions)}
                className="ml-2"
              />
              {showActions && (
                <div className="absolute top-full right-0 mt-1 w-32 bg-popover border border-border rounded-lg shadow-medium z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onEdit(announcement);
                        setShowActions(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="Edit" size={14} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(announcement?.id);
                        setShowActions(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200"
                    >
                      <Icon name="Trash2" size={14} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className={`font-body text-foreground ${isExpanded ? '' : 'line-clamp-3'}`}>
          {announcement?.content}
        </div>
        
        {announcement?.content?.length > 200 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </Button>
        )}

        {/* Attachments */}
        {announcement?.attachments && announcement?.attachments?.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-body font-medium text-sm text-foreground">Attachments</h4>
            <div className="space-y-2">
              {announcement?.attachments?.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                  <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                  <span className="font-caption text-sm text-foreground flex-1">{attachment?.name}</span>
                  <Button variant="ghost" size="sm" iconName="Download" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="px-4 py-3 bg-muted/50 border-t border-border rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span className="font-caption">{announcement?.recipients?.length} recipients</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span className="font-caption">{announcement?.readCount} read</span>
            </div>
          </div>
          
          {announcement?.scheduled && (
            <div className="flex items-center space-x-1 text-sm text-warning">
              <Icon name="Clock" size={14} />
              <span className="font-caption">Scheduled</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;