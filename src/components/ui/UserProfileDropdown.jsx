import React, { useState, useRef, useEffect } from 'react';

import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@churchmedia.org',
    role: 'Media Administrator',
    avatar: '/assets/images/user-avatar.jpg'
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Account Preferences', icon: 'Settings', action: () => console.log('Preferences') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Sign Out', icon: 'LogOut', action: handleLogout, variant: 'destructive' }
  ];

  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors duration-250"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl border-t border-border animate-slide-in">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-foreground">{user?.name}</h3>
                    <p className="font-caption text-sm text-muted-foreground">{user?.role}</p>
                    <p className="font-caption text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 space-y-2">
                {menuItems?.map((item, index) => (
                  <button
                    key={index}
                    onClick={item?.action}
                    className={`flex items-center w-full px-3 py-3 rounded-lg transition-colors duration-250 ${
                      item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} className="mr-3" />
                    <span className="font-body">{item?.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="px-6 py-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg font-body text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-250"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block text-left">
          <p className="font-body font-medium text-sm text-foreground">{user?.name}</p>
          <p className="font-caption text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden md:block text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-medium animate-fade-in">
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-medium text-popover-foreground">{user?.name}</h3>
                <p className="font-caption text-sm text-muted-foreground">{user?.role}</p>
                <p className="font-caption text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={item?.action}
                className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                  item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                <span className="font-body">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;