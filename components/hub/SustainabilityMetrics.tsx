import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

interface SustainabilityMetricsProps {
  userType: 'designer' | 'consumer' | null;
}

interface Metric {
  label: string;
  value: number;
  unit: string;
  change: number;
  color: string;
}

export const SustainabilityMetrics: React.FC<SustainabilityMetricsProps> = ({
  userType,
}) => {
  const getMetrics = (): Metric[] => {
    if (userType === 'designer') {
      return [
        {
          label: 'Sustainable Materials Used',
          value: 85,
          unit: '%',
          change: 12,
          color: 'bg-green-500',
        },
        {
          label: 'Water Saved',
          value: 2500,
          unit: 'L',
          change: 15,
          color: 'bg-blue-500',
        },
        {
          label: 'Carbon Footprint Reduced',
          value: 450,
          unit: 'kg',
          change: 8,
          color: 'bg-purple-500',
        },
      ];
    }

    return [
      {
        label: 'Eco-friendly Purchases',
        value: 75,
        unit: '%',
        change: 10,
        color: 'bg-green-500',
      },
      {
        label: 'Environmental Impact Saved',
        value: 320,
        unit: 'kg CO₂',
        change: 25,
        color: 'bg-blue-500',
      },
      {
        label: 'Sustainable Brands Supported',
        value: 12,
        unit: '',
        change: 4,
        color: 'bg-purple-500',
      },
    ];
  };

  const metrics = getMetrics();

  return (
    <Card variant="default">
      <div className="p-6">
        <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
          Sustainability Impact
        </h2>

        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.label}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className={`${metric.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    style={{
                      width: `${Math.min(100, (metric.value / 100) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-medium ${
                    metric.change > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs. last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Overall Impact Score
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">
                {userType === 'designer' ? '92' : '85'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                / 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};