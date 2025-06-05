import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { drillDownData, customerMoodData, omnichannelTrendsData } from '../../data/mockData';
import { Phone, PhoneOutgoing, Clock, Target, PhoneCall, CheckCircle, AlertTriangle, MessageSquare, Users } from 'lucide-react';

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

// Department breakdown mock data
// const DEPARTMENTS = [
//   'Support',
//   'Sales',
//   'Billing',
//   'Technical',
//   'Onboard',
// ];

const departmentMetrics = {
  totalCalls: [
    { department: 'Support', value: 320 },
    { department: 'Sales', value: 280 },
    { department: 'Billing', value: 210 },
    { department: 'Technical', value: 260 },
    { department: 'Onboard', value: 178 },
  ],
  totalAnswered: [
    { department: 'Support', value: 240 },
    { department: 'Sales', value: 210 },
    { department: 'Billing', value: 180 },
    { department: 'Technical', value: 200 },
    { department: 'Onboard', value: 106 },
  ],
  abandoned: [
    { department: 'Support', value: 18 },
    { department: 'Sales', value: 22 },
    { department: 'Billing', value: 14 },
    { department: 'Technical', value: 17 },
    { department: 'Onboard', value: 10 },
  ],
  waitTime: [
    { department: 'Support', value: 32 },
    { department: 'Sales', value: 41 },
    { department: 'Billing', value: 36 },
    { department: 'Technical', value: 39 },
    { department: 'Onboard', value: 37 },
  ],
};

export const TotalCallsDrillDown = () => {
  const { totalCalls } = drillDownData;

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
        {/* Department Breakdown */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Department Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 font-medium">Department</th>
                  <th className="px-3 py-2 font-medium">Total Calls</th>
                </tr>
              </thead>
              <tbody>
                {departmentMetrics.totalCalls.map((row) => (
                  <tr key={row.department}
                    className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <td className="px-3 py-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4 text-blue-400" />
                      {row.department}
                    </td>
                    <td className="px-3 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

          <ChartContainer title="Call Volume by Time of Day">
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
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Daily Call Volume Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalCalls.trends.daily}>
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
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, stroke: COLORS.primary, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Weekly Call Volume Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalCalls.trends.weekly}>
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, stroke: COLORS.primary, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export const TotalAnsweredDrillDown = () => {
  const { totalAnswered } = drillDownData;

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Answered"
            value={totalAnswered.total}
            icon={PhoneCall}
            trend={3.8}
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
          <MetricCard
            title="Answer Rate"
            value={`${totalAnswered.percentage}%`}
            icon={CheckCircle}
            trend={2.1}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Avg Duration"
            value={totalAnswered.avgDuration}
            icon={Clock}
            trend={-1.5}
            className="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>
        {/* Department Breakdown */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Department Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 font-medium">Department</th>
                  <th className="px-3 py-2 font-medium">Total Answered</th>
                </tr>
              </thead>
              <tbody>
                {departmentMetrics.totalAnswered.map((row) => (
                  <tr key={row.department}
                    className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <td className="px-3 py-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4 text-blue-400" />
                      {row.department}
                    </td>
                    <td className="px-3 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Answered Calls by Channel">
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

          <ChartContainer title="Answered Calls by Time of Day">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalAnswered.byTimeOfDay}>
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
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Daily Answered Calls Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalAnswered.trends.daily}>
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
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, stroke: COLORS.primary, r: 4 }}
                  />
                </LineChart>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Abandoned"
            value={abandoned.total}
            icon={Phone}
            trend={-2.4}
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
          <MetricCard
            title="Abandonment Rate"
            value={`${abandoned.percentage}%`}
            icon={Target}
            trend={-1.2}
            className="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <MetricCard
            title="Avg Wait Time"
            value={abandoned.avgWaitTime}
            icon={Clock}
            trend={0.8}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
        </div>
        {/* Department Breakdown */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Department Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 font-medium">Department</th>
                  <th className="px-3 py-2 font-medium">Total Abandoned</th>
                </tr>
              </thead>
              <tbody>
                {departmentMetrics.abandoned.map((row) => (
                  <tr key={row.department}
                    className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <td className="px-3 py-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4 text-blue-400" />
                      {row.department}
                    </td>
                    <td className="px-3 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Abandoned Calls by Wait Time">
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
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
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

          <ChartContainer title="Abandoned Calls by Stage">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={abandoned.byStage}
                    dataKey="value"
                    nameKey="stage"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {abandoned.byStage.map((_entry, index) => (
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

          <ChartContainer title="Abandoned Calls by Time of Day">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={abandoned.byTimeOfDay}>
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
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Daily Abandoned Calls Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={abandoned.trends.daily}>
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
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, stroke: COLORS.primary, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export const WaitTimeDrillDown = () => {
  const { waitTime } = drillDownData;

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Average Wait Time"
            value={`${waitTime.avg}s`}
            icon={Clock}
            trend={-8.6}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Under 30s"
            value={`${waitTime.distribution[0].percentage}%`}
            icon={CheckCircle}
            trend={5.2}
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
          <MetricCard
            title="Over 2m"
            value={`${waitTime.distribution[3].percentage}%`}
            icon={AlertTriangle}
            trend={-2.1}
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>
        {/* Department Breakdown */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Department Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 font-medium">Department</th>
                  <th className="px-3 py-2 font-medium">Avg Wait Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {departmentMetrics.waitTime.map((row) => (
                  <tr key={row.department}
                    className="border-b border-gray-100 dark:border-gray-800 transition bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <td className="px-3 py-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4 text-blue-400" />
                      {row.department}
                    </td>
                    <td className="px-3 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
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

          <ChartContainer title="Wait Time by Time of Day">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waitTime.byTimeOfDay}>
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
                    tickFormatter={(value) => `${value}s`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          <ChartContainer title="Daily Wait Time Trend">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitTime.trends.daily}>
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
                    tickFormatter={(value) => `${value}s`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, stroke: COLORS.primary, r: 4 }}
                  />
                </LineChart>
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
  // Consistent mock data
  const totalInteractions = 1248; // from dailyData in mockData
  const prevPositive = 62; // previous period positive %
  const prevFrustrated = 17; // previous period frustrated %
  const positiveDelta = customerMoodData.overall.positive - prevPositive;
  const frustratedDelta = customerMoodData.overall.frustrated - prevFrustrated;
  const mostFrustratedChannel = [
    { name: 'Call', value: 60, type: 'positive' },
    { name: 'Chat', value: 20, type: 'positive' },
    { name: 'Email', value: 10, type: 'positive' },
    { name: 'SMS', value: 10, type: 'frustrated' }
  ].reduce((max, curr) => curr.type === 'frustrated' && curr.value > max.value ? curr : max, { name: '', value: 0, type: '' });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartContainer title="Overall Customer Mood">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Positive', value: customerMoodData.overall.positive },
                    { name: 'Neutral', value: customerMoodData.overall.neutral },
                    { name: 'Frustrated', value: customerMoodData.overall.frustrated }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="var(--chart-green, #22c55e)" />
                  <Cell fill="var(--chart-yellow, #eab308)" />
                  <Cell fill="var(--chart-red, #ef4444)" />
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg, #fff)',
                    border: '1px solid var(--tooltip-border, #e5e7eb)',
                    borderRadius: '0.5rem',
                    color: 'var(--tooltip-color, #1f2937)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div>Based on <span className="font-semibold">{totalInteractions.toLocaleString()}</span> interactions yesterday</div>
            <div>
              <span className="text-green-600 dark:text-green-400 font-semibold">Positive</span> mood {positiveDelta >= 0 ? 'up' : 'down'} {Math.abs(positiveDelta)}% vs last period. <span className="text-red-600 dark:text-red-400 font-semibold">Frustrated</span> {frustratedDelta >= 0 ? 'up' : 'down'} {Math.abs(frustratedDelta)}%.
            </div>
            <div>
              {customerMoodData.overall.frustrated > 20 ? (
                <span className="text-red-600 dark:text-red-400 font-semibold">Frustration is above threshold. Review escalation protocols.</span>
              ) : (
                <span className="text-green-600 dark:text-green-400 font-semibold">Customer mood is stable. Keep monitoring sentiment drivers.</span>
              )}
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Customer Mood by Channel">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Call', value: 60 },
                    { name: 'Chat', value: 20 },
                    { name: 'Email', value: 10 },
                    { name: 'SMS', value: 10 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#22c55e" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg, #fff)',
                    border: '1px solid var(--tooltip-border, #e5e7eb)',
                    borderRadius: '0.5rem',
                    color: 'var(--tooltip-color, #1f2937)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div>Based on <span className="font-semibold">{totalInteractions.toLocaleString()}</span> interactions yesterday</div>
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Call</span> channel has the highest positive mood (60%).
              <span className="ml-2 text-red-600 dark:text-red-400 font-semibold">SMS</span> has the highest frustration (15%).
            </div>
            <div>
              {mostFrustratedChannel.value > 10 ? (
                <span className="text-red-600 dark:text-red-400 font-semibold">Review SMS scripts and escalation handling for improvement.</span>
              ) : (
                <span className="text-green-600 dark:text-green-400 font-semibold">No channel-specific mood risks detected.</span>
              )}
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Insights Grid: Top Issues, Frustration Drivers, Sample Phrases, Top Positive Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Issues by Channel */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Top Issues by Channel</h3>
          <div className="overflow-x-auto flex-1">
            <table className="min-w-[320px] w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Issue</th>
                  <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Chat</th>
                  <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Email</th>
                  <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">SMS</th>
                  <th className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">Call</th>
                </tr>
              </thead>
              <tbody>
                {topIssuesByChannel.map((row, idx) => (
                  <tr key={row.issue} className={`border-b border-gray-100 dark:border-gray-800 transition ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/60' : 'bg-white dark:bg-gray-900'} hover:bg-blue-50 dark:hover:bg-blue-900/30`}>
                    <td className="px-3 py-2 text-gray-900 dark:text-white font-medium">{row.issue}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{row.chat}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{row.email}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{row.sms}</td>
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{row.call}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sample Phrases */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Sample Phrases</h3>
          <ul className="space-y-3 flex-1">
            {frustrationDrivers.map((d) => (
              <li key={d.trigger} className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-3">
                <span className="block text-xs text-gray-500 dark:text-gray-300 mb-1">{d.trigger}</span>
                <span className="text-sm text-gray-900 dark:text-white">"{d.sample}"</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Positive Phrases */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Top Positive Phrases</h3>
          <ul className="space-y-3 flex-1">
            {topPositivePhrases.map((item) => (
              <li key={item.phrase} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.phrase}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-300 mt-1">Channels: {item.channels.join(', ')}</span>
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">{item.count} mentions</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Omnichannel Trends Drill-downs
export const ChannelPerformanceDrillDown = () => {
  // Build channel distribution from omnichannelTrendsData.interactions
  const channelTotals = [
    {
      name: 'Voice',
      value: omnichannelTrendsData.interactions.reduce((sum, d) => sum + (d.voice || 0), 0),
      percentage: 0 // can be calculated if needed
    },
    {
      name: 'Chat',
      value: omnichannelTrendsData.interactions.reduce((sum, d) => sum + (d.chat || 0), 0),
      percentage: 0
    },
    {
      name: 'SMS',
      value: omnichannelTrendsData.interactions.reduce((sum, d) => sum + (d.sms || 0), 0),
      percentage: 0
    },
    {
      name: 'Email',
      value: omnichannelTrendsData.interactions.reduce((sum, d) => sum + (d.email || 0), 0),
      percentage: 0
    }
  ];
  const total = channelTotals.reduce((sum, c) => sum + c.value, 0);
  channelTotals.forEach(c => c.percentage = Math.round((c.value / total) * 100));

  // Build response time data from effectiveness
  const responseTime = omnichannelTrendsData.effectiveness.map(e => ({
    channel: e.channel,
    value: parseInt(e.resolution),
    unit: e.resolution.replace(/\d+/g, '')
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={channelTotals}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percentage }: any) => `${name} (${percentage}%)`}
              >
                {channelTotals.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(COLORS.gradients)[index % Object.values(COLORS.gradients).length][0]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} calls`, 'Volume']}
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '0.5rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Response Time by Channel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={responseTime}>
              <CartesianGrid strokeDasharray="3 3" className="text-gray-200 dark:text-gray-700" />
              <XAxis 
                dataKey="channel" 
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
                formatter={(value: number, _name: string, props: any) => [`${value}${props.payload.unit}`, 'Response Time']}
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '0.5rem',
                  color: 'var(--tooltip-color, #1f2937)'
                }}
              />
              <Bar dataKey="value" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Channel Effectiveness</h3>
        <div className="space-y-4">
          {omnichannelTrendsData.effectiveness.map((channel) => (
            <div key={channel.channel} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{channel.channel}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">CSAT:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{channel.csat}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Resolution:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{channel.resolution}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Positive:</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{channel.sentiment.positive}%</span>
                </div>
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

// Mock data for top issues by channel
const topIssuesByChannel = [
  { issue: 'Long wait times', chat: 2, email: 0, sms: 0, call: 15 },
  { issue: 'Unclear instructions', chat: 8, email: 3, sms: 1, call: 4 },
  { issue: 'Transfer required', chat: 1, email: 0, sms: 0, call: 10 },
  { issue: 'Technical difficulties', chat: 0, email: 2, sms: 0, call: 8 },
  { issue: 'Inconsistent information', chat: 2, email: 2, sms: 0, call: 6 },
];

// Mock data for frustration drivers
const frustrationDrivers = [
  { trigger: 'Long wait times', count: 15, sample: 'I waited too long to get help.' },
  { trigger: 'Unclear instructions', count: 12, sample: 'I didn\'t understand what to do next.' },
  { trigger: 'Transfer required', count: 10, sample: 'I was transferred too many times.' },
  { trigger: 'Technical difficulties', count: 8, sample: 'The system kept crashing.' },
  { trigger: 'Inconsistent information', count: 6, sample: 'I got different answers from different agents.' },
];

// Mock data for top positive phrases
const topPositivePhrases = [
  { phrase: 'Very helpful and professional', count: 45, channels: ['Call', 'Chat'] },
  { phrase: 'Resolved my issue quickly', count: 38, channels: ['Call'] },
  { phrase: 'Excellent service', count: 32, channels: ['Email', 'Call'] },
  { phrase: 'Very knowledgeable', count: 28, channels: ['Call', 'Chat'] },
  { phrase: 'Great communication', count: 25, channels: ['Call', 'SMS'] },
]; 