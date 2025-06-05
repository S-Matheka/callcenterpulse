import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Phone, PhoneCall, Clock, X, 
  Brain, Users, Globe, AlertTriangle, Award
} from 'lucide-react';
import Modal from '../components/shared/Modal';
import { 
  TotalCallsDrillDown, 
  TotalAnsweredDrillDown, 
  AbandonedCallsDrillDown, 
  WaitTimeDrillDown,
  SentimentDrillDown
} from '../components/dashboard/DrillDownViews';
import { dailyData, churnRiskData, omnichannelTrendsData } from '../data/mockData';
import { 
  ResponsiveContainer, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  BarChart,
  Bar,
  AreaChart, 
  Area 
} from 'recharts';
import ChurnRiskTable from '../components/business-outcomes/ChurnRiskTable';
import { flaggedCalls } from './SupervisorDashboard';
import { AGENTS } from '../components/agents/AgentTab';

const AbandonedCallIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <Phone className="h-full w-full" />
    <X className="absolute -top-1 -right-1 h-3 w-3" />
  </div>
);

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  iconColor: string;
  onClick: () => void;
}

const KpiCard = ({ title, value, change, icon: Icon, iconColor, onClick }: KpiCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer group hover:shadow-lg hover:scale-[1.02] hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-200 relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${iconColor} rounded-full p-2 group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        </div>
      </div>
      <div className="mt-2 mb-8">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        <div className="flex items-center mt-2 flex-wrap">
          <div className="flex items-center">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span 
              className={`ml-2 text-sm font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {Math.abs(change)}%
            </span>
          </div>
          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
            from last period
          </span>
        </div>
      </div>
      <span
        className="absolute bottom-4 right-4 text-sm text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200"
      >
        View Details
      </span>
    </div>
  );
};

interface SectionCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SectionCard = ({ title, icon: Icon, children, className = '', onClick }: SectionCardProps) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-200 ${className}`}
  >
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [flaggedModal, setFlaggedModal] = useState<null | { call: typeof flaggedCalls[0], agent: typeof AGENTS[0] | undefined }>(null);

  // Get user's first name from localStorage
  const userEmail = localStorage.getItem('userEmail') || '';
  const firstName = userEmail.split('@')[0].split('.')[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 22) return 'Good Evening';
    return 'Good Night';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const kpiData = [
    {
      title: 'Total Calls',
      value: formatNumber(dailyData.totalCalls),
      change: 5.2,
      icon: Phone,
      iconColor: 'bg-blue-500',
      drillDownTitle: 'Total Calls Analysis',
      drillDownComponent: TotalCallsDrillDown
    },
    {
      title: 'Total Answered',
      value: formatNumber(dailyData.totalAnswered),
      change: 3.8,
      icon: PhoneCall,
      iconColor: 'bg-green-500',
      drillDownTitle: 'Answered Calls Analysis',
      drillDownComponent: TotalAnsweredDrillDown
    },
    {
      title: 'Total Abandoned',
      value: formatNumber(dailyData.totalAbandoned),
      change: -12.4,
      icon: AbandonedCallIcon,
      iconColor: 'bg-red-500',
      drillDownTitle: 'Abandoned Calls Analysis',
      drillDownComponent: AbandonedCallsDrillDown
    },
    {
      title: 'Average Wait Time',
      value: formatTime(dailyData.avgWaitTime),
      change: -8.6,
      icon: Clock,
      iconColor: 'bg-amber-500',
      drillDownTitle: 'Wait Time Analysis',
      drillDownComponent: WaitTimeDrillDown
    }
  ];

  const selectedKpi = kpiData.find(kpi => kpi.title === selectedMetric);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, {capitalizedFirstName}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          Here's an overview of your call center's performance today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            onClick={() => setSelectedMetric(kpi.title)}
          />
        ))}
      </div>

      {/* AI & vCons Insights - Full Width */}
      <div>
        <SectionCard title="AI & vCons Insights" icon={Brain}>
          <div>
            <SentimentDrillDown />
          </div>
        </SectionCard>
      </div>

      {/* Other Cards in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <SectionCard title="Agent Performance" icon={Users}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-100">Top Performers</span>
                  <a href="/agent-performance" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</a>
                </div>
                <div className="space-y-1.5">
                  {[
                    { 
                      name: 'Alex Johnson', 
                      score: 92, 
                      metric: 'Sentiment',
                      aht: '244s',
                      image: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    { 
                      name: 'Jamie Smith', 
                      score: 85, 
                      metric: 'Sentiment',
                      aht: '310s',
                      image: 'https://randomuser.me/api/portraits/women/44.jpg'
                    },
                    { 
                      name: 'Taylor Wilson', 
                      score: 78, 
                      metric: 'Sentiment',
                      aht: '285s',
                      image: 'https://randomuser.me/api/portraits/women/68.jpg'
                    }
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-1.5 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={agent.image} 
                          alt={agent.name}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{agent.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">AHT: {agent.aht} | Top {agent.metric}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Award className="h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{agent.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">Team Performance Comparison</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { team: 'Support', handleTime: 240, sentiment: 85, adherence: 95 },
                      { team: 'Sales', handleTime: 280, sentiment: 88, adherence: 92 },
                      { team: 'Billing', handleTime: 260, sentiment: 82, adherence: 90 },
                      { team: 'Technical', handleTime: 290, sentiment: 80, adherence: 88 },
                      { team: 'Onboard', handleTime: 250, sentiment: 86, adherence: 93 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="text-gray-200 dark:text-gray-700" />
                      <XAxis 
                        dataKey="team" 
                        fontSize={11} 
                        className="text-gray-600 dark:text-gray-200"
                        tick={{ fill: 'currentColor' }}
                        axisLine={{ stroke: 'currentColor' }}
                      />
                      <YAxis 
                        fontSize={11} 
                        className="text-gray-600 dark:text-gray-200"
                        tick={{ fill: 'currentColor' }}
                        axisLine={{ stroke: 'currentColor' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--tooltip-bg, #fff)',
                          border: '1px solid var(--tooltip-border, #e5e7eb)',
                          borderRadius: '0.5rem',
                          color: 'var(--tooltip-color, #1f2937)',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: 'currentColor' }}
                        labelStyle={{ color: 'currentColor', fontWeight: 'bold' }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px' }}
                        formatter={(value) => (
                          <span className="text-gray-700 dark:text-gray-200">{value}</span>
                        )}
                      />
                      <Bar dataKey="handleTime" name="Avg Handle Time" fill="var(--chart-blue, #3b82f6)" />
                      <Bar dataKey="sentiment" name="Sentiment Score" fill="var(--chart-green, #22c55e)" />
                      <Bar dataKey="adherence" name="Script Adherence" fill="var(--chart-yellow, #eab308)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Omnichannel Trends" icon={Globe}>
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Interactions by Channel</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={omnichannelTrendsData.interactions} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="voice" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Voice" />
                    <Area type="monotone" dataKey="chat" stackId="1" stroke="#22c55e" fill="#22c55e" name="Chat" />
                    <Area type="monotone" dataKey="sms" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="SMS" />
                    <Area type="monotone" dataKey="email" stackId="1" stroke="#ef4444" fill="#ef4444" name="Email" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Channel Effectiveness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {omnichannelTrendsData.effectiveness.map((channel) => (
                  <div key={channel.channel} className="flex flex-col gap-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <span className="font-semibold text-gray-900 dark:text-white mb-1">{channel.channel}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">CSAT <span className="font-bold text-gray-900 dark:text-white">{channel.csat}%</span></span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Resolution <span className="font-bold text-gray-900 dark:text-white">{channel.resolution}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
        <div className="flex flex-col gap-6">
          <SectionCard title="Churn Risk Analysis" icon={AlertTriangle}>
            <div className="max-h-[400px] overflow-y-auto">
              <ChurnRiskTable data={churnRiskData} />
            </div>
          </SectionCard>
          <SectionCard title="Flagged Calls & Issues" icon={AlertTriangle}>
            <div className="overflow-x-auto">
              <table className="min-w-[400px] w-full text-xs text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Call ID</th>
                    <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Agent</th>
                    <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Issue</th>
                    <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Date</th>
                    <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedCalls.map((row, idx) => {
                    const agent = AGENTS.find(a => a.name === row.agent);
                    return (
                      <tr key={row.id} className={`border-b border-gray-100 dark:border-gray-800 transition ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/60' : 'bg-white dark:bg-gray-900'} hover:bg-blue-50 dark:hover:bg-blue-900/30`}>
                        <td className="px-3 py-2 font-mono text-gray-900 dark:text-white">{row.id}</td>
                        <td className="px-3 py-2 flex items-center gap-2 text-gray-900 dark:text-white">
                          {agent && <img src={agent.image} alt={agent.name} className="h-6 w-6 rounded-full object-cover" />}
                          {row.agent}
                        </td>
                        <td className="px-3 py-2 text-gray-900 dark:text-white">{row.issue}</td>
                        <td className="px-3 py-2 text-gray-900 dark:text-white">{row.date}</td>
                        <td className="px-3 py-2">
                          <button
                            className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
                            onClick={() => setFlaggedModal({ call: row, agent })}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </div>

      {selectedKpi && (
        <Modal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedKpi.drillDownTitle}
        >
          <selectedKpi.drillDownComponent />
        </Modal>
      )}

      {/* Flagged Call Details Modal (reuse SupervisorDashboard logic) */}
      {flaggedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-y-auto max-h-[90vh] border border-gray-200 dark:border-gray-700 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
              onClick={() => setFlaggedModal(null)}
              aria-label="Close"
            >×</button>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Flagged Call Details</h3>
              <div className="flex items-center gap-3 mb-4">
                {flaggedModal.agent && <img src={flaggedModal.agent.image} alt={flaggedModal.agent.name} className="h-10 w-10 rounded-full object-cover" />}
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{flaggedModal.agent?.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Call ID: <span className="font-mono text-gray-800 dark:text-gray-200">{flaggedModal.call.id}</span></div>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-200">Issue:</span> <span className="text-gray-900 dark:text-white">{flaggedModal.call.issue}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-200">Date:</span> <span className="text-gray-900 dark:text-white">{flaggedModal.call.date}</span>
              </div>
              {flaggedModal.agent?.complianceAlerts?.length ? (
                <div className="mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Compliance Alerts:</span>
                  <ul className="list-disc ml-5 text-xs text-red-700 dark:text-red-300">
                    {flaggedModal.agent.complianceAlerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              ) : null}
              {flaggedModal.agent?.transcript?.length ? (
                <div className="mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Transcript Snippet:</span>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 mt-1 text-xs text-gray-800 dark:text-gray-100 max-h-32 overflow-y-auto font-mono">
                    {flaggedModal.agent.transcript.slice(0, 4).map((line, i) => (
                      <div key={i}>
                        <span className="text-gray-500 dark:text-gray-400">[{line.time}]</span> <span className="font-bold text-gray-900 dark:text-white">{line.speaker === 'agent' ? 'Agent' : 'Customer'}:</span> <span className="text-gray-800 dark:text-gray-100">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {flaggedModal.agent?.recommendations?.length ? (
                <div className="mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Recommendations:</span>
                  <ul className="list-disc ml-5 text-xs text-blue-700 dark:text-blue-400">
                    {flaggedModal.agent.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setFlaggedModal(null)} />
        </div>
      )}

      <style>{`
        :global(:root) {
          --chart-blue: #3b82f6;
          --chart-green: #22c55e;
          --chart-yellow: #eab308;
          --chart-red: #ef4444;
          --chart-gray: #9ca3af;
          --tooltip-bg: #ffffff;
          --tooltip-color: #1f2937;
          --tooltip-border: #e5e7eb;
        }

        :global(.dark) {
          --chart-blue: #60a5fa;
          --chart-green: #4ade80;
          --chart-yellow: #facc15;
          --chart-red: #f87171;
          --chart-gray: #d1d5db;
          --tooltip-bg: #1f2937;
          --tooltip-color: #ffffff;
          --tooltip-border: #374151;
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }

        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 