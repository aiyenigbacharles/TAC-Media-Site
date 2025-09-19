import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MediaFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  selectedTags,
  onTagsChange,
  onClearFilters,
  onToggleView,
  viewMode
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'worship', label: 'Worship' },
    { value: 'sermons', label: 'Sermons' },
    { value: 'events', label: 'Events' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'backgrounds', label: 'Backgrounds' },
    { value: 'graphics', label: 'Graphics' },
    { value: 'music', label: 'Music' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'document', label: 'Documents' }
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

  const hasActiveFilters = 
    searchQuery || 
    selectedCategory !== 'all' || 
    selectedType !== 'all' || 
    dateRange?.start || 
    dateRange?.end || 
    selectedTags?.length > 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4 lg:mb-0">
          Filter Media Assets
        </h2>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => onToggleView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => onToggleView('list')}
            >
              List
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search media files..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Select category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
        />

        <Select
          placeholder="Select file type"
          options={typeOptions}
          value={selectedType}
          onChange={onTypeChange}
        />

        <Select
          placeholder="Select tags"
          options={tagOptions}
          value={selectedTags}
          onChange={onTagsChange}
          multiple
          searchable
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="From Date"
          value={dateRange?.start}
          onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
        />

        <Input
          type="date"
          label="To Date"
          value={dateRange?.end}
          onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Icon name="Search" size={14} className="mr-1" />
                Search: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:bg-primary/20 rounded-full p-1"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedCategory !== 'all' && (
              <div className="inline-flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                <Icon name="Folder" size={14} className="mr-1" />
                {categoryOptions?.find(c => c?.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-2 hover:bg-secondary/20 rounded-full p-1"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedType !== 'all' && (
              <div className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <Icon name="File" size={14} className="mr-1" />
                {typeOptions?.find(t => t?.value === selectedType)?.label}
                <button
                  onClick={() => onTypeChange('all')}
                  className="ml-2 hover:bg-accent/20 rounded-full p-1"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedTags?.map((tag) => (
              <div key={tag} className="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                <Icon name="Tag" size={14} className="mr-1" />
                {tagOptions?.find(t => t?.value === tag)?.label}
                <button
                  onClick={() => onTagsChange(selectedTags?.filter(t => t !== tag))}
                  className="ml-2 hover:bg-success/20 rounded-full p-1"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaFilters;