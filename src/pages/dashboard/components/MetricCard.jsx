import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ metric }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'neutral':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-gentle transition-all duration-250">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-${metric?.color}/10`}>
          <Icon name={metric?.icon} size={24} className={`text-${metric?.color}`} />
        </div>
        {metric?.trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
            <Icon name={getTrendIcon(metric?.trend)} size={16} />
            <span className="text-xs font-medium">{metric?.trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-2xl text-foreground">
          {metric?.value}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {metric?.label}
        </p>
        {metric?.subtitle && (
          <p className="font-caption text-xs text-muted-foreground">
            {metric?.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;