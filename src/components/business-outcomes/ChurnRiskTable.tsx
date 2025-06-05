import { Play, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CallDetailsModal from './CallDetailsModal';

interface ChurnRiskData {
  company: string;
  issueType: string;
  riskScore: number;
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
      riskScore: number;
    } | null;
  }>({
    isOpen: false,
    data: null
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handlePlayCall = (item: ChurnRiskData) => {
    setSelectedCall({
      isOpen: true,
      data: {
        customerId: item.callId.replace('CALL-', ''),
        phone: '(555) 123-4567',
        reason: item.issueType,
        summary: `Follow-up call review needed regarding ${item.issueType.toLowerCase()}. Customer reported issues with service. Agent response time and solution provided need review.`,
        duration: '5m 23s',
        agent: 'Sarah Johnson',
        riskScore: item.riskScore
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Issue</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Call</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.callId} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  {item.riskScore >= 80 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {item.company}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.issueType}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getRiskColor(item.riskScore)}`}></span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.riskScore}%</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">{formatDate(item.lastCall)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => handlePlayCall(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <Play className="h-4 w-4" />
                    Play Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal rendered as portal at document.body */}
      {selectedCall.isOpen && selectedCall.data &&
        createPortal(
          <CallDetailsModal
            isOpen={true}
            onClose={() => setSelectedCall({ isOpen: false, data: null })}
            callData={selectedCall.data}
          />,
          document.body
        )
      }
    </>
  );
};

export default ChurnRiskTable; 