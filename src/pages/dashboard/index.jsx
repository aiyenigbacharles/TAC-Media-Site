import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import ServiceScheduleCard from './components/ServiceScheduleCard';
import AnnouncementCard from './components/AnnouncementCard';
import QuickActionButton from './components/QuickActionButton';
import MetricCard from './components/MetricCard';
import RecentActivityItem from './components/RecentActivityItem';
import NotificationCenter from './components/NotificationCenter';

const Dashboard = () => {
  const [currentUser] = useState({
    name: 'Sarah Johnson',
    role: 'Media Administrator',
    permissions: ['admin', 'schedule', 'media', 'communication']
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for upcoming services
  const upcomingServices = [
    {
      id: 1,
      name: 'Sunday Morning Worship',
      date: 'September 22, 2024',
      time: '10:00 AM',
      teamLead: 'Michael Rodriguez',
      teamSize: 8,
      status: 'ready',
      preparationProgress: 95
    },
    {
      id: 2,
      name: 'Wednesday Evening Service',
      date: 'September 25, 2024',
      time: '7:00 PM',
      teamLead: 'Jennifer Chen',
      teamSize: 5,
      status: 'in-progress',
      preparationProgress: 70
    },
    {
      id: 3,
      name: 'Youth Service',
      date: 'September 29, 2024',
      time: '6:00 PM',
      teamLead: 'David Thompson',
      teamSize: 6,
      status: 'pending',
      preparationProgress: 25
    }
  ];

  // Mock data for recent announcements
  const recentAnnouncements = [
    {
      id: 1,
      title: 'Equipment Maintenance Scheduled',
      message: 'Audio equipment maintenance will be performed this Saturday from 9 AM to 12 PM. Please plan accordingly for any weekend activities.',
      author: 'Technical Team',
      priority: 'high',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unread: true
    },
    {
      id: 2,
      title: 'New Team Member Welcome',
      message: 'Please welcome Jessica Martinez to our media team. She will be joining us as a camera operator starting next Sunday.',
      author: 'Sarah Johnson',
      priority: 'medium',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unread: true
    },
    {
      id: 3,
      title: 'Holiday Service Planning',
      message: 'Planning meeting for Christmas services will be held next Tuesday at 7 PM in the media room. All team leads please attend.',
      author: 'Ministry Leadership',
      priority: 'medium',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unread: false
    }
  ];

  // Mock data for quick actions based on user role
  const quickActions = [
    {
      title: 'Create Run Sheet',
      description: 'Plan service flow',
      icon: 'FileText',
      color: 'primary',
      path: '/team-scheduling',
      permissions: ['admin', 'schedule']
    },
    {
      title: 'Upload Media',
      description: 'Add new resources',
      icon: 'Upload',
      color: 'secondary',
      path: '/media-library',
      permissions: ['admin', 'media']
    },
    {
      title: 'Send Announcement',
      description: 'Notify team members',
      icon: 'Megaphone',
      color: 'accent',
      path: '/communication-center',
      permissions: ['admin', 'communication']
    },
    {
      title: 'Manage Team',
      description: 'Add or edit members',
      icon: 'Users',
      color: 'success',
      path: '/user-management',
      permissions: ['admin']
    },
    {
      title: 'View Schedule',
      description: 'Check assignments',
      icon: 'Calendar',
      color: 'warning',
      path: '/team-scheduling',
      permissions: ['admin', 'schedule', 'volunteer']
    },
    {
      title: 'Media Library',
      description: 'Browse resources',
      icon: 'FolderOpen',
      color: 'primary',
      path: '/media-library',
      permissions: ['admin', 'media', 'volunteer']
    }
  ];

  // Filter actions based on user permissions
  const availableActions = quickActions?.filter(action => 
    action?.permissions?.some(permission => currentUser?.permissions?.includes(permission))
  );

  // Mock data for metrics based on user role
  const getMetricsForRole = (role) => {
    if (role === 'Media Administrator') {
      return [
        {
          icon: 'Users',
          value: '24',
          label: 'Active Team Members',
          subtitle: '3 new this month',
          color: 'primary',
          trend: 'up',
          trendValue: '+12%'
        },
        {
          icon: 'Calendar',
          value: '8',
          label: 'Upcoming Services',
          subtitle: 'Next 30 days',
          color: 'secondary',
          trend: 'neutral',
          trendValue: '0%'
        },
        {
          icon: 'FolderOpen',
          value: '156',
          label: 'Media Resources',
          subtitle: '12 added this week',
          color: 'success',
          trend: 'up',
          trendValue: '+8%'
        },
        {
          icon: 'CheckCircle',
          value: '95%',
          label: 'Service Readiness',
          subtitle: 'Average preparation',
          color: 'accent',
          trend: 'up',
          trendValue: '+5%'
        }
      ];
    } else {
      return [
        {
          icon: 'Calendar',
          value: '3',
          label: 'My Assignments',
          subtitle: 'This week',
          color: 'primary'
        },
        {
          icon: 'Clock',
          value: '12',
          label: 'Hours Scheduled',
          subtitle: 'Next 7 days',
          color: 'secondary'
        }
      ];
    }
  };

  const metrics = getMetricsForRole(currentUser?.role);

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      user: 'Michael Rodriguez',
      action: 'updated the Sunday service run sheet',
      type: 'schedule',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 2,
      user: 'Jennifer Chen',
      action: 'uploaded new worship background videos',
      type: 'media',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 3,
      user: 'David Thompson',
      action: 'joined the youth service team',
      type: 'team',
      timestamp: new Date(Date.now() - 2700000) // 45 minutes ago
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      action: 'posted equipment maintenance announcement',
      type: 'communication',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: 'Schedule Conflict Detected',
      message: 'Michael Rodriguez is assigned to two services at the same time on Sunday.',
      type: 'schedule',
      priority: 'high',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      unread: true
    },
    {
      id: 2,
      title: 'Equipment Check Reminder',
      message: 'Weekly sound system check is due tomorrow morning.',
      type: 'reminder',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unread: true
    },
    {
      id: 3,
      title: 'New Media Upload',
      message: 'Christmas service backgrounds have been uploaded to the media library.',
      type: 'system',
      priority: 'low',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unread: false
    }
  ];

  const formatCurrentTime = () => {
    return currentTime?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Welcome back, {currentUser?.name}
              </h1>
              <p className="font-body text-muted-foreground mb-2">
                {formatCurrentTime()}
              </p>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {currentUser?.role}
                </div>
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => console.log('Quick create')}
              >
                Quick Create
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics?.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {availableActions?.map((action, index) => (
              <QuickActionButton key={index} action={action} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Services and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Services */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Upcoming Services
                </h2>
                <Link
                  to="/team-scheduling"
                  className="text-primary hover:text-primary/80 font-body text-sm transition-colors duration-200"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingServices?.map((service) => (
                  <ServiceScheduleCard key={service?.id} service={service} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                Recent Activity
              </h2>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="space-y-2">
                  {recentActivity?.map((activity) => (
                    <RecentActivityItem key={activity?.id} activity={activity} />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    to="/communication-center"
                    className="text-primary hover:text-primary/80 font-body text-sm transition-colors duration-200"
                  >
                    View All Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Announcements and Notifications */}
          <div className="space-y-8">
            {/* Recent Announcements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Recent Announcements
                </h2>
                <Link
                  to="/communication-center"
                  className="text-primary hover:text-primary/80 font-body text-sm transition-colors duration-200"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentAnnouncements?.map((announcement) => (
                  <AnnouncementCard key={announcement?.id} announcement={announcement} />
                ))}
              </div>
            </div>

            {/* Notification Center */}
            <NotificationCenter notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;