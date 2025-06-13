import { AlertTriangle, Repeat, PhoneOff, FileLock, Smile, TrendingUp } from 'lucide-react';
import { AGENTS } from '../components/agents/AgentTab';
import { useState } from 'react';
import CallDetailsModal from '../components/business-outcomes/CallDetailsModal';

const summaryMetrics = [
  { 
    label: 'Call Quality', 
    value: 87, 
    icon: TrendingUp, 
    color: 'bg-blue-500 dark:bg-blue-600', 
    hoverColor: 'hover:bg-blue-600 dark:hover:bg-blue-700',
    info: 'Average quality score across all agents',
    trend: '+2.3% from last week'
  },
  { 
    label: 'Escalation Rate', 
    value: '4.2%', 
    icon: AlertTriangle, 
    color: 'bg-red-500 dark:bg-red-600', 
    hoverColor: 'hover:bg-red-600 dark:hover:bg-red-700',
    info: 'Percentage of calls requiring supervisor intervention',
    trend: '-0.5% from last week'
  },
  { 
    label: 'Repeat Call Rate', 
    value: '7.5%', 
    icon: Repeat, 
    color: 'bg-yellow-500 dark:bg-yellow-600', 
    hoverColor: 'hover:bg-yellow-600 dark:hover:bg-yellow-700',
    info: 'Calls from same customer within 24 hours',
    trend: '+1.2% from last week'
  },
  { 
    label: 'Abandonment', 
    value: '6.5%', 
    icon: PhoneOff, 
    color: 'bg-orange-500 dark:bg-orange-600', 
    hoverColor: 'hover:bg-orange-600 dark:hover:bg-orange-700',
    info: 'Calls abandoned before agent pickup',
    trend: '-0.8% from last week'
  },
  { 
    label: 'Compliance Flags', 
    value: 3, 
    icon: FileLock, 
    color: 'bg-purple-500 dark:bg-purple-600', 
    hoverColor: 'hover:bg-purple-600 dark:hover:bg-purple-700',
    info: 'Active compliance violations',
    trend: '-2 from last week'
  },
  { 
    label: 'Sentiment', 
    value: '82%', 
    icon: Smile, 
    color: 'bg-green-500 dark:bg-green-600', 
    hoverColor: 'hover:bg-green-600 dark:hover:bg-green-700',
    info: 'Positive customer sentiment score',
    trend: '+3.1% from last week'
  },
];

const escalationData = [
  { agent: 'Alex Johnson', escalations: 2 },
  { agent: 'Jamie Smith', escalations: 1 },
  { agent: 'Taylor Wilson', escalations: 3 },
  { agent: 'Sarah Johnson', escalations: 0 },
];

const repeatCallData = [
  { agent: 'Alex Johnson', repeat: 5 },
  { agent: 'Jamie Smith', repeat: 3 },
  { agent: 'Taylor Wilson', repeat: 7 },
  { agent: 'Sarah Johnson', repeat: 2 },
];

const abandonmentData = [
  { agent: 'Alex Johnson', abandoned: 4 },
  { agent: 'Jamie Smith', abandoned: 2 },
  { agent: 'Taylor Wilson', abandoned: 5 },
  { agent: 'Sarah Johnson', abandoned: 1 },
];

const sentimentPhrases = {
  positive: [
    { phrase: "Very helpful and professional", count: 45, agent: "Alex Johnson" },
    { phrase: "Resolved my issue quickly", count: 38, agent: "Sarah Johnson" },
    { phrase: "Excellent service", count: 32, agent: "Jamie Smith" },
    { phrase: "Very knowledgeable", count: 28, agent: "Alex Johnson" },
    { phrase: "Great communication", count: 25, agent: "Sarah Johnson" }
  ],
  negative: [
    { phrase: "Long wait times", count: 15, reason: "High call volume" },
    { phrase: "Unclear instructions", count: 12, reason: "Complex issue resolution" },
    { phrase: "Transfer required", count: 10, reason: "Department routing" },
    { phrase: "Technical difficulties", count: 8, reason: "System limitations" },
    { phrase: "Inconsistent information", count: 6, reason: "Policy updates" }
  ]
};

export const flaggedCalls = [
  { id: 'C-1001', agent: 'Taylor Wilson', issue: 'Escalation', date: '2024-05-13' },
  { id: 'C-1002', agent: 'Alex Johnson', issue: 'Compliance', date: '2024-05-13' },
  { id: 'C-1003', agent: 'Taylor Wilson', issue: 'Repeat Call', date: '2024-05-12' },
];

// Add mock churn risk data
const churnRiskCalls = [
  'C-1001', // Taylor Wilson's call is high churn risk
  // Add more call IDs as needed
];

// Mock churn risk data
const churnRiskData = [
  { customer: 'John Doe', risk: 'High', score: 92, lastInteraction: '2024-05-13', factors: 'Multiple escalations, negative sentiment', action: 'Priority retention call' },
  { customer: 'Jane Smith', risk: 'Medium', score: 76, lastInteraction: '2024-05-12', factors: 'Repeat calls, neutral sentiment', action: 'Follow-up survey' },
  { customer: 'Acme Corp', risk: 'Low', score: 45, lastInteraction: '2024-05-11', factors: 'Positive feedback', action: 'No action needed' },
];

const negativeFeedbackCallMocks = [
  {
    customerId: 'C-2011',
    phone: '+1-555-0101',
    reason: 'Long wait times',
    summary: 'Customer experienced a long wait before being connected due to high call volume.',
    duration: '2m 10s',
    agent: 'Alex Johnson',
    riskScore: 70,
    transcript: [
      { time: '0:00', speaker: 'agent', name: 'Alex Johnson', text: 'Thank you for waiting. Sorry for the delay, how can I help?' },
      { time: '0:05', speaker: 'customer', name: 'Jane Lee', text: 'I was on hold for over 10 minutes.' },
      { time: '0:12', speaker: 'agent', name: 'Alex Johnson', text: 'I apologize, we are experiencing high call volume.' },
      { time: '0:18', speaker: 'customer', name: 'Jane Lee', text: 'Please help me with my issue quickly.' },
    ]
  },
  {
    customerId: 'C-2012',
    phone: '+1-555-0102',
    reason: 'Unclear instructions',
    summary: 'Customer found the agent instructions confusing during a complex issue resolution.',
    duration: '1m 45s',
    agent: 'Sarah Johnson',
    riskScore: 65,
    transcript: [
      { time: '0:00', speaker: 'agent', name: 'Sarah Johnson', text: 'Let me walk you through the steps.' },
      { time: '0:04', speaker: 'customer', name: 'Chris Evans', text: 'I am not sure I understand what to do next.' },
      { time: '0:10', speaker: 'agent', name: 'Sarah Johnson', text: 'Sorry, let me clarify each step for you.' },
      { time: '0:16', speaker: 'customer', name: 'Chris Evans', text: 'Thank you, that helps.' },
    ]
  },
  {
    customerId: 'C-2013',
    phone: '+1-555-0103',
    reason: 'Transfer required',
    summary: 'Customer was transferred between departments due to routing.',
    duration: '1m 30s',
    agent: 'Jamie Smith',
    riskScore: 60,
    transcript: [
      { time: '0:00', speaker: 'agent', name: 'Jamie Smith', text: 'I see you need help with billing, let me transfer you.' },
      { time: '0:06', speaker: 'customer', name: 'Patricia Kim', text: 'I have already been transferred twice.' },
      { time: '0:12', speaker: 'agent', name: 'Jamie Smith', text: 'Sorry for the inconvenience, I will connect you to the right department.' },
      { time: '0:18', speaker: 'customer', name: 'Patricia Kim', text: 'Thank you.' },
    ]
  },
  {
    customerId: 'C-2014',
    phone: '+1-555-0104',
    reason: 'Technical difficulties',
    summary: 'Customer faced technical issues due to system limitations.',
    duration: '2m 00s',
    agent: 'Taylor Wilson',
    riskScore: 75,
    transcript: [
      { time: '0:00', speaker: 'agent', name: 'Taylor Wilson', text: 'I see you are having trouble with the app.' },
      { time: '0:05', speaker: 'customer', name: 'John Doe', text: 'It keeps crashing when I try to login.' },
      { time: '0:12', speaker: 'agent', name: 'Taylor Wilson', text: 'We are aware and working on a fix.' },
      { time: '0:18', speaker: 'customer', name: 'John Doe', text: 'Please let me know when it is resolved.' },
    ]
  },
  {
    customerId: 'C-2015',
    phone: '+1-555-0105',
    reason: 'Inconsistent information',
    summary: 'Customer received conflicting information due to recent policy updates.',
    duration: '1m 20s',
    agent: 'Alex Johnson',
    riskScore: 68,
    transcript: [
      { time: '0:00', speaker: 'agent', name: 'Alex Johnson', text: 'I understand you got different answers before.' },
      { time: '0:05', speaker: 'customer', name: 'Jane Lee', text: 'Yes, I was told two different things about my account.' },
      { time: '0:12', speaker: 'agent', name: 'Alex Johnson', text: 'There was a recent policy update, let me clarify.' },
      { time: '0:18', speaker: 'customer', name: 'Jane Lee', text: 'Thank you for explaining.' },
    ]
  },
];

export default function SupervisorDashboard() {
  const [flaggedModal, setFlaggedModal] = useState<null | { call: typeof flaggedCalls[0], agent: typeof AGENTS[0] | undefined }>(null);
  const [callModalIdx, setCallModalIdx] = useState<number|null>(null);

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supervisor Overview</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryMetrics.map((m) => (
          <div 
            key={m.label} 
            className={`rounded-xl p-4 flex flex-col items-center ${m.color} ${m.hoverColor} text-white transition-all duration-200 cursor-pointer relative group transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl`}
          >
            <m.icon className="h-6 w-6 mb-2" />
            <span className="text-lg font-bold text-white drop-shadow">{m.value}</span>
            <span className="text-xs font-semibold mt-1" style={{color: 'rgba(255,255,255,0.85)'}}>{m.trend}</span>
            <span className="block mt-3 text-xs font-medium text-white/90 tracking-wide text-center">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Agent Performance Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mt-8">
        <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Agent Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-xs text-left">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Agent</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">AHT</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Quality</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Sentiment</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Compliance</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Calls</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Escalations</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Repeat Calls</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Abandonment</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Needs Coaching</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...AGENTS].sort((a, b) => b.quality - a.quality).map((agent) => {
                const escalation = escalationData.find(e => e.agent === agent.name)?.escalations ?? 0;
                const repeat = repeatCallData.find(r => r.agent === agent.name)?.repeat ?? 0;
                const abandon = abandonmentData.find(a_ => a_.agent === agent.name)?.abandoned ?? 0;
                const needsCoaching = agent.compliance === 'Alert' || agent.quality < 85;
                return (
                  <tr key={agent.id} className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    <td className="px-3 py-2 flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                      <img src={agent.image} alt={agent.name} className="h-6 w-6 rounded-full object-cover" />
                      {agent.name}
                    </td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{agent.aht}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{agent.quality}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        agent.sentiment === 'Positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        agent.sentiment === 'Negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                      } flex items-center gap-1`}>
                        {agent.sentiment}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        agent.compliance === 'Alert' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        {agent.compliance}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{agent.calls}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{escalation}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{repeat}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{abandon}</td>
                    <td className="px-3 py-2">
                      {needsCoaching ? (
                        <span className="inline-block px-2 py-1 rounded bg-red-500 text-white text-xs font-bold">Yes</span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded bg-green-500 text-white text-xs font-bold">No</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <a href="/agent-performance" className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium">View Details</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Top Positive Phrases</h2>
          <div className="space-y-4">
            {sentimentPhrases.positive.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smile className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.phrase}</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{item.agent}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">{item.count} mentions</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Negative Feedback Analysis</h2>
          <div className="space-y-4">
            {sentimentPhrases.negative.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.phrase}</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">Reason: {item.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">{item.count} mentions</span>
                  <button
                    className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
                    onClick={() => setCallModalIdx(idx)}
                  >
                    View Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagged Calls/Issues Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Flagged Calls & Issues</h2>
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
      </div>

      {/* Flagged Call Details Modal */}
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
              {/* Churn Risk Badge */}
              {churnRiskCalls.includes(flaggedModal.call.id) && (
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 rounded bg-red-600 text-white text-xs font-bold">High Churn Risk</span>
                </div>
              )}
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

      {/* Churn Risk Analysis Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mt-8">
        <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Churn Risk Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-xs text-left">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Customer</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Risk</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Score</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Last Interaction</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Risk Factors</th>
                <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {churnRiskData.map((row) => (
                <tr key={row.customer} className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                  <td className="px-3 py-2 text-gray-900 dark:text-white font-medium">{row.customer}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${row.risk === 'High' ? 'bg-red-500 text-white' : row.risk === 'Medium' ? 'bg-yellow-400 text-gray-900' : 'bg-green-500 text-white'}`}>{row.risk}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-900 dark:text-white">{row.score}</td>
                  <td className="px-3 py-2 text-gray-900 dark:text-white">{row.lastInteraction}</td>
                  <td className="px-3 py-2 text-gray-900 dark:text-white">{row.factors}</td>
                  <td className="px-3 py-2 text-gray-900 dark:text-white">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {callModalIdx !== null && (
        <CallDetailsModal
          isOpen={callModalIdx !== null}
          onClose={() => setCallModalIdx(null)}
          callData={negativeFeedbackCallMocks[callModalIdx]}
        />
      )}
    </div>
  );
} 