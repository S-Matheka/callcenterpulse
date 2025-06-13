import { useState } from 'react';
import { Eye, Clock, ThumbsUp, Star } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import ComplianceChecklist from '../call-review/ComplianceChecklist';
import CallSummary from '../call-review/CallSummary';
import type { ComplianceItem, AgentScorecard as AgentScorecardType } from '../call-review/types';

export const AGENTS = [
  {
    id: 'a1',
    name: 'Alex Johnson',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    aht: '4m 12s',
    quality: 92,
    sentiment: 'Positive',
    compliance: 'Pass',
    calls: 120,
    highlights: ['Great greeting', 'Resolved issue quickly'],
    transcript: [
      { time: '0:00', speaker: 'agent', text: 'Thank you for calling, how can I help?' },
      { time: '0:05', speaker: 'customer', text: 'I need help with my bill.' },
      { time: '0:12', speaker: 'agent', text: 'Let me check your account.' },
      { time: '0:30', speaker: 'customer', text: 'Thank you.' },
    ],
    complianceAlerts: [],
    recommendations: ['Keep up the positive tone', 'Continue quick resolutions'],
  },
  {
    id: 'a2',
    name: 'Jamie Smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    aht: '5m 45s',
    quality: 85,
    sentiment: 'Neutral',
    compliance: 'Pass',
    calls: 98,
    highlights: ['Handled escalation', 'Used compliance phrase'],
    transcript: [
      { time: '0:00', speaker: 'agent', text: 'Hello, how can I help you?' },
      { time: '0:04', speaker: 'customer', text: 'I want to change my plan.' },
      { time: '0:10', speaker: 'agent', text: 'I can help with that.' },
      { time: '0:20', speaker: 'customer', text: 'Thank you.' },
    ],
    complianceAlerts: [],
    recommendations: ['Be more proactive with empathy'],
  },
  {
    id: 'a3',
    name: 'Taylor Wilson',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    aht: '6m 30s',
    quality: 78,
    sentiment: 'Negative',
    compliance: 'Alert',
    calls: 110,
    highlights: ['Missed compliance phrase', 'Escalation trigger'],
    transcript: [
      { time: '0:00', speaker: 'agent', text: 'Thank you for calling.' },
      { time: '0:03', speaker: 'customer', text: 'I am frustrated with my service.' },
      { time: '0:10', speaker: 'agent', text: 'I apologize for the trouble.' },
      { time: '0:18', speaker: 'customer', text: 'I want to speak to a supervisor.' },
    ],
    complianceAlerts: ['Missed required phrase: "Your call may be recorded"'],
    recommendations: ['Review compliance checklist', 'De-escalate early'],
  },
  {
    id: 'a4',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    aht: '4m 55s',
    quality: 88,
    sentiment: 'Positive',
    compliance: 'Pass',
    calls: 105,
    highlights: ['Excellent closing', 'Positive sentiment'],
    transcript: [
      { time: '0:00', speaker: 'agent', text: 'Hello, thank you for calling.' },
      { time: '0:06', speaker: 'customer', text: 'I need help with my account.' },
      { time: '0:12', speaker: 'agent', text: 'I can assist you with that.' },
      { time: '0:20', speaker: 'customer', text: 'Thanks for your help.' },
    ],
    complianceAlerts: [],
    recommendations: ['Keep up positive engagement'],
  },
];

type AgentScorecardNoAdherence = Omit<AgentScorecardType, 'adherence'>;

function parseAhtToSeconds(aht: string): number {
  // Supports 'Xm Ys', 'Xm', 'Ys', or 'N' (seconds only)
  const match = aht.match(/(?:(\d+)m)?\s*(\d+)s?/);
  if (!match) return 0;
  const mins = match[1] ? parseInt(match[1], 10) : 0;
  const secs = match[2] ? parseInt(match[2], 10) : 0;
  return mins * 60 + secs;
}

const getAgentScorecard = (agent: typeof AGENTS[0]): AgentScorecardNoAdherence => ({
  aht: { value: parseAhtToSeconds(agent.aht), target: 300, unit: 's' },
  sentiment: { value: agent.sentiment === 'Positive' ? 0.9 : agent.sentiment === 'Negative' ? 0.4 : 0.7, trend: agent.sentiment === 'Positive' ? 4.2 : -2.1 },
  qualityScore: {
    value: agent.quality,
    breakdown: [
      { category: 'Communication', score: agent.quality - 2 },
      { category: 'Problem Resolution', score: agent.quality - 4 },
      { category: 'Compliance', score: agent.compliance === 'Alert' ? 70 : 100 },
      { category: 'Efficiency', score: agent.quality - 6 },
    ],
  },
});

const getComplianceChecklist = (agent: typeof AGENTS[0]): ComplianceItem[] => [
  { id: '1', label: 'Greeting', required: true, status: 'pass', timestamp: '0:00' },
  { id: '2', label: 'Identity Verification', required: true, status: agent.compliance === 'Alert' ? 'fail' : 'pass', timestamp: '0:10' },
  { id: '3', label: 'Issue Documentation', required: true, status: 'pass', timestamp: '0:20' },
  { id: '4', label: 'Solution Provided', required: true, status: 'pass', timestamp: '0:30' },
  { id: '5', label: 'Closing', required: true, status: 'na' },
];

const getCallSummary = (agent: typeof AGENTS[0]) => ({
  key_points: [
    `Handled ${agent.calls} calls this period`,
    agent.sentiment === 'Negative' ? 'Several escalations detected' : 'Consistently positive customer sentiment',
    agent.compliance === 'Alert' ? 'Compliance issue flagged' : 'All compliance checks passed',
  ],
  action_items: [
    'Continue to monitor call quality',
    agent.compliance === 'Alert' ? 'Review compliance checklist' : 'Maintain current performance',
  ],
  areas_of_concern: agent.compliance === 'Alert' ? ['Missed compliance phrase', 'Escalation triggers present'] : [],
  positive_highlights: agent.sentiment === 'Positive' ? ['Positive customer feedback', 'Quick resolutions'] : [],
});

const getCoachingNeeds = (agent: typeof AGENTS[0]): string[] =>
  (agent.compliance === 'Alert' || agent.quality < 85)
    ? [
        ...(agent.compliance === 'Alert' ? ['Review compliance requirements', 'Practice required phrases'] : []),
        ...(agent.quality < 85 ? ['Focus on problem resolution', 'Improve communication clarity'] : []),
      ]
    : [];

// Local AgentScorecard for modal (no adherence)
const AgentScorecardNoAdherence = ({ scorecard }: { scorecard: Omit<AgentScorecardType, 'adherence'> }) => {
  const getProgressColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 1) return 'bg-green-500';
    if (ratio >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Agent Scorecard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AHT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Average Handle Time</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Target: {scorecard.aht.target}{scorecard.aht.unit}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(scorecard.aht.value, scorecard.aht.target)}`}
                style={{ width: `${(scorecard.aht.value / scorecard.aht.target) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {scorecard.aht.value}{scorecard.aht.unit}
            </span>
          </div>
        </div>
        {/* Sentiment Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Sentiment Score</span>
            </div>
            <span className={`text-sm font-medium ${scorecard.sentiment.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>{scorecard.sentiment.trend >= 0 ? '↑' : '↓'} {Math.abs(scorecard.sentiment.trend)}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${scorecard.sentiment.value * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{(scorecard.sentiment.value * 10).toFixed(1)}</span>
          </div>
        </div>
        {/* Quality Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Quality Score</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${scorecard.qualityScore.value}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{scorecard.qualityScore.value}%</span>
          </div>
        </div>
      </div>
      {/* Score Breakdown */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Score Breakdown</h4>
        <div className="space-y-2">
          {scorecard.qualityScore.breakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.category}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getAgentImprovementData = (agent: typeof AGENTS[0]) => [
  // Mock 6-week trend data for AHT (in seconds), Quality, Sentiment (0-1)
  { week: 'W1', aht: 320, quality: Number(agent.quality) - 4, sentiment: agent.sentiment === 'Positive' ? 0.85 : agent.sentiment === 'Negative' ? 0.35 : 0.65 },
  { week: 'W2', aht: 310, quality: Number(agent.quality) - 2, sentiment: agent.sentiment === 'Positive' ? 0.87 : agent.sentiment === 'Negative' ? 0.38 : 0.68 },
  { week: 'W3', aht: 305, quality: Number(agent.quality) - 1, sentiment: agent.sentiment === 'Positive' ? 0.89 : agent.sentiment === 'Negative' ? 0.40 : 0.70 },
  { week: 'W4', aht: 300, quality: Number(agent.quality), sentiment: agent.sentiment === 'Positive' ? 0.90 : agent.sentiment === 'Negative' ? 0.42 : 0.72 },
  { week: 'W5', aht: 295, quality: Number(agent.quality) + 1, sentiment: agent.sentiment === 'Positive' ? 0.91 : agent.sentiment === 'Negative' ? 0.43 : 0.73 },
  { week: 'W6', aht: 290, quality: Number(agent.quality) + 2, sentiment: agent.sentiment === 'Positive' ? 0.92 : agent.sentiment === 'Negative' ? 0.44 : 0.74 },
];

const AgentDetailsModal = ({ agent, onClose }: { agent: typeof AGENTS[0], onClose: () => void }) => {
  const scorecard = getAgentScorecard(agent);
  const compliance = getComplianceChecklist(agent);
  const summary = getCallSummary(agent);
  const coaching = getCoachingNeeds(agent);
  const improvementData = getAgentImprovementData(agent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl px-12 mx-4 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Agent Drill-Down: {agent.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ×
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AgentScorecardNoAdherence scorecard={scorecard} />
            <ComplianceChecklist items={compliance} />
          </div>
          {/* Agent Improvement Over Time Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Agent Improvement Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={improvementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="text-gray-200 dark:text-gray-700" />
                  <XAxis dataKey="week" className="text-gray-600 dark:text-gray-200" />
                  <YAxis yAxisId="left" label={{ value: 'AHT (s)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} className="text-blue-500" />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Quality/Sentiment', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 12 }} className="text-green-500" />
                  <Tooltip formatter={(value, name) => name === 'sentiment' ? `${(Number(value) * 100).toFixed(0)}%` : value} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="aht" name="AHT (s)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="quality" name="Quality Score" stroke="#f59e42" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="sentiment" name="Sentiment" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
              <span className="font-semibold">AHT</span>: Average Handle Time (lower is better). <span className="font-semibold">Quality</span>: Call Quality Score. <span className="font-semibold">Sentiment</span>: Customer Sentiment (higher is better).
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CallSummary summary={summary} />
            {coaching.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 h-fit">
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                  Coaching Needs
                </h3>
                <ul className="text-xs text-red-800 dark:text-red-200 list-disc ml-4">
                  {coaching.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgentTab() {
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null);

  // Explicitly assign Sarah and Alex to top, Jamie and Taylor to low
  const topPerformers = AGENTS.filter(a => a.name === 'Sarah Johnson' || a.name === 'Alex Johnson');
  const lowPerformers = AGENTS.filter(a => a.name === 'Jamie Smith' || a.name === 'Taylor Wilson');

  // Sort all agents by quality, high to low
  const sortedAgents = AGENTS.sort((a, b) => b.quality - a.quality);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Top Performing Agents</h2>
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">AHT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Call Quality Score
                <span className="block text-[10px] font-normal text-gray-400 dark:text-gray-500 normal-case">(out of 100)</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sentiment</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Calls</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.map((agent, idx) => (
              <tr key={agent.id} className={`transition border-b border-gray-200 dark:border-gray-800 ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/70' : ''} hover:bg-gray-100 dark:hover:bg-gray-800/60`}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <img src={agent.image} alt={agent.name} className="h-7 w-7 rounded-full object-cover" />
                    {agent.name}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.aht}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-1">
                  <span>{agent.quality}</span>
                  <span className="ml-1"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.sentiment === 'Positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    agent.sentiment === 'Negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                    'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                  } flex items-center gap-1`}>
                    <span>{agent.sentiment}</span>
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.compliance === 'Alert' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {agent.compliance}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.calls}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => setSelectedAgent(agent)} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-xs">
                    <Eye className="h-4 w-4" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Lowest Performing Agents</h2>
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">AHT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Call Quality Score
                <span className="block text-[10px] font-normal text-gray-400 dark:text-gray-500 normal-case">(out of 100)</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sentiment</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Calls</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {lowPerformers.map((agent, idx) => (
              <tr key={agent.id} className={`transition border-b border-gray-200 dark:border-gray-800 ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/70' : ''} hover:bg-gray-100 dark:hover:bg-gray-800/60`}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <img src={agent.image} alt={agent.name} className="h-7 w-7 rounded-full object-cover" />
                    {agent.name}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.aht}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-1">
                  <span>{agent.quality}</span>
                  <span className="ml-1"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.sentiment === 'Positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    agent.sentiment === 'Negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                    'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                  } flex items-center gap-1`}>
                    <span>{agent.sentiment}</span>
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.compliance === 'Alert' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {agent.compliance}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.calls}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => setSelectedAgent(agent)} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-xs">
                    <Eye className="h-4 w-4" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">All Agents (Sorted High to Low)</h2>
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">AHT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Call Quality Score
                <span className="block text-[10px] font-normal text-gray-400 dark:text-gray-500 normal-case">(out of 100)</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sentiment</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Calls</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedAgents.map((agent, idx) => (
              <tr key={agent.id} className={`transition border-b border-gray-200 dark:border-gray-800 ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/70' : ''} hover:bg-gray-100 dark:hover:bg-gray-800/60`}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <img src={agent.image} alt={agent.name} className="h-7 w-7 rounded-full object-cover" />
                    {agent.name}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.aht}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-1">
                  <span>{agent.quality}</span>
                  <span className="ml-1"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.sentiment === 'Positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    agent.sentiment === 'Negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                    'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                  } flex items-center gap-1`}>
                    <span>{agent.sentiment}</span>
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.compliance === 'Alert' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {agent.compliance}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">{agent.calls}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => setSelectedAgent(agent)} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-xs">
                    <Eye className="h-4 w-4" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAgent && <AgentDetailsModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}

      {/* Team Performance Comparison Bar Graph */}
      <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Team Performance Comparison</h3>
        <div className="h-64">
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
              <Bar dataKey="handleTime" name="Avg Handle Time" fill="#3b82f6" />
              <Bar dataKey="sentiment" name="Sentiment Score" fill="#22c55e" />
              <Bar dataKey="adherence" name="Script Adherence" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 