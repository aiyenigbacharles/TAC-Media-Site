import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickActions = ({ onBulkAssign, onImportAvailability, onApplyTemplate, templates }) => {
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [bulkAssignData, setBulkAssignData] = useState({
    dateRange: '',
    volunteers: [],
    roles: []
  });

  const templateOptions = templates?.map(template => ({
    value: template?.id,
    label: template?.name
  }));

  const dateRangeOptions = [
    { value: 'next-month', label: 'Next Month' },
    { value: 'next-quarter', label: 'Next Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onApplyTemplate(selectedTemplate);
      setSelectedTemplate('');
    }
  };

  const handleBulkAssign = () => {
    onBulkAssign(bulkAssignData);
    setShowBulkAssign(false);
    setBulkAssignData({ dateRange: '', volunteers: [], roles: [] });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-medium text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Apply Template */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Apply Template</h4>
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder="Choose template"
          />
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleApplyTemplate}
            disabled={!selectedTemplate}
            iconName="Copy"
            iconPosition="left"
            iconSize={16}
          >
            Apply
          </Button>
        </div>

        {/* Import Availability */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Import Data</h4>
          <p className="text-xs text-muted-foreground">Import volunteer availability from external sources</p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onImportAvailability}
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
          >
            Import CSV
          </Button>
        </div>

        {/* Bulk Assignment */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Bulk Actions</h4>
          <p className="text-xs text-muted-foreground">Assign multiple volunteers to recurring services</p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setShowBulkAssign(true)}
            iconName="Users"
            iconPosition="left"
            iconSize={16}
          >
            Bulk Assign
          </Button>
        </div>

        {/* Schedule Analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Analysis</h4>
          <p className="text-xs text-muted-foreground">View scheduling patterns and conflicts</p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
          >
            View Report
          </Button>
        </div>
      </div>
      {/* Bulk Assignment Modal */}
      {showBulkAssign && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-medium text-foreground">Bulk Assignment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkAssign(false)}
                iconName="X"
                iconSize={20}
              />
            </div>
            
            <div className="p-6 space-y-4">
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={bulkAssignData?.dateRange}
                onChange={(value) => setBulkAssignData(prev => ({ ...prev, dateRange: value }))}
                placeholder="Select date range"
              />
              
              <div className="text-sm text-muted-foreground">
                This will apply assignments to all services in the selected date range based on volunteer availability and role requirements.
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowBulkAssign(false)}>
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={handleBulkAssign}
                disabled={!bulkAssignData?.dateRange}
              >
                Apply Bulk Assignment
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-semibold text-foreground">24</div>
          <div className="text-xs text-muted-foreground">Upcoming Services</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-semibold text-success">18</div>
          <div className="text-xs text-muted-foreground">Fully Staffed</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-semibold text-warning">4</div>
          <div className="text-xs text-muted-foreground">Need Staff</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-semibold text-destructive">2</div>
          <div className="text-xs text-muted-foreground">Conflicts</div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;