export type SentimentPoint = {
  time: string;
  value: number;
  label?: string;
};

export type CallTag = {
  id: string;
  time: string;
  type: 'escalation' | 'frustration' | 'satisfaction' | 'confusion' | 'custom';
  label: string;
  note?: string;
};

export type TranscriptEntry = {
  id: string;
  time: string;
  speaker: 'agent' | 'customer';
  text: string;
  sentiment: number;
  isHighlighted?: boolean;
};

export type ComplianceItem = {
  id: string;
  label: string;
  required: boolean;
  status: 'pass' | 'fail' | 'na';
  timestamp?: string;
};

export type AgentScorecard = {
  aht: {
    value: number;
    target: number;
    unit: string;
  };
  adherence: {
    value: number;
    target: number;
  };
  sentiment: {
    value: number;
    trend: number;
  };
  qualityScore: {
    value: number;
    breakdown: {
      category: string;
      score: number;
    }[];
  };
};

export type CallSummary = {
  key_points: string[];
  action_items: string[];
  areas_of_concern?: string[];
  positive_highlights?: string[];
};

export interface CallRecording {
  id: string;
  agent: string;
  customer: string;
  duration: string;
  date: string;
  quality_score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  transcript: TranscriptEntry[];
  sentiment_timeline: SentimentPoint[];
  tags: CallTag[];
  compliance_checklist: ComplianceItem[];
  scorecard: AgentScorecard;
  summary: CallSummary;
  flagged: boolean;
} 