import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { type ComplianceItem } from './types';

interface ComplianceChecklistProps {
  items: ComplianceItem[];
}

const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({ items }) => {
  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'na':
        return <MinusCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadgeClass = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'fail':
        return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'na':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compliance Checklist</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.label}
                </span>
                {item.required && (
                  <span className="ml-2 text-xs text-red-500">*Required</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {item.timestamp && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </span>
              )}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist; 