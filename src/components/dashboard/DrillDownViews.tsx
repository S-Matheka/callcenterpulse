import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ReferenceLine, Legend } from 'recharts';
import { drillDownData } from '../../data/mockData';
import { Phone, PhoneOutgoing, Clock, Target, PhoneCall, CheckCircle, Heart, UserCircle, Timer, Play, AlertTriangle, MessageSquare } from 'lucide-react';

const COLORS = {
  primary: '#0ea5e9',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  gray: '#6b7280',
  dark: {
    primary: '#38bdf8',
    success: '#4ade80',
    warning: '#fbbf24',
    danger: '#f87171',
    purple: '#a78bfa',
    gray: '#9ca3af',
    text: '#f3f4f6',
    textSecondary: '#9ca3af',
    background: '#111827',
    backgroundSecondary: '#1f2937'
  },
  light: {
    text: '#111827',
    textSecondary: '#6b7280',
    background: '#ffffff',
    backgroundSecondary: '#f3f4f6'
  },
  gradients: {
    blue: ['#0ea5e9', '#0284c7'],
    green: ['#22c55e', '#16a34a'],
    orange: ['#f59e0b', '#d97706'],
    red: ['#ef4444', '#dc2626'],
    purple: ['#8b5cf6', '#7c3aed']
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
            {entry.name || 'Value'}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  className?: string;
}

const MetricCard = ({ title, value, icon: Icon, trend, className = '' }: MetricCardProps) => (
  <div className={`rounded-xl p-4 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white/90 dark:text-white/90">{title}</p>
        <p className="text-2xl font-bold text-white dark:text-white mt-1">{value.toLocaleString()}</p>
        {trend !== undefined && (
          <p className={`text-sm mt-1 ${trend >= 0 ? 'text-green-300 dark:text-green-200' : 'text-red-300 dark:text-red-200'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
      <Icon className="h-8 w-8 text-white/80 dark:text-white/80" />
    </div>
  </div>
);

interface AgentCardProps {
  name: string;
  calls: number;
  aht: string;
}

const AgentCard = ({ name, calls, aht }: AgentCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <UserCircle className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h4>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
          <PhoneCall className="h-3.5 w-3.5 mr-1 text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-medium">{calls}</span>
          <span className="text-sm ml-1 opacity-80">calls</span>
        </div>
        <div className="flex items-center px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300">
          <Timer className="h-3.5 w-3.5 mr-1 text-green-500 dark:text-green-400" />
          <span className="text-sm font-medium">AHT:</span>
          <span className="text-sm ml-1 opacity-80">{aht}</span>
        </div>
      </div>
    </div>
  </div>
);

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer = ({ title, children }: ChartContainerProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
      {title}
    </h3>
    <div className="text-gray-600 dark:text-gray-300">
      {children}
    </div>
  </div>
);

export const TotalCallsDrillDown = () => {
  const { totalCalls } = drillDownData;

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Calls"
            value={totalCalls.callTypes.inbound + totalCalls.callTypes.outbound}
            icon={Phone}
            trend={5.2}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Inbound Calls"
            value={totalCalls.callTypes.inbound}
            icon={PhoneCall}
            trend={3.8}
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
          <MetricCard
            title="Outbound Calls"
            value={totalCalls.callTypes.outbound}
            icon={PhoneOutgoing}
            trend={-2.1}
            className="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <MetricCard
            title="Service Level"
            value={`${totalCalls.performance.serviceLevelActual}%`}
            icon={Target}
            trend={1.5}
            className="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Call Distribution by Channel">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totalCalls.byChannel}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {totalCalls.byChannel.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Department Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totalCalls.byDepartment}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {totalCalls.byDepartment.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Weekly Call Volume Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={totalCalls.trends.weekly}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="week" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Daily Call Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalCalls.byTimeOfDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                  >
                    {totalCalls.byTimeOfDay.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={COLORS.primary}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>

        <ChartContainer title="Performance Metrics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Average Handle Time
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {totalCalls.performance.avgHandleTime}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Average Hold Time
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {totalCalls.performance.avgHoldTime}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service Level
                </span>
              </div>
              <div className="flex items-end space-x-2 mt-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalCalls.performance.serviceLevelActual}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  / {totalCalls.performance.serviceLevelTarget}% target
                </p>
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export const TotalAnsweredDrillDown = () => {
  const { totalAnswered } = drillDownData;
  const topAgents = [
    { name: 'Alex Johnson', calls: 85, aht: '245s', avatarSeed: 'Alex' },
    { name: 'Jamie Smith', calls: 72, aht: '310s', avatarSeed: 'Jamie' },
    { name: 'Taylor Wilson', calls: 68, aht: '280s', avatarSeed: 'Taylor' },
    { name: 'Morgan Lee', calls: 65, aht: '325s', avatarSeed: 'Morgan' },
  ];

  // Prepare data for the team performance chart
  const teamPerformanceData = totalAnswered.byQueue.map(queue => ({
    name: queue.name,
    'Answered Calls': queue.value,
    'Avg Handle Time (s)': queue.avgTimeToAnswer,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Answered"
            value={totalAnswered.byChannel.reduce((sum, item) => sum + item.value, 0)}
            icon={PhoneCall}
            trend={3.8}
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
          <MetricCard
            title="First Call Resolution"
            value={`${((totalAnswered.firstCallResolution.resolved / (totalAnswered.firstCallResolution.resolved + totalAnswered.firstCallResolution.escalated)) * 100).toFixed(1)}%`}
            icon={CheckCircle}
            trend={2.5}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Avg Handle Time"
            value="4m 35s"
            icon={Clock}
            trend={-1.2}
            className="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <MetricCard
            title="Customer Satisfaction"
            value="92%"
            icon={Heart}
            trend={1.5}
            className="bg-gradient-to-br from-pink-500 to-pink-600"
          />
        </div>

        <ChartContainer title="Top Performing Agents">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAgents.map((agent) => (
              <AgentCard key={agent.name} {...agent} />
            ))}
          </div>
        </ChartContainer>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <ChartContainer title="Team Performance">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="left"
                    orientation="left"
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="Answered Calls" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="Avg Handle Time (s)" fill={COLORS.success} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Channel Distribution */}
          <ChartContainer title="Channel Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totalAnswered.byChannel}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {totalAnswered.byChannel.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* FCR Breakdown */}
          <ChartContainer title="First Call Resolution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { 
                        name: 'Resolved', 
                        value: totalAnswered.firstCallResolution.resolved,
                        percentage: ((totalAnswered.firstCallResolution.resolved / (totalAnswered.firstCallResolution.resolved + totalAnswered.firstCallResolution.escalated)) * 100).toFixed(1)
                      },
                      { 
                        name: 'Escalated', 
                        value: totalAnswered.firstCallResolution.escalated,
                        percentage: ((totalAnswered.firstCallResolution.escalated / (totalAnswered.firstCallResolution.resolved + totalAnswered.firstCallResolution.escalated)) * 100).toFixed(1)
                      }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    <Cell fill={COLORS.success} />
                    <Cell fill={COLORS.warning} />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Daily Trend */}
          <ChartContainer title="Daily Answer Rate Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { day: 'Mon', value: 92 },
                  { day: 'Tue', value: 88 },
                  { day: 'Wed', value: 95 },
                  { day: 'Thu', value: 91 },
                  { day: 'Fri', value: 87 }
                ]}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="day" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[80, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.success}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export const AbandonedCallsDrillDown = () => {
  const { abandoned } = drillDownData;
  
  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Abandoned"
            value={abandoned.byQueue.reduce((sum, item) => sum + item.value, 0)}
            icon={PhoneCall}
            trend={2.1}
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
          <MetricCard
            title="Avg Wait Time"
            value="3m 45s"
            icon={Clock}
            trend={-1.5}
            className="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <MetricCard
            title="Peak Hour"
            value="4:00 PM"
            icon={Target}
            trend={0}
            className="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <MetricCard
            title="Abandonment Rate"
            value="12%"
            icon={PhoneCall}
            trend={-0.8}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Abandonment by Wait Time">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={abandoned.byWaitTime}
                    dataKey="value"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ range, percentage }) => `${range} (${percentage}%)`}
                  >
                    {abandoned.byWaitTime.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Abandonment by Queue">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={abandoned.byQueue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill={COLORS.danger}
                    radius={[4, 4, 0, 0]}
                  >
                    {abandoned.byQueue.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={COLORS.danger}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Hourly Abandonment Trend */}
          <ChartContainer title="Hourly Abandonment Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { hour: '8 AM', value: 5 },
                  { hour: '9 AM', value: 8 },
                  { hour: '10 AM', value: 12 },
                  { hour: '11 AM', value: 15 },
                  { hour: '12 PM', value: 10 },
                  { hour: '1 PM', value: 8 },
                  { hour: '2 PM', value: 11 },
                  { hour: '3 PM', value: 14 },
                  { hour: '4 PM', value: 18 },
                  { hour: '5 PM', value: 13 }
                ]}>
                  <defs>
                    <linearGradient id="colorAbandoned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.danger}
                    fillOpacity={1}
                    fill="url(#colorAbandoned)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Queue Performance Metrics */}
          <ChartContainer title="Queue Performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <PhoneCall className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Highest Abandonment
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  Technical Support
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  28% of total abandoned
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Peak Time
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  4:00 - 5:00 PM
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  25 abandonments
                </p>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export const WaitTimeDrillDown = () => {
  const { waitTime } = drillDownData;

  // Mock data for wait time trend
  const waitTimeTrendData = [
    { hour: '8 AM', waitTime: 45 },
    { hour: '9 AM', waitTime: 65 },
    { hour: '10 AM', waitTime: 95 },
    { hour: '11 AM', waitTime: 85 },
    { hour: '12 PM', waitTime: 70 },
    { hour: '1 PM', waitTime: 55 },
    { hour: '2 PM', waitTime: 75 },
    { hour: '3 PM', waitTime: 90 },
    { hour: '4 PM', waitTime: 110 },
    { hour: '5 PM', waitTime: 120 }
  ];

  const waitTimeSpikes = [
    {
      time: '10:15 AM',
      reason: 'Unexpected call volume spike due to system outage',
      duration: '95 seconds'
    },
    {
      time: '4:30 PM',
      reason: 'Multiple agents on break simultaneously',
      duration: '110 seconds'
    },
    {
      time: '5:10 PM',
      reason: 'End-of-day call surge with reduced staff',
      duration: '120 seconds'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Average Wait Time"
            value="85s"
            icon={Clock}
            trend={2.5}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Peak Wait Time"
            value="120s"
            icon={Target}
            trend={5.8}
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
          <MetricCard
            title="SLA Breaches"
            value="12"
            icon={PhoneCall}
            trend={-1.2}
            className="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <MetricCard
            title="Current Wait Time"
            value="45s"
            icon={Timer}
            trend={-0.8}
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        <ChartContainer title="Wait Time Trend (Today)">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waitTimeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis
                  dataKey="hour"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 'dataMax + 20']}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={60} 
                  stroke={COLORS.danger} 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Threshold', 
                    position: 'right',
                    fill: COLORS.danger,
                    fontSize: 12
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="waitTime"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  dot={{ r: 4, fill: COLORS.primary }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Wait Time Spikes">
          <div className="space-y-4">
            {waitTimeSpikes.map((spike, index) => (
              <div 
                key={index}
                className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-700/30 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {spike.time}
                    </span>
                  </div>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">
                    {spike.duration}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {spike.reason}
                </p>
              </div>
            ))}
          </div>
        </ChartContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wait Time Distribution */}
          <ChartContainer title="Wait Time Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={waitTime.distribution}
                    dataKey="percentage"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ range, percentage }) => `${range} (${percentage}%)`}
                  >
                    {waitTime.distribution.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Wait Time by Queue */}
          <ChartContainer title="Wait Time by Queue">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waitTime.byQueue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill={COLORS.primary}
                    radius={[4, 4, 0, 0]}
                  >
                    {waitTime.byQueue.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={COLORS.primary}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

// AI & vCons Insights Drill-downs
export const SentimentDrillDown = () => {
  const sentimentData = [
    { department: 'Sales', positive: 82, neutral: 12, negative: 6 },
    { department: 'Support', positive: 75, neutral: 15, negative: 10 },
    { department: 'Billing', positive: 68, neutral: 22, negative: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Sentiment by Department</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#22c55e" />
              <Bar dataKey="neutral" fill="#94a3b8" />
              <Bar dataKey="negative" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Weekly Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { week: 'W1', sentiment: 75 },
              { week: 'W2', sentiment: 78 },
              { week: 'W3', sentiment: 82 },
              { week: 'W4', sentiment: 78 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sentiment" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Top Phrases</h3>
          <div className="flex flex-wrap gap-2">
            {['excellent service', 'helpful staff', 'quick resolution', 'frustrating', 'long wait'].map((phrase, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {phrase}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Example Conversations</h3>
          <div className="space-y-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Call #{i + 1}</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  Positive
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RiskAlertsDrillDown = () => {
  const alerts = [
    { id: 1, type: 'Compliance', level: 'High', time: '5m ago', details: 'Script Deviation' },
    { id: 2, type: 'Sentiment', level: 'Medium', time: '15m ago', details: 'Negative Escalation' },
    { id: 3, type: 'Compliance', level: 'High', time: '1h ago', details: 'Missing Disclosure' },
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-5 w-5 ${
                alert.level === 'High' ? 'text-red-500' : 'text-yellow-500'
              }`} />
              <span className="font-medium">{alert.type} Alert</span>
            </div>
            <span className="text-sm text-gray-500">{alert.time}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{alert.details}</p>
          <div className="flex gap-2">
            <button className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              View Transcript
            </button>
            <button className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              Play Recording
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ForecastDrillDown = () => {
  const forecastData = [
    { hour: '9AM', predicted: 120, actual: 115 },
    { hour: '10AM', predicted: 150, actual: 145 },
    { hour: '11AM', predicted: 180, actual: 170 },
    { hour: '12PM', predicted: 140, actual: 150 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Call Volume Forecast vs Actual</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predicted" stroke="#3b82f6" name="Predicted" />
            <Line type="monotone" dataKey="actual" stroke="#22c55e" name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">SLA Risk</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '25%' }} />
            </div>
            <span className="text-sm text-yellow-500">25% Risk</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Abandonment Risk</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '15%' }} />
            </div>
            <span className="text-sm text-red-500">15% Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Agent Performance Drill-downs
export const AgentPerformanceDrillDown = () => {
  const metrics = [
    { name: 'Avg Handle Time', value: '5m 30s' },
    { name: 'Sentiment Score', value: '4.5/5' },
    { name: 'Escalation Rate', value: '3%' },
    { name: 'Script Adherence', value: '95%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</h3>
            <p className="text-lg font-semibold mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Team Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            { team: 'Team A', performance: 85 },
            { team: 'Team B', performance: 92 },
            { team: 'Team C', performance: 78 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="performance" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Omnichannel Trends Drill-downs
export const ChannelPerformanceDrillDown = () => {
  const channelData = [
    { name: 'Voice', value: 45 },
    { name: 'Chat', value: 30 },
    { name: 'Email', value: 15 },
    { name: 'Social', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={channelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {channelData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Response Time by Channel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Channel Effectiveness</h3>
        <div className="space-y-4">
          {channelData.map((channel) => (
            <div key={channel.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{channel.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">CSAT: 4.5/5</span>
                <span className="text-sm">FCR: 85%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Business Outcomes Drill-downs
export const BusinessOutcomesDrillDown = () => {
  const revenueData = [
    { department: 'Support', value: 45000 },
    { department: 'Sales', value: 128000 },
    { department: 'Billing', value: 67000 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Revenue by Department</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Conversion Funnel</h3>
        <div className="space-y-3">
          {[
            { stage: 'Calls', value: 1248, percent: '100%' },
            { stage: 'Qualified', value: 892, percent: '71%' },
            { stage: 'Opportunity', value: 524, percent: '42%' },
            { stage: 'Converted', value: 248, percent: '20%' },
          ].map((stage) => (
            <div key={stage.stage} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{stage.stage}</span>
                <span>{stage.value}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: stage.percent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Churn Risk Alerts</h3>
        <div className="space-y-3">
          {[
            { client: 'Company A', risk: 'High', revenue: '$50K' },
            { client: 'Company B', risk: 'Medium', revenue: '$35K' },
          ].map((alert) => (
            <div key={alert.client} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded">
              <div>
                <p className="font-medium">{alert.client}</p>
                <p className="text-sm text-gray-500">Revenue at risk: {alert.revenue}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                alert.risk === 'High' 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
              }`}>
                {alert.risk} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 