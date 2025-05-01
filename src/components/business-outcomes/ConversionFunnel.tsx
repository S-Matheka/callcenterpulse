import { FunnelChart, Funnel, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionFunnelProps {
  data: {
    steps: Array<{
      name: string;
      value: number;
    }>;
    channels: {
      [key: string]: number[];
    };
  };
}

const ConversionFunnel = ({ data }: ConversionFunnelProps) => {
  const colors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];
  
  const calculateDropoff = (current: number, previous: number) => {
    const dropoff = ((previous - current) / previous) * 100;
    return Math.round(dropoff);
  };

  return (
    <div className="space-y-6">
      {/* Main Funnel */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip
              formatter={(value) => [`${value} Calls`, '']}
              labelFormatter={(index) => data.steps[index as number].name}
            />
            <Funnel
              data={data.steps}
              dataKey="value"
              nameKey="name"
              labelLine={false}
            >
              {data.steps.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Funnel Metrics */}
      <div className="grid grid-cols-1 gap-4">
        {data.steps.map((step, index) => {
          if (index === 0) return null;
          const previousStep = data.steps[index - 1];
          const dropoff = calculateDropoff(step.value, previousStep.value);

          return (
            <div key={step.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {previousStep.name} → {step.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {previousStep.value} → {step.value} calls
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {dropoff}% drop-off
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Funnel by Channel</h3>
        <div className="space-y-3">
          {Object.entries(data.channels).map(([channel, values]) => (
            <div key={channel} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                  {channel}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {values[0]} → {values[values.length - 1]} ({Math.round((values[values.length - 1] / values[0]) * 100)}% conversion)
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(values[values.length - 1] / values[0]) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel; 