import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AnnouncementCard from './components/AnnouncementCard';
import ComposeAnnouncement from './components/ComposeAnnouncement';
import MessageFilters from './components/MessageFilters';
import QuickActions from './components/QuickActions';
import RecipientSelector from './components/RecipientSelector';

const CommunicationCenter = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isRecipientSelectorOpen, setIsRecipientSelectorOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    author: '',
    status: '',
    fromDate: '',
    toDate: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('cards');

  // Mock current user
  const currentUser = {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Admin',
    email: 'sarah@church.org'
  };

  // Mock announcements data
  const mockAnnouncements = [
    {
      id: 1,
      title: 'Sunday Service Schedule Update',
      content: `Important update regarding this Sunday's service schedule.\n\nDue to the special guest speaker, we'll be starting 15 minutes earlier than usual. Please ensure all equipment is set up and tested by 8:30 AM.\n\nAdditional requirements:\n• Extra microphones for the choir\n• Video recording for online streaming\n• Special lighting setup for the baptism ceremony\n\nPlease confirm your availability and let me know if you have any questions.`,
      author: {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      category: 'schedule',
      priority: 'high',
      createdAt: new Date('2025-01-15T10:30:00'),
      recipients: [1, 2, 3, 4, 5, 6],
      readCount: 4,
      scheduled: false,
      attachments: [
        { name: 'service-runsheet.pdf', size: '245 KB' },
        { name: 'equipment-checklist.docx', size: '128 KB' }
      ]
    },
    {
      id: 2,
      title: 'New Equipment Training Session',
      content: `We've received the new digital mixing console and it's time for everyone to get familiar with it.\n\nTraining session details:\n• Date: Saturday, January 20th\n• Time: 2:00 PM - 4:00 PM\n• Location: Main sanctuary\n• Instructor: Mike Chen\n\nThis training is mandatory for all audio team members. Please bring your notebooks and be prepared for hands-on practice.`,
      author: {
        id: 2,
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      category: 'training',
      priority: 'normal',
      createdAt: new Date('2025-01-14T14:15:00'),
      recipients: [3, 4, 6],
      readCount: 2,
      scheduled: false,
      attachments: []
    },
    {
      id: 3,
      title: 'Equipment Maintenance Reminder',
      content: `Monthly equipment maintenance is due this week. Please check your assigned equipment and report any issues.\n\nMaintenance checklist:\n• Clean all microphones and cables\n• Test backup systems\n• Update software on all devices\n• Check battery levels in wireless equipment\n\nDeadline: Friday, January 19th`,
      author: {
        id: 3,
        name: 'Emily Davis',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      category: 'equipment',
      priority: 'normal',
      createdAt: new Date('2025-01-13T09:00:00'),
      recipients: [1, 2, 4, 5],
      readCount: 3,
      scheduled: false,
      attachments: [
        { name: 'maintenance-checklist.pdf', size: '156 KB' }
      ]
    },
    {
      id: 4,
      title: 'Urgent: Sound System Issue',
      content: `We're experiencing intermittent issues with the main sound system. The problem seems to be with the main amplifier.\n\nImmediate action required:\n• Switch to backup system for tonight's service\n• Contact repair technician first thing Monday morning\n• Test all backup equipment before service\n\nPlease acknowledge receipt of this message immediately.`,
      author: {
        id: 2,
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      category: 'equipment',
      priority: 'urgent',
      createdAt: new Date('2025-01-12T16:45:00'),
      recipients: [1, 2],
      readCount: 2,
      scheduled: false,
      attachments: []
    },
    {
      id: 5,
      title: 'Welcome New Team Member',
      content: `Please join me in welcoming David Wilson to our media team!\n\nDavid brings 5 years of experience in video production and will be helping us with our online streaming initiatives.\n\nPlease introduce yourselves and help David get familiar with our systems and procedures.`,
      author: {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      category: 'general',
      priority: 'normal',
      createdAt: new Date('2025-01-11T11:20:00'),
      recipients: [1, 2, 3, 4, 5, 6],
      readCount: 5,
      scheduled: false,
      attachments: []
    }
  ];

  useEffect(() => {
    setAnnouncements(mockAnnouncements);
    setFilteredAnnouncements(mockAnnouncements);
  }, []);

  useEffect(() => {
    let filtered = [...announcements];

    // Apply filters
    if (filters?.search) {
      filtered = filtered?.filter(announcement =>
        announcement?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        announcement?.content?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        announcement?.author?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.category) {
      filtered = filtered?.filter(announcement => announcement?.category === filters?.category);
    }

    if (filters?.priority) {
      filtered = filtered?.filter(announcement => announcement?.priority === filters?.priority);
    }

    if (filters?.author) {
      filtered = filtered?.filter(announcement => 
        announcement?.author?.name?.toLowerCase()?.replace(' ', '-') === filters?.author
      );
    }

    if (filters?.fromDate) {
      filtered = filtered?.filter(announcement => 
        new Date(announcement.createdAt) >= new Date(filters.fromDate)
      );
    }

    if (filters?.toDate) {
      filtered = filtered?.filter(announcement => 
        new Date(announcement.createdAt) <= new Date(filters.toDate)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'title':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    setFilteredAnnouncements(filtered);
  }, [announcements, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priority: '',
      author: '',
      status: '',
      fromDate: '',
      toDate: ''
    });
  };

  const handleNewAnnouncement = () => {
    setEditingAnnouncement(null);
    setIsComposeOpen(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsComposeOpen(true);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev?.filter(a => a?.id !== announcementId));
    }
  };

  const handleSubmitAnnouncement = async (formData) => {
    if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(prev => prev?.map(a => 
        a?.id === editingAnnouncement?.id 
          ? { ...a, ...formData, updatedAt: new Date() }
          : a
      ));
    } else {
      // Create new announcement
      const newAnnouncement = {
        id: Date.now(),
        ...formData,
        author: currentUser,
        createdAt: new Date(),
        readCount: 0
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }
  };

  const handleViewArchive = () => {
    console.log('View archive clicked');
  };

  const handleExportData = () => {
    console.log('Export data clicked');
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title A-Z' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Communication Center - ChurchMedia Pro</title>
        <meta name="description" content="Manage team communications, announcements, and internal messaging for your church media ministry." />
      </Helmet>
      <div className="lg:ml-64 lg:pl-6 lg:pr-6 lg:pt-6 p-4">
        <div className="max-w-7xl mx-auto">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Communication Center
              </h1>
              <p className="font-body text-muted-foreground">
                Manage team communications and announcements
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'cards' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="LayoutGrid" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions
            onNewAnnouncement={handleNewAnnouncement}
            onViewArchive={handleViewArchive}
            onExportData={handleExportData}
            currentUser={currentUser}
          />

          {/* Filters */}
          <MessageFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Content */}
          <div className="space-y-6">
            {filteredAnnouncements?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-medium text-lg text-foreground mb-2">
                  No announcements found
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  {Object.values(filters)?.some(v => v) 
                    ? 'Try adjusting your filters to see more results.' :'Create your first announcement to get started.'
                  }
                </p>
                {(currentUser?.role === 'Admin' || currentUser?.role === 'Media Lead') && (
                  <Button
                    variant="default"
                    onClick={handleNewAnnouncement}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Announcement
                  </Button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'cards' ? 'space-y-6' : 'space-y-4'}>
                {filteredAnnouncements?.map(announcement => (
                  <AnnouncementCard
                    key={announcement?.id}
                    announcement={announcement}
                    onEdit={handleEditAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredAnnouncements?.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="left"
              >
                Load More Announcements
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <ComposeAnnouncement
        isOpen={isComposeOpen}
        onClose={() => {
          setIsComposeOpen(false);
          setEditingAnnouncement(null);
        }}
        onSubmit={handleSubmitAnnouncement}
        editingAnnouncement={editingAnnouncement}
      />
      <RecipientSelector
        isOpen={isRecipientSelectorOpen}
        onClose={() => setIsRecipientSelectorOpen(false)}
        onConfirm={(recipients) => {
          console.log('Recipients selected:', recipients);
          setIsRecipientSelectorOpen(false);
        }}
      />
    </div>
  );
};

export default CommunicationCenter;