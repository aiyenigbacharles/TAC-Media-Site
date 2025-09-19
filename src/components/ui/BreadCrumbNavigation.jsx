import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const pathMap = {
    '/dashboard': 'Dashboard',
    '/team-scheduling': 'Team Scheduling',
    '/media-library': 'Media Library',
    '/communication-center': 'Communication Center',
    '/user-management': 'User Management',
    '/login': 'Login'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home unless we're on login
    if (location?.pathname !== '/login') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isHome: true
      });
    }

    // Add current page if it's not dashboard
    if (location?.pathname !== '/dashboard' && location?.pathname !== '/login') {
      const currentPath = '/' + pathSegments?.join('/');
      const currentLabel = pathMap?.[currentPath] || pathSegments?.[pathSegments?.length - 1];
      
      breadcrumbs?.push({
        label: currentLabel,
        path: currentPath,
        isCurrent: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or if there's only one item
  if (location?.pathname === '/login' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={crumb?.path}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground" 
              />
            )}
            
            {crumb?.isCurrent ? (
              <span className="text-foreground font-medium flex items-center">
                {crumb?.isHome && (
                  <Icon name="Home" size={16} className="mr-2" />
                )}
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
              >
                {crumb?.isHome && (
                  <Icon name="Home" size={16} className="mr-2" />
                )}
                {crumb?.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile back button */}
      <div className="md:hidden ml-auto">
        <button
          onClick={() => window.history?.back()}
          className="flex items-center px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="ArrowLeft" size={16} className="mr-1" />
          <span className="text-sm">Back</span>
        </button>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;