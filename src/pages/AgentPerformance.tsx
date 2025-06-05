import AgentTab from '../components/agents/AgentTab';

const AgentPerformance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here's a snapshot of agent metrics and performance analytics.
        </p>
      </div>
      <AgentTab />
    </div>
  );
};

export default AgentPerformance; 