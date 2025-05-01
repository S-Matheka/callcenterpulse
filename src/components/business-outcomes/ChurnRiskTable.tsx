import { Play, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import CallDetailsModal from './CallDetailsModal';

interface ChurnRiskData {
  company: string;
  issueType: string;
  riskScore: number;
  revenueAtRisk: number;
  lastCall: string;
  callId: string;
}

interface ChurnRiskTableProps {
  data: ChurnRiskData[];
}

const ChurnRiskTable = ({ data }: ChurnRiskTableProps) => {
  const [selectedCall, setSelectedCall] = useState<{
    isOpen: boolean;
    data: {
      customerId: string;
      phone: string;
      reason: string;
      summary: string;
      duration: string;
      agent: string;
    } | null;
  }>({
    isOpen: false,
    data: null
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 dark:text-red-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const handlePlayCall = (item: ChurnRiskData) => {
    // In a real application, you would fetch the call details from your backend
    setSelectedCall({
      isOpen: true,
      data: {
        customerId: item.callId.replace('CALL-', ''),
        phone: '(555) 123-4567',
        reason: item.issueType,
        summary: `Follow-up call review needed regarding ${item.issueType.toLowerCase()}. Customer reported issues with service. Agent response time and solution provided need review. Revenue at risk: ${formatCurrency(item.revenueAtRisk)}.`,
        duration: '5m 23s',
        agent: 'Sarah Johnson'
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Revenue at Risk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Call
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.callId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {item.riskScore >= 80 && (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.company}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.issueType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getRiskColor(item.riskScore)}`}>
                      {item.riskScore}%
                    </span>
                    <div className="ml-2 w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.riskScore >= 80 ? 'bg-red-500' :
                          item.riskScore >= 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${item.riskScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(item.revenueAtRisk)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(item.lastCall)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handlePlayCall(item)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Play Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call Details Modal */}
      {selectedCall.data && (
        <CallDetailsModal
          isOpen={selectedCall.isOpen}
          onClose={() => setSelectedCall({ isOpen: false, data: null })}
          callData={selectedCall.data}
        />
      )}
    </>
  );
};

export default ChurnRiskTable; 