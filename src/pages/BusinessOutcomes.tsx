import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import RevenueChart from '../components/business-outcomes/RevenueChart';
import ConversionFunnel from '../components/business-outcomes/ConversionFunnel';
import ChurnRiskTable from '../components/business-outcomes/ChurnRiskTable';

const BusinessOutcomes = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueData = {
    departments: {
      support: 125000,
      sales: 250000,
      billing: 75000
    },
    agentPerformance: [
      { name: 'Sarah Johnson', revenue: 45000, conversions: 28 },
      { name: 'Mike Brown', revenue: 38000, conversions: 23 },
      { name: 'Emily Davis', revenue: 42000, conversions: 25 }
    ],
    outcomeTypes: {
      upsell: 180000,
      renewal: 170000,
      crossSell: 100000
    }
  };

  const funnelData = {
    steps: [
      { name: 'Calls', value: 1000 },
      { name: 'Issue Identified', value: 850 },
      { name: 'Solution Provided', value: 650 },
      { name: 'Upsell Opportunity', value: 300 },
      { name: 'Conversion', value: 150 }
    ],
    channels: {
      support: [700, 595, 455, 210, 105],
      sales: [200, 170, 130, 60, 30],
      billing: [100, 85, 65, 30, 15]
    }
  };

  const churnRiskData = [
    {
      company: 'Acme Corp',
      issueType: 'Service Degradation',
      riskScore: 85,
      revenueAtRisk: 50000,
      lastCall: '2024-03-15',
      callId: 'CALL-2024-001'
    },
    {
      company: 'TechStart Inc',
      issueType: 'Billing Dispute',
      riskScore: 75,
      revenueAtRisk: 35000,
      lastCall: '2024-03-14',
      callId: 'CALL-2024-002'
    },
    {
      company: 'Global Services Ltd',
      issueType: 'Feature Request',
      riskScore: 65,
      revenueAtRisk: 25000,
      lastCall: '2024-03-13',
      callId: 'CALL-2024-003'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Outcomes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track revenue attribution and customer conversion metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Revenue Attribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Revenue Attribution
            </h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            >
              <option value="all">All Departments</option>
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="billing">Billing</option>
            </select>
          </div>
          <RevenueChart data={revenueData} />
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Conversion Funnel
          </h2>
          <ConversionFunnel data={funnelData} />
        </div>
      </div>

      {/* Churn Risk Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
          Churn Risk Alerts
        </h2>
        <ChurnRiskTable data={churnRiskData} />
      </div>
    </div>
  );
};

export default BusinessOutcomes; 