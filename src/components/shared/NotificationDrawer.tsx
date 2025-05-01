import { X, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

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
      id: '1',
      title: 'High Call Volume Alert',
      message: 'Call volume has exceeded threshold by 25%. Consider adding more agents.',
      severity: 'high',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      title: 'System Performance Warning',
      message: 'Call recording system experiencing delays. Some calls may not be recorded.',
      severity: 'medium',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      title: 'Queue Status Update',
      message: 'Support queue wait time has increased to 8 minutes.',
      severity: 'low',
      timestamp: '30 minutes ago'
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