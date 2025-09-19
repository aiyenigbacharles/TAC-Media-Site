import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import MediaGrid from './components/MediaGrid';
import MediaFilters from './components/MediaFilters';
import MediaUpload from './components/MediaUpload';
import MediaPreview from './components/MediaPreview';
import MediaStats from './components/MediaStats';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MediaLibrary = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedPreviewItem, setSelectedPreviewItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock data
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      name: 'Christmas Service Background.jpg',
      description: 'Beautiful winter scene for Christmas service backdrop',
      type: 'image',
      category: 'backgrounds',
      size: 2048576,
      url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
      tags: ['christmas', 'worship', 'winter'],
      createdAt: new Date('2024-12-01T10:00:00'),
      modifiedAt: new Date('2024-12-15T14:30:00'),
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'Sunday Worship Video.mp4',
      description: 'Complete recording of Sunday morning worship service',
      type: 'video',
      category: 'worship',
      size: 157286400,
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      tags: ['worship', 'sunday', 'service'],
      createdAt: new Date('2024-12-08T09:00:00'),
      modifiedAt: new Date('2024-12-08T11:30:00'),
      uploadedBy: 'Michael Chen'
    },
    {
      id: 3,
      name: 'Amazing Grace - Piano.mp3',
      description: 'Piano instrumental version of Amazing Grace for meditation',
      type: 'audio',
      category: 'music',
      size: 5242880,
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      thumbnail: null,
      tags: ['music', 'piano', 'worship', 'meditation'],
      createdAt: new Date('2024-11-20T16:45:00'),
      modifiedAt: new Date('2024-11-20T16:45:00'),
      uploadedBy: 'Emily Rodriguez'
    },
    {
      id: 4,
      name: 'Youth Event Flyer.pdf',
      description: 'Promotional flyer for upcoming youth winter retreat',
      type: 'document',
      category: 'events',
      size: 1048576,
      url: '/assets/documents/youth-flyer.pdf',
      thumbnail: null,
      tags: ['youth', 'events', 'retreat'],
      createdAt: new Date('2024-12-10T13:20:00'),
      modifiedAt: new Date('2024-12-12T09:15:00'),
      uploadedBy: 'David Kim'
    },
    {
      id: 5,
      name: 'Easter Sunrise Service.jpg',
      description: 'Sunrise photo from Easter morning service at the lake',
      type: 'image',
      category: 'events',
      size: 3145728,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      tags: ['easter', 'sunrise', 'service', 'outdoor'],
      createdAt: new Date('2024-03-31T06:30:00'),
      modifiedAt: new Date('2024-03-31T06:30:00'),
      uploadedBy: 'Lisa Thompson'
    },
    {
      id: 6,
      name: 'Baptism Ceremony Video.mp4',
      description: 'Recording of baptism ceremony at the river',
      type: 'video',
      category: 'events',
      size: 209715200,
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400',
      tags: ['baptism', 'ceremony', 'river'],
      createdAt: new Date('2024-09-15T14:00:00'),
      modifiedAt: new Date('2024-09-15T16:30:00'),
      uploadedBy: 'Pastor John'
    },
    {
      id: 7,
      name: 'Church Logo Vector.svg',
      description: 'Official church logo in vector format for print materials',
      type: 'image',
      category: 'graphics',
      size: 524288,
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      tags: ['logo', 'graphics', 'branding'],
      createdAt: new Date('2024-01-15T10:00:00'),
      modifiedAt: new Date('2024-06-20T14:30:00'),
      uploadedBy: 'Design Team'
    },
    {
      id: 8,
      name: 'Weekly Announcements.pptx',
      description: 'PowerPoint presentation for weekly church announcements',
      type: 'document',
      category: 'announcements',
      size: 2097152,
      url: '/assets/documents/announcements.pptx',
      thumbnail: null,
      tags: ['announcements', 'weekly', 'presentation'],
      createdAt: new Date('2024-12-14T08:00:00'),
      modifiedAt: new Date('2024-12-14T10:30:00'),
      uploadedBy: 'Communications Team'
    }
  ]);

  const [stats, setStats] = useState({
    totalFiles: 0,
    images: 0,
    videos: 0,
    audio: 0,
    documents: 0,
    storageUsed: 0
  });

  // Calculate stats
  useEffect(() => {
    const calculateStats = () => {
      const newStats = {
        totalFiles: mediaItems?.length,
        images: mediaItems?.filter(item => item?.type === 'image')?.length,
        videos: mediaItems?.filter(item => item?.type === 'video')?.length,
        audio: mediaItems?.filter(item => item?.type === 'audio')?.length,
        documents: mediaItems?.filter(item => item?.type === 'document')?.length,
        storageUsed: mediaItems?.reduce((total, item) => total + item?.size, 0)
      };
      setStats(newStats);
    };

    calculateStats();
  }, [mediaItems]);

  // Filter media items
  const filteredMediaItems = mediaItems?.filter(item => {
    const matchesSearch = !searchQuery || 
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    const matchesType = selectedType === 'all' || item?.type === selectedType;
    
    const matchesDateRange = (!dateRange?.start || new Date(item.createdAt) >= new Date(dateRange.start)) &&
      (!dateRange?.end || new Date(item.createdAt) <= new Date(dateRange.end));
    
    const matchesTags = selectedTags?.length === 0 || 
      selectedTags?.some(tag => item?.tags?.includes(tag));

    return matchesSearch && matchesCategory && matchesType && matchesDateRange && matchesTags;
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectItem = (itemId, selected) => {
    if (selected) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev?.filter(id => id !== itemId));
    }
  };

  const handlePreviewItem = (item) => {
    setSelectedPreviewItem(item);
    setPreviewModalOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setMediaItems(prev => prev?.filter(item => item?.id !== itemId));
      setSelectedItems(prev => prev?.filter(id => id !== itemId));
    }
  };

  const handleUpload = (newFiles) => {
    const newMediaItems = newFiles?.map((fileData, index) => ({
      id: Date.now() + index,
      name: fileData?.name,
      description: fileData?.description,
      type: fileData?.type,
      category: fileData?.category,
      size: fileData?.file?.size,
      url: URL.createObjectURL(fileData?.file),
      thumbnail: fileData?.type === 'image' ? URL.createObjectURL(fileData?.file) : null,
      tags: fileData?.tags,
      createdAt: new Date(),
      modifiedAt: new Date(),
      uploadedBy: 'Current User'
    }));

    setMediaItems(prev => [...newMediaItems, ...prev]);
  };

  const handleSavePreview = (updatedItem) => {
    setMediaItems(prev => 
      prev?.map(item => 
        item?.id === updatedItem?.id ? { ...updatedItem, modifiedAt: new Date() } : item
      )
    );
    setSelectedPreviewItem(updatedItem);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setDateRange({ start: '', end: '' });
    setSelectedTags([]);
  };

  const handleBulkDelete = () => {
    if (selectedItems?.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedItems?.length} selected file(s)?`)) {
      setMediaItems(prev => prev?.filter(item => !selectedItems?.includes(item?.id)));
      setSelectedItems([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Media Library - ChurchMedia Pro</title>
        <meta name="description" content="Manage and organize your church media assets with comprehensive upload, search, and preview capabilities." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <Header sidebarCollapsed={sidebarCollapsed} />
          
          <main className="pt-16 pb-20 lg:pb-8">
            <div className="px-6 py-8">
              <div className="max-w-7xl mx-auto">
                <BreadcrumbNavigation />
                
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                  <div>
                    <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                      Media Library
                    </h1>
                    <p className="font-body text-muted-foreground">
                      Organize and manage your church media assets with powerful search and preview capabilities.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {selectedItems?.length > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={handleBulkDelete}
                      >
                        Delete ({selectedItems?.length})
                      </Button>
                    )}
                    <Button
                      variant="default"
                      iconName="Upload"
                      onClick={() => setUploadModalOpen(true)}
                    >
                      Upload Files
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <MediaStats stats={stats} isLoading={isLoading} />

                {/* Filters */}
                <MediaFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  onClearFilters={handleClearFilters}
                  onToggleView={setViewMode}
                  viewMode={viewMode}
                />

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="font-body text-muted-foreground">
                    Showing {filteredMediaItems?.length} of {mediaItems?.length} files
                  </p>
                  
                  {filteredMediaItems?.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-medium text-lg text-foreground mb-2">
                        No files found
                      </h3>
                      <p className="font-body text-muted-foreground mb-4">
                        Try adjusting your search criteria or upload new files.
                      </p>
                      <Button
                        variant="outline"
                        iconName="Upload"
                        onClick={() => setUploadModalOpen(true)}
                      >
                        Upload Files
                      </Button>
                    </div>
                  )}
                </div>

                {/* Media Grid */}
                {filteredMediaItems?.length > 0 && (
                  <MediaGrid
                    mediaItems={filteredMediaItems}
                    viewMode={viewMode}
                    selectedItems={selectedItems}
                    onSelectItem={handleSelectItem}
                    onPreviewItem={handlePreviewItem}
                    onDeleteItem={handleDeleteItem}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Modals */}
        <MediaUpload
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onUpload={handleUpload}
        />

        <MediaPreview
          item={selectedPreviewItem}
          isOpen={previewModalOpen}
          onClose={() => {
            setPreviewModalOpen(false);
            setSelectedPreviewItem(null);
          }}
          onSave={handleSavePreview}
          onDelete={handleDeleteItem}
        />
      </div>
    </>
  );
};

export default MediaLibrary;