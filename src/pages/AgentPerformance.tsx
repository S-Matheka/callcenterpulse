import { Clock, Phone, ThumbsUp, Users2, Star, BarChart3, UserCheck } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ElementType;
  description: string;
  className?: string;
}

const PerformanceCard = ({ title, value, trend, icon: Icon, description, className = '' }: PerformanceCardProps) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
          <Icon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      {trend !== undefined && (
        <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

interface AgentMetricsRowProps {
  agent: {
    name: string;
    photo: string;
    callsHandled: number;
    avgHandleTime: string;
    satisfaction: number;
    status: 'online' | 'busy' | 'offline';
  };
}

const AgentMetricsRow = ({ agent }: AgentMetricsRowProps) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
    <div className="flex items-center space-x-4">
      <img src={agent.photo} alt={agent.name} className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{agent.name}</h4>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          agent.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          agent.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>
    </div>
    <div className="flex items-center space-x-8">
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Calls</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.callsHandled}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Avg Time</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.avgHandleTime}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">CSAT</p>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{agent.satisfaction}</span>
        </div>
      </div>
    </div>
  </div>
);

const AgentPerformance = () => {
  const topAgents = [
    {
      name: "Sarah Johnson",
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
      callsHandled: 45,
      avgHandleTime: "4:32",
      satisfaction: 4.8,
      status: 'online' as const,
    },
    {
      name: "Michael Chen",
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
      callsHandled: 38,
      avgHandleTime: "5:15",
      satisfaction: 4.7,
      status: 'busy' as const,
    },
    {
      name: "Emily Rodriguez",
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
      callsHandled: 42,
      avgHandleTime: "4:45",
      satisfaction: 4.6,
      status: 'online' as const,
    },
    {
      name: "David Kim",
      photo: "https://randomuser.me/api/portraits/men/4.jpg",
      callsHandled: 35,
      avgHandleTime: "5:30",
      satisfaction: 4.5,
      status: 'offline' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time agent metrics and performance analytics
        </p>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceCard
          title="Average Handle Time"
          value="4:45"
          trend={-8.3}
          icon={Clock}
          description="Average time spent handling each call"
        />
        <PerformanceCard
          title="Calls per Agent"
          value="32"
          trend={5.7}
          icon={Phone}
          description="Average number of calls handled per agent"
        />
        <PerformanceCard
          title="Customer Satisfaction"
          value="4.6"
          trend={2.1}
          icon={ThumbsUp}
          description="Average customer satisfaction rating"
        />
        <PerformanceCard
          title="Active Agents"
          value="24"
          icon={Users2}
          description="Number of agents currently handling calls"
        />
      </div>

      {/* Performance Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            {[
              { metric: 'First Call Resolution Rate', value: '76%', trend: '+3%' },
              { metric: 'Average Speed of Answer', value: '28s', trend: '-5s' },
              { metric: 'Adherence to Schedule', value: '94%', trend: '+2%' },
              { metric: 'Quality Score', value: '92%', trend: '+4%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-sm text-gray-900 dark:text-white">{item.metric}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-900 dark:text-white">{item.value}</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Skill Distribution
          </h3>
          <div className="space-y-4">
            {[
              { skill: 'Technical Support', agents: 12, proficiency: '92%' },
              { skill: 'Customer Service', agents: 18, proficiency: '88%' },
              { skill: 'Sales', agents: 8, proficiency: '85%' },
              { skill: 'Account Management', agents: 10, proficiency: '90%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-sm text-gray-900 dark:text-white">{item.skill}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.agents} agents</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{item.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Agents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Performing Agents</h3>
          <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {topAgents.map((agent, index) => (
            <AgentMetricsRow key={index} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentPerformance; 