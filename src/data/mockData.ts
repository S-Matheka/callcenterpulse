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
    byChannel: [
      { name: 'Voice', value: 685, percentage: 55 },
      { name: 'Chat', value: 320, percentage: 26 },
      { name: 'SMS', value: 148, percentage: 12 },
      { name: 'Email', value: 95, percentage: 8 },
    ],
    byDepartment: [
      { name: 'Support', value: 520, percentage: 42 },
      { name: 'Sales', value: 380, percentage: 30 },
      { name: 'Billing', value: 210, percentage: 17 },
      { name: 'Technical', value: 138, percentage: 11 },
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
    callTypes: {
      inbound: 873,
      outbound: 375,
    },
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
    },
    performance: {
      avgHandleTime: '5m 45s',
      avgHoldTime: '45s',
      serviceLevelTarget: 85,
      serviceLevelActual: 82,
    }
  },
  totalAnswered: {
    byQueue: [
      { name: 'Sales', value: 285, avgTimeToAnswer: 32 },
      { name: 'Support', value: 374, avgTimeToAnswer: 42 },
      { name: 'Billing', value: 187, avgTimeToAnswer: 35 },
      { name: 'Technical', value: 90, avgTimeToAnswer: 38 },
    ],
    byChannel: [
      { name: 'Voice', value: 562, percentage: 60 },
      { name: 'Chat', value: 187, percentage: 20 },
      { name: 'Email', value: 112, percentage: 12 },
      { name: 'SMS', value: 75, percentage: 8 },
    ],
    firstCallResolution: {
      resolved: 655, // 70% FCR rate
      escalated: 281,
    },
  },
  abandoned: {
    byWaitTime: [
      { range: '0-30s', value: 24, percentage: 30 },
      { range: '30s-1m', value: 32, percentage: 40 },
      { range: '1m-2m', value: 16, percentage: 20 },
      { range: '2m+', value: 9, percentage: 10 },
    ],
    byQueue: [
      { name: 'Sales', value: 24, rate: 6.5 },
      { name: 'Support', value: 32, rate: 6.5 },
      { name: 'Billing', value: 16, rate: 6.5 },
      { name: 'Technical', value: 9, rate: 6.5 },
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
  },
  waitTime: {
    byQueue: [
      { name: 'Sales', value: 34 },
      { name: 'Support', value: 42 },
      { name: 'Billing', value: 35 },
      { name: 'Technical', value: 37 },
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
    distribution: [
      { range: '0-30s', percentage: 45 },
      { range: '30s-1m', percentage: 35 },
      { range: '1m-2m', percentage: 15 },
      { range: '2m+', percentage: 5 },
    ],
  },
}; 