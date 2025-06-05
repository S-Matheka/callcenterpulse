// Daily data based on research metrics (monthly values divided by ~22 working days)
export const dailyData = {
  totalCalls: 1248, // ~4,400/22 working days per month, rounded up for a busy day
  answerRate: 75, // 75% (middle of 70-80% range)
  totalAnswered: 936, // 75% of 1248
  abandonmentRate: 6.5, // 6.5% (middle of 5-8% range)
  totalAbandoned: 81, // 6.5% of 1248
  avgWaitTime: 37, // 37 seconds (middle of 28-46 seconds range)
};

// Detailed data for drill-downs (daily values)
export const drillDownData = {
  totalCalls: {
    callTypes: {
      inbound: 873,
      outbound: 375,
    },
    byChannel: [
      { name: 'Voice', value: 685, percentage: 55 },
      { name: 'Chat', value: 320, percentage: 26 },
      { name: 'SMS', value: 148, percentage: 12 },
      { name: 'Email', value: 95, percentage: 8 },
    ],
    byTimeOfDay: [
      { hour: '9AM', value: 156 },
      { hour: '10AM', value: 188 },
      { hour: '11AM', value: 204 },
      { hour: '12PM', value: 172 },
      { hour: '1PM', value: 140 },
      { hour: '2PM', value: 172 },
      { hour: '3PM', value: 188 },
      { hour: '4PM', value: 156 },
      { hour: '5PM', value: 110 },
    ],
    trends: {
      daily: [
        { day: 'Mon', value: 1180 },
        { day: 'Tue', value: 1248 },
        { day: 'Wed', value: 1310 },
        { day: 'Thu', value: 1275 },
        { day: 'Fri', value: 1150 },
      ],
      weekly: [
        { week: 'Week 1', value: 6163 },
        { week: 'Week 2', value: 6350 },
        { week: 'Week 3', value: 6125 },
        { week: 'Week 4', value: 6280 },
      ]
    }
  },
  totalAnswered: {
    total: 936,
    percentage: 75,
    avgDuration: '5m 45s',
    byChannel: [
      { name: 'Voice', value: 562, percentage: 60 },
      { name: 'Chat', value: 187, percentage: 20 },
      { name: 'Email', value: 112, percentage: 12 },
      { name: 'SMS', value: 75, percentage: 8 },
    ],
    byTimeOfDay: [
      { hour: '9AM', value: 120 },
      { hour: '10AM', value: 145 },
      { hour: '11AM', value: 160 },
      { hour: '12PM', value: 130 },
      { hour: '1PM', value: 105 },
      { hour: '2PM', value: 130 },
      { hour: '3PM', value: 145 },
      { hour: '4PM', value: 120 },
      { hour: '5PM', value: 85 },
    ],
    trends: {
      daily: [
        { day: 'Mon', value: 885 },
        { day: 'Tue', value: 936 },
        { day: 'Wed', value: 982 },
        { day: 'Thu', value: 956 },
        { day: 'Fri', value: 862 },
      ]
    }
  },
  abandoned: {
    total: 81,
    percentage: 6.5,
    avgWaitTime: '45s',
    byWaitTime: [
      { range: '0-30s', value: 24, percentage: 30 },
      { range: '30s-1m', value: 32, percentage: 40 },
      { range: '1m-2m', value: 16, percentage: 20 },
      { range: '2m+', value: 9, percentage: 10 },
    ],
    byStage: [
      { stage: 'IVR', value: 15, percentage: 18.5 },
      { stage: 'Call Queue', value: 28, percentage: 34.6 },
      { stage: 'Wait Queue', value: 22, percentage: 27.2 },
      { stage: 'Ringing', value: 10, percentage: 12.3 },
      { stage: 'Voicemail', value: 6, percentage: 7.4 },
    ],
    byTimeOfDay: [
      { hour: '9AM', value: 8 },
      { hour: '10AM', value: 10 },
      { hour: '11AM', value: 12 },
      { hour: '12PM', value: 9 },
      { hour: '1PM', value: 7 },
      { hour: '2PM', value: 9 },
      { hour: '3PM', value: 10 },
      { hour: '4PM', value: 8 },
      { hour: '5PM', value: 6 },
    ],
    trends: {
      daily: [
        { day: 'Mon', value: 75 },
        { day: 'Tue', value: 81 },
        { day: 'Wed', value: 85 },
        { day: 'Thu', value: 83 },
        { day: 'Fri', value: 75 },
      ]
    }
  },
  waitTime: {
    avg: 37,
    distribution: [
      { range: '0-30s', percentage: 45 },
      { range: '30s-1m', percentage: 35 },
      { range: '1m-2m', percentage: 15 },
      { range: '2m+', percentage: 5 },
    ],
    byTimeOfDay: [
      { hour: '9AM', value: 32 },
      { hour: '10AM', value: 35 },
      { hour: '11AM', value: 41 },
      { hour: '12PM', value: 39 },
      { hour: '1PM', value: 36 },
      { hour: '2PM', value: 38 },
      { hour: '3PM', value: 37 },
      { hour: '4PM', value: 35 },
      { hour: '5PM', value: 33 },
    ],
    trends: {
      daily: [
        { day: 'Mon', value: 35 },
        { day: 'Tue', value: 37 },
        { day: 'Wed', value: 39 },
        { day: 'Thu', value: 38 },
        { day: 'Fri', value: 36 },
      ]
    }
  }
};

export const churnRiskData = [
  {
    company: 'Acme Corp',
    issueType: 'Service Quality',
    riskScore: 85,
    revenueAtRisk: 250000,
    lastCall: '2024-03-15',
    callId: 'CALL-1234'
  },
  {
    company: 'TechStart Inc',
    issueType: 'Billing Dispute',
    riskScore: 75,
    revenueAtRisk: 180000,
    lastCall: '2024-03-14',
    callId: 'CALL-1235'
  },
  {
    company: 'Global Solutions',
    issueType: 'Product Issues',
    riskScore: 65,
    revenueAtRisk: 320000,
    lastCall: '2024-03-13',
    callId: 'CALL-1236'
  },
  {
    company: 'Innovate Co',
    issueType: 'Support Response',
    riskScore: 90,
    revenueAtRisk: 150000,
    lastCall: '2024-03-12',
    callId: 'CALL-1237'
  }
];

export const customerMoodData = {
  overall: {
    positive: 65,
    neutral: 20,
    frustrated: 15
  },
  byChannel: [
    { channel: 'Voice', positive: 60, neutral: 25, frustrated: 15 },
    { channel: 'Chat', positive: 70, neutral: 20, frustrated: 10 },
    { channel: 'Email', positive: 65, neutral: 22, frustrated: 13 }
  ],
  frustrationTriggers: [
    { trigger: 'Long Wait Times', percentage: 35 },
    { trigger: 'Multiple Transfers', percentage: 25 },
    { trigger: 'Unresolved Issues', percentage: 20 },
    { trigger: 'Technical Problems', percentage: 15 },
    { trigger: 'Communication Issues', percentage: 5 }
  ],
  trends: {
    daily: [
      { day: 'Mon', frustrated: 12 },
      { day: 'Tue', frustrated: 15 },
      { day: 'Wed', frustrated: 18 },
      { day: 'Thu', frustrated: 14 },
      { day: 'Fri', frustrated: 16 }
    ]
  }
};

export const omnichannelTrendsData = {
  interactions: [
    { date: 'Apr 24', voice: 685, chat: 320, sms: 148, email: 95 },
    { date: 'Apr 25', voice: 690, chat: 325, sms: 150, email: 92 },
    { date: 'Apr 26', voice: 680, chat: 315, sms: 145, email: 98 },
    { date: 'Apr 27', voice: 695, chat: 330, sms: 152, email: 90 },
    { date: 'Apr 28', voice: 700, chat: 335, sms: 155, email: 95 },
    { date: 'Apr 29', voice: 685, chat: 325, sms: 148, email: 93 },
    { date: 'Apr 30', voice: 695, chat: 330, sms: 150, email: 97 }
  ],
  effectiveness: [
    { 
      channel: 'Voice', 
      csat: 92, 
      resolution: '37s',
      sentiment: { positive: 65, neutral: 20, frustrated: 15 }
    },
    { 
      channel: 'Chat', 
      csat: 88, 
      resolution: '45s',
      sentiment: { positive: 60, neutral: 25, frustrated: 15 }
    },
    { 
      channel: 'SMS', 
      csat: 85, 
      resolution: '60s',
      sentiment: { positive: 55, neutral: 30, frustrated: 15 }
    },
    { 
      channel: 'Email', 
      csat: 82, 
      resolution: '180m',
      sentiment: { positive: 50, neutral: 35, frustrated: 15 }
    }
  ]
}; 