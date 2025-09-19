import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationIndicator from './NotificationIndicator';

const Header = ({ sidebarCollapsed = false }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Team Scheduling', path: '/team-scheduling', icon: 'Calendar' },
    { label: 'Media Library', path: '/media-library', icon: 'FolderOpen' },
    { label: 'Communication', path: '/communication-center', icon: 'MessageSquare' }
  ];

  const secondaryNavItems = [
    { label: 'User Management', path: '/user-management', icon: 'Users' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className={`fixed top-0 right-0 z-50 bg-card border-b border-border transition-all duration-300 ${
      sidebarCollapsed ? 'left-16' : 'left-64'
    } lg:left-0`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Logo & Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <div className="flex items-center space-x-3 mr-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} color="white" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-lg text-foreground">ChurchMedia</h1>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-250"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-250 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-gentle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} className="mr-2" />
              <span className="font-body font-medium text-sm">{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative group">
            <button className="flex items-center px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-250">
              <Icon name="MoreHorizontal" size={18} className="mr-2" />
              <span className="font-body font-medium text-sm">More</span>
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </button>
            
            <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} className="mr-3" />
                    <span className="font-body">{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <NotificationIndicator />
          <UserProfileDropdown />
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-6 py-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-250 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} className="mr-3" />
                <span className="font-body font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;