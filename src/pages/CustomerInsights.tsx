import { HeartHandshake, Brain, Sparkles, MessageSquare, TrendingUp, AlertTriangle, CheckCircle2, Users } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ElementType;
  description: string;
  className?: string;
}

const InsightCard = ({ title, value, trend, icon: Icon, description, className = '' }: InsightCardProps) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
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

const CustomerInsights = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI & vCons Insights</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI-powered analytics and virtual consultant performance metrics
        </p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="AI Resolution Rate"
          value="78%"
          trend={5.2}
          icon={Brain}
          description="Percentage of inquiries resolved by AI without human intervention"
        />
        <InsightCard
          title="Sentiment Score"
          value="8.5/10"
          trend={2.1}
          icon={HeartHandshake}
          description="Average customer sentiment during AI interactions"
        />
        <InsightCard
          title="Response Accuracy"
          value="92%"
          trend={1.8}
          icon={CheckCircle2}
          description="Accuracy of AI-generated responses to customer queries"
        />
        <InsightCard
          title="Handoff Rate"
          value="22%"
          trend={-3.4}
          icon={Users}
          description="Percentage of conversations transferred to human agents"
        />
      </div>

      {/* AI Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Common AI Triggers
          </h3>
          <div className="space-y-4">
            {[
              { topic: 'Account Balance Inquiries', count: 450, percentage: 28 },
              { topic: 'Password Reset Requests', count: 380, percentage: 24 },
              { topic: 'Service Status Checks', count: 320, percentage: 20 },
              { topic: 'Billing Questions', count: 280, percentage: 18 },
              { topic: 'Product Information', count: 160, percentage: 10 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm text-gray-900 dark:text-white">{item.topic}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.count} queries</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            AI Learning Insights
          </h3>
          <div className="space-y-4">
            {[
              {
                title: 'New Patterns Identified',
                description: 'AI detected 15 new conversation patterns this week',
                icon: Sparkles,
                trend: '+15%'
              },
              {
                title: 'Response Optimization',
                description: 'Average response time improved by 1.2 seconds',
                icon: TrendingUp,
                trend: '-1.2s'
              },
              {
                title: 'Edge Cases Detected',
                description: '8 new edge cases added to training dataset',
                icon: AlertTriangle,
                trend: '+8'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <item.icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.trend}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Real-time AI Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Active AI Sessions',
              value: '124',
              change: '+12 from last hour',
              trend: 'positive'
            },
            {
              label: 'Avg. Response Time',
              value: '1.8s',
              change: '-0.3s from baseline',
              trend: 'positive'
            },
            {
              label: 'Success Rate',
              value: '94.5%',
              change: '+2.1% from average',
              trend: 'positive'
            }
          ].map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.label}</h4>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                <p className={`ml-2 text-sm ${metric.trend === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights; 