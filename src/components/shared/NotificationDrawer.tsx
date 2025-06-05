import { X, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { dailyData, customerMoodData, churnRiskData } from '../../data/mockData';

interface Notification {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer = ({ isOpen, onClose }: NotificationDrawerProps) => {
  const notifications: Notification[] = [
    {
      id: 'calls',
      title: 'Total Calls Yesterday',
      message: `There were ${dailyData.totalCalls.toLocaleString()} calls handled.`,
      severity: dailyData.totalCalls > 1200 ? 'medium' : 'low',
      timestamp: 'Today'
    },
    {
      id: 'answered',
      title: 'Answered Calls',
      message: `${dailyData.totalAnswered.toLocaleString()} calls were answered (${dailyData.answerRate}%).`,
      severity: dailyData.answerRate < 70 ? 'medium' : 'low',
      timestamp: 'Today'
    },
    {
      id: 'abandoned',
      title: 'Abandoned Calls',
      message: `${dailyData.totalAbandoned} calls were abandoned (${dailyData.abandonmentRate}%).`,
      severity: dailyData.abandonmentRate > 8 ? 'high' : dailyData.abandonmentRate > 6 ? 'medium' : 'low',
      timestamp: 'Today'
    },
    {
      id: 'wait',
      title: 'Average Wait Time',
      message: `Average wait time was ${dailyData.avgWaitTime}s.`,
      severity: dailyData.avgWaitTime > 45 ? 'medium' : 'low',
      timestamp: 'Today'
    },
    {
      id: 'mood',
      title: 'Customer Mood',
      message: `Positive: ${customerMoodData.overall.positive}%, Neutral: ${customerMoodData.overall.neutral}%, Frustrated: ${customerMoodData.overall.frustrated}%.`,
      severity: customerMoodData.overall.frustrated > 20 ? 'high' : customerMoodData.overall.frustrated > 15 ? 'medium' : 'low',
      timestamp: 'Today'
    },
    {
      id: 'churn',
      title: 'Churn Risk Alerts',
      message: `${churnRiskData.filter(r => r.riskScore > 80).length} high churn risk customers detected.`,
      severity: churnRiskData.filter(r => r.riskScore > 80).length > 0 ? 'high' : 'low',
      timestamp: 'Today'
    }
  ];

  const getSeverityIcon = (severity: Notification['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertOctagon className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${getSeverityColor(notification.severity)}`}
              >
                <div className="flex items-start space-x-2">
                  {getSeverityIcon(notification.severity)}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {notification.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer; 