import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick actions'
    },
    {
      label: 'Team Scheduling',
      path: '/team-scheduling',
      icon: 'Calendar',
      tooltip: 'Manage volunteer schedules'
    },
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      tooltip: 'Manage team members'
    },
    {
      label: 'Media Library',
      path: '/media-library',
      icon: 'FolderOpen',
      tooltip: 'Organize media resources'
    },
    {
      label: 'Communication',
      path: '/communication-center',
      icon: 'MessageSquare',
      tooltip: 'Team messaging and announcements'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border">
        <div className="flex justify-around items-center py-2">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-250 ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-caption mt-1">{item?.label?.split(' ')?.[0]}</span>
            </Link>
          ))}
          <button className="flex flex-col items-center px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-250">
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-caption mt-1">More</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 z-100 h-full bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center px-4 py-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-heading font-semibold text-lg text-foreground">ChurchMedia</h1>
                <p className="font-caption text-xs text-muted-foreground">Pro</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                title={isCollapsed ? item?.tooltip : undefined}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-250 group ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-gentle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-colors duration-250`}
                />
                {!isCollapsed && (
                  <span className="font-body font-medium">{item?.label}</span>
                )}
                {!isCollapsed && isActivePath(item?.path) && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full opacity-75" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div className="px-4 py-4 border-t border-border">
          <button
            onClick={onToggle}
            className="flex items-center w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-250"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={20} 
              className={isCollapsed ? 'mx-auto' : 'mr-3'}
            />
            {!isCollapsed && (
              <span className="font-body text-sm">Collapse</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default NavigationSidebar;