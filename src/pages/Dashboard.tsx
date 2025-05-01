import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Phone, PhoneCall, Clock, X, 
  Brain, Users, Globe, Briefcase, AlertTriangle, Award
} from 'lucide-react';
import Modal from '../components/shared/Modal';
import { 
  TotalCallsDrillDown, 
  TotalAnsweredDrillDown, 
  AbandonedCallsDrillDown, 
  WaitTimeDrillDown
} from '../components/dashboard/DrillDownViews';
import { dailyData } from '../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Line, 
  Legend, 
  BarChart,
  Bar,
  AreaChart, 
  Area 
} from 'recharts';

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

      <div className="columns-1 lg:columns-2 gap-6 space-y-6 [&>*]:break-inside-avoid-column">
        <div>
          <SectionCard title="AI & vCons Insights" icon={Brain}>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">Customer Sentiment</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 text-yellow-400">
                    <span className="text-4xl">😀</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">Very Positive</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Positive</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">65%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Neutral</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">25%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-full bg-gray-500 dark:bg-gray-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Negative</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">10%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">Top Sentiment Phrases</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'helpful', count: 85, sentiment: 'positive' },
                    { text: 'satisfied', count: 76, sentiment: 'positive' },
                    { text: 'quick', count: 75, sentiment: 'positive' },
                    { text: 'resolved', count: 70, sentiment: 'positive' },
                    { text: 'professional', count: 63, sentiment: 'positive' }
                  ].map((phrase) => (
                    <div key={phrase.text} className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        phrase.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                      }`}>
                        {phrase.text}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">{phrase.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100">Risk Alerts</h3>
                  <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 px-2 py-1 rounded-full">
                    2 High Priority
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-red-700 dark:text-red-400">Compliance Violation</span>
                      </div>
                      <span className="text-sm text-red-600 dark:text-red-400">10:05 AM</span>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Agent failed to verify customer identity before discussing account details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100">AI Forecast</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
                    <span>Current Time: 1:01 PM</span>
                    <span>•</span>
                    <span>Avg. Predicted: 72 calls</span>
                  </div>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '8 AM', actual: 45, predicted: 42 },
                      { time: '9 AM', actual: 52, predicted: 48 },
                      { time: '10 AM', actual: 58, predicted: 55 },
                      { time: '11 AM', actual: 65, predicted: 62 },
                      { time: '12 PM', actual: 72, predicted: 70 },
                      { time: '1 PM', predicted: 75 },
                      { time: '2 PM', predicted: 78 },
                      { time: '3 PM', predicted: 72 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="text-gray-200 dark:text-gray-700" />
                      <XAxis 
                        dataKey="time" 
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
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual" 
                        stroke="var(--chart-blue, #3b82f6)"
                        strokeWidth={2}
                        dot={{ fill: 'var(--chart-blue, #3b82f6)', stroke: 'var(--chart-blue, #3b82f6)', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="Predicted"
                        stroke="var(--chart-gray, #9ca3af)"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ fill: 'var(--chart-gray, #9ca3af)', stroke: 'var(--chart-gray, #9ca3af)', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Agent Performance" icon={Users}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-100">Top Performers</span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
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
        </div>

        <div>
          <SectionCard title="Business Outcomes" icon={Briefcase}>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100">Revenue Attribution</h3>
                  <span className="text-sm text-green-600 dark:text-green-400">+12.5% vs Last Month</span>
                </div>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$42,580</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Support', value: '$12,450' },
                    { label: 'Sales', value: '$24,830' },
                    { label: 'Billing', value: '$5,300' }
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">Conversion Funnel</h3>
                <div className="space-y-2">
                  {[
                    { stage: 'Calls Received', value: 1248, width: '100%' },
                    { stage: 'Issue Identified', value: 892, width: '80%' },
                    { stage: 'Solution Offered', value: 524, width: '60%' },
                    { stage: 'Upsell Opportunity', value: 248, width: '40%' },
                    { stage: 'Converted', value: 124, width: '20%' }
                  ].map((stage) => (
                    <div key={stage.stage} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{stage.stage}</span>
                        <span className="text-gray-700 dark:text-gray-200">{stage.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                          style={{ width: stage.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">Churn Risk Alerts</h3>
                <div className="space-y-2">
                  {[
                    {
                      company: 'Acme Corp',
                      risk: 'High',
                      revenue: '$12,500',
                      details: 'Multiple unresolved technical issues in past 30 days'
                    },
                    {
                      company: 'Global Industries',
                      risk: 'Medium',
                      revenue: '$8,750',
                      details: 'Contract renewal discussion showed price sensitivity'
                    }
                  ].map((alert) => (
                    <div key={alert.company} className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="text-sm font-medium text-red-700 dark:text-red-400">{alert.company}</h4>
                          <p className="text-xs text-red-600 dark:text-red-400">{alert.details}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-red-700 dark:text-red-400">{alert.revenue}</span>
                          <p className="text-xs text-red-600 dark:text-red-400">at risk</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Omnichannel Trends" icon={Globe}>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">Interactions by Channel</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { date: 'Apr 24', voice: 450, chat: 280, sms: 180, email: 90 },
                      { date: 'Apr 25', voice: 480, chat: 300, sms: 190, email: 85 },
                      { date: 'Apr 26', voice: 460, chat: 290, sms: 185, email: 95 },
                      { date: 'Apr 27', voice: 470, chat: 310, sms: 195, email: 88 },
                      { date: 'Apr 28', voice: 490, chat: 320, sms: 200, email: 92 },
                      { date: 'Apr 29', voice: 465, chat: 305, sms: 188, email: 87 },
                      { date: 'Apr 30', voice: 485, chat: 315, sms: 192, email: 94 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="text-gray-200 dark:text-gray-700" />
                      <XAxis 
                        dataKey="date" 
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
                      <Area type="monotone" dataKey="voice" name="Voice" stackId="1" stroke="var(--chart-blue, #3b82f6)" fill="var(--chart-blue, #3b82f6)" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="chat" name="Chat" stackId="1" stroke="var(--chart-green, #22c55e)" fill="var(--chart-green, #22c55e)" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="sms" name="SMS" stackId="1" stroke="var(--chart-yellow, #eab308)" fill="var(--chart-yellow, #eab308)" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="email" name="Email" stackId="1" stroke="var(--chart-red, #ef4444)" fill="var(--chart-red, #ef4444)" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">Channel Effectiveness</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { channel: 'Voice', csat: 92, resolution: '12m' },
                    { channel: 'Chat', csat: 88, resolution: '15m' },
                    { channel: 'SMS', csat: 85, resolution: '18m' },
                    { channel: 'Email', csat: 82, resolution: '24m' }
                  ].map((item) => (
                    <div key={item.channel} className="p-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-100">{item.channel}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">CSAT</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200 ml-1">{item.csat}%</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Resolution</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200 ml-1">{item.resolution}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
      `}</style>
    </div>
  );
};

export default Dashboard; 