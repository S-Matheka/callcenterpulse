import { X, Check, Phone, Play, Volume2, FileText, History } from 'lucide-react';

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  callData: {
    customerId: string;
    phone: string;
    reason: string;
    summary: string;
    duration: string;
    agent: string;
  };
}

const CallDetailsModal = ({ isOpen, onClose, callData }: CallDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Call Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customer</h3>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white mr-2">
                  Customer ID {callData.customerId}
                </span>
                <div className="flex items-center bg-emerald-800/90 dark:bg-emerald-700/50 text-emerald-100 px-3 py-1.5 rounded-full space-x-1.5">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span className="text-sm font-medium whitespace-nowrap">CRM Verified</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phone</h3>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white mr-2">
                  {callData.phone}
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-800/90 dark:bg-emerald-700/50 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-emerald-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Reason & Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reason for Review</h3>
            <p className="text-lg font-medium text-yellow-500 dark:text-yellow-400">
              {callData.reason}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Summary</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {callData.summary}
            </p>
          </div>

          {/* Call Recording */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Call Recording</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Play className="h-6 w-6 text-white" />
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
                    <div className="w-1/3 h-full bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">0:00</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{callData.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
                    <div className="w-3/4 h-full bg-gray-500 dark:bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <FileText className="h-5 w-5 mr-2" />
              View Transcript
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <History className="h-5 w-5 mr-2" />
              Customer Conversation History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsModal; 