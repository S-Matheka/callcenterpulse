import { ListChecks, AlertTriangle, ThumbsUp, Lightbulb } from 'lucide-react';
import { type CallSummary as CallSummaryType } from './types';

interface CallSummaryProps {
  summary: CallSummaryType;
}

const CallSummary: React.FC<CallSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">AI-Generated Summary</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key Points */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Points</h4>
            </div>
            <ul className="space-y-2">
              {summary.key_points.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Action Items */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ListChecks className="h-5 w-5 text-blue-500" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Action Items</h4>
            </div>
            <ul className="space-y-2">
              {summary.action_items.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Areas of Concern */}
          {summary.areas_of_concern && summary.areas_of_concern.length > 0 ? (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Areas of Concern</h4>
              </div>
              <ul className="space-y-2">
                {summary.areas_of_concern.map((concern, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : <div />}
        </div>
        {/* Positive Highlights */}
        {summary.positive_highlights && summary.positive_highlights.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-3">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Positive Highlights</h4>
            </div>
            <ul className="space-y-2">
              {summary.positive_highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallSummary; 