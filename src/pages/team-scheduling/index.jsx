import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ViewToggle from './components/ViewToggle';
import CalendarView from './components/CalendarView';
import ListView from './components/ListView';
import TeamSidebar from './components/TeamSidebar';
import ScheduleModal from './components/ScheduleModal';
import QuickActions from './components/QuickActions';

const TeamScheduling = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [teamSidebarCollapsed, setTeamSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mock data for services
  const services = [
    {
      id: 1,
      name: "Sunday Morning Service",
      date: "2025-01-19",
      time: "9:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "Regular Sunday worship service with full media production",
      conflicts: 1,
      requiredRoles: [
        { id: 'audio', name: 'Audio Engineer', icon: 'Volume2', required: true, description: 'Manage sound mixing and audio equipment' },
        { id: 'video', name: 'Video Operator', icon: 'Video', required: true, description: 'Control cameras and video switching' },
        { id: 'lighting', name: 'Lighting Tech', icon: 'Lightbulb', required: false, description: 'Manage stage and ambient lighting' },
        { id: 'streaming', name: 'Live Stream', icon: 'Wifi', required: true, description: 'Manage online broadcast and streaming' }
      ],
      assignments: [
        { roleId: 'audio', volunteerId: 1, assignedAt: '2025-01-15T10:00:00Z' },
        { roleId: 'video', volunteerId: 2, assignedAt: '2025-01-15T10:00:00Z' }
      ]
    },
    {
      id: 2,
      name: "Wednesday Night Service",
      date: "2025-01-22",
      time: "7:00 PM - 9:00 PM",
      location: "Fellowship Hall",
      description: "Mid-week prayer and worship service",
      conflicts: 0,
      requiredRoles: [
        { id: 'audio', name: 'Audio Engineer', icon: 'Volume2', required: true, description: 'Basic sound setup and mixing' },
        { id: 'streaming', name: 'Live Stream', icon: 'Wifi', required: false, description: 'Optional online broadcast' }
      ],
      assignments: [
        { roleId: 'audio', volunteerId: 3, assignedAt: '2025-01-16T14:00:00Z' },
        { roleId: 'streaming', volunteerId: 4, assignedAt: '2025-01-16T14:00:00Z' }
      ]
    },
    {
      id: 3,
      name: "Youth Service",
      date: "2025-01-25",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Center",
      description: "High-energy youth worship with contemporary media",
      conflicts: 2,
      requiredRoles: [
        { id: 'audio', name: 'Audio Engineer', icon: 'Volume2', required: true, description: 'Contemporary music mixing' },
        { id: 'video', name: 'Video Operator', icon: 'Video', required: true, description: 'Dynamic camera work and effects' },
        { id: 'lighting', name: 'Lighting Tech', icon: 'Lightbulb', required: true, description: 'Concert-style lighting design' },
        { id: 'graphics', name: 'Graphics Operator', icon: 'Image', required: false, description: 'Live graphics and visual effects' }
      ],
      assignments: []
    },
    {
      id: 4,
      name: "Special Event - Easter Service",
      date: "2025-04-20",
      time: "8:00 AM - 1:00 PM",
      location: "Main Sanctuary",
      description: "Special Easter celebration with extended production requirements",
      conflicts: 0,
      requiredRoles: [
        { id: 'audio', name: 'Audio Engineer', icon: 'Volume2', required: true, description: 'Professional audio mixing for large event' },
        { id: 'video', name: 'Video Operator', icon: 'Video', required: true, description: 'Multi-camera production' },
        { id: 'lighting', name: 'Lighting Tech', icon: 'Lightbulb', required: true, description: 'Special event lighting design' },
        { id: 'streaming', name: 'Live Stream', icon: 'Wifi', required: true, description: 'High-quality online broadcast' },
        { id: 'photography', name: 'Photographer', icon: 'Camera', required: false, description: 'Event photography and documentation' }
      ],
      assignments: [
        { roleId: 'audio', volunteerId: 1, assignedAt: '2025-01-10T09:00:00Z' }
      ]
    }
  ];

  // Mock data for volunteers
  const volunteers = [
    {
      id: 1,
      name: "Michael Rodriguez",
      email: "michael.r@churchmedia.org",
      role: "Senior Audio Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills: ['audio', 'streaming', 'lighting'],
      availability: ['2025-01-19', '2025-01-26', '2025-02-02', '2025-04-20'],
      upcomingAssignments: 3,
      conflicts: 1
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.c@churchmedia.org",
      role: "Video Production Lead",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      skills: ['video', 'graphics', 'photography'],
      availability: ['2025-01-19', '2025-01-25', '2025-02-01'],
      upcomingAssignments: 2,
      conflicts: 0
    },
    {
      id: 3,
      name: "David Thompson",
      email: "david.t@churchmedia.org",
      role: "Audio Volunteer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: ['audio', 'streaming'],
      availability: ['2025-01-22', '2025-01-29', '2025-02-05'],
      upcomingAssignments: 1,
      conflicts: 0
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily.j@churchmedia.org",
      role: "Streaming Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills: ['streaming', 'social-media', 'graphics'],
      availability: ['2025-01-22', '2025-01-25', '2025-02-03'],
      upcomingAssignments: 2,
      conflicts: 1
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.w@churchmedia.org",
      role: "Lighting Technician",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      skills: ['lighting', 'video'],
      availability: ['2025-01-19', '2025-01-25', '2025-02-02'],
      upcomingAssignments: 1,
      conflicts: 2
    },
    {
      id: 6,
      name: "Lisa Martinez",
      email: "lisa.m@churchmedia.org",
      role: "Graphics Designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      skills: ['graphics', 'photography', 'social-media'],
      availability: ['2025-01-25', '2025-02-01', '2025-02-08'],
      upcomingAssignments: 0,
      conflicts: 0
    }
  ];

  // Mock templates
  const templates = [
    { id: 1, name: 'Standard Sunday Service' },
    { id: 2, name: 'Wednesday Night Simple' },
    { id: 3, name: 'Youth Service Setup' },
    { id: 4, name: 'Special Event Full Production' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setTeamSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScheduleClick = (service) => {
    setSelectedService(service);
    setScheduleModalOpen(true);
  };

  const handleSaveSchedule = (serviceId, assignments) => {
    console.log('Saving schedule for service:', serviceId, 'with assignments:', assignments);
    // In a real app, this would update the backend
  };

  const handleAssignVolunteer = (serviceId, roleId, volunteerId) => {
    console.log('Assigning volunteer:', volunteerId, 'to role:', roleId, 'for service:', serviceId);
    // In a real app, this would update the backend
  };

  const handleBulkAssign = (bulkData) => {
    console.log('Bulk assignment:', bulkData);
    // In a real app, this would process bulk assignments
  };

  const handleImportAvailability = () => {
    console.log('Importing availability data');
    // In a real app, this would handle CSV import
  };

  const handleApplyTemplate = (templateId) => {
    console.log('Applying template:', templateId);
    // In a real app, this would apply template to selected services
  };

  return (
    <>
      <Helmet>
        <title>Team Scheduling - ChurchMedia Pro</title>
        <meta name="description" content="Manage volunteer schedules and service assignments with calendar and list views" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation Sidebar */}
        <NavigationSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />

        {/* Header */}
        <Header sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <main className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } ${
          teamSidebarCollapsed ? 'lg:mr-0' : 'lg:mr-80'
        } pt-16 pb-20 lg:pb-6`}>
          <div className="p-6">
            <BreadcrumbNavigation />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                  Team Scheduling
                </h1>
                <p className="text-muted-foreground font-body">
                  Manage volunteer assignments and service schedules with calendar and list views
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <ViewToggle 
                  currentView={currentView} 
                  onViewChange={setCurrentView} 
                />
                {!isMobile && (
                  <button
                    onClick={() => setTeamSidebarCollapsed(!teamSidebarCollapsed)}
                    className="p-2 rounded-lg border border-border hover:bg-muted transition-colors duration-200"
                    title={teamSidebarCollapsed ? 'Show team sidebar' : 'Hide team sidebar'}
                  >
                    <span className="sr-only">Toggle team sidebar</span>
                    <div className="w-4 h-4 border border-current rounded opacity-60" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <QuickActions
                onBulkAssign={handleBulkAssign}
                onImportAvailability={handleImportAvailability}
                onApplyTemplate={handleApplyTemplate}
                templates={templates}
              />
            </div>

            {/* Main View */}
            {currentView === 'calendar' ? (
              <CalendarView
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                services={services}
                volunteers={volunteers}
                onScheduleClick={handleScheduleClick}
              />
            ) : (
              <ListView
                services={services}
                volunteers={volunteers}
                onScheduleClick={handleScheduleClick}
                onAssignVolunteer={handleAssignVolunteer}
              />
            )}
          </div>
        </main>

        {/* Team Sidebar */}
        {!isMobile && (
          <TeamSidebar
            volunteers={volunteers}
            onVolunteerSelect={setSelectedVolunteer}
            selectedVolunteer={selectedVolunteer}
            isCollapsed={teamSidebarCollapsed}
            onToggle={() => setTeamSidebarCollapsed(!teamSidebarCollapsed)}
          />
        )}

        {/* Schedule Modal */}
        <ScheduleModal
          service={selectedService}
          volunteers={volunteers}
          isOpen={scheduleModalOpen}
          onClose={() => {
            setScheduleModalOpen(false);
            setSelectedService(null);
          }}
          onSave={handleSaveSchedule}
        />
      </div>
    </>
  );
};

export default TeamScheduling;