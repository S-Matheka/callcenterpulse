import { Play, Pause, SkipBack, SkipForward, Volume2, Search, Calendar, Clock, ThumbsUp, Download, Filter, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { type CallRecording } from '../components/call-review/types';
import SentimentTimeline from '../components/call-review/SentimentTimeline';
import ComplianceChecklist from '../components/call-review/ComplianceChecklist';
import AgentScorecard from '../components/call-review/AgentScorecard';
import CallSummary from '../components/call-review/CallSummary';

interface CallRecordingProps {
  recording: {
    id: string;
    agent: string;
    customer: string;
    duration: string;
    date: string;
    quality_score: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    transcript: Array<{
      time: string;
      speaker: 'agent' | 'customer';
      text: string;
    }>;
  };
}

const CallRecording = ({ recording }: CallRecordingProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState('0:00');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Call Info Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Call with {recording.customer}
          </h3>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {recording.date}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {recording.duration}
            </span>
            <span className={`flex items-center ${
              recording.sentiment === 'positive' ? 'text-green-600 dark:text-green-400' :
              recording.sentiment === 'negative' ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              <ThumbsUp className={`mr-1 h-4 w-4 ${recording.sentiment === 'negative' ? 'rotate-180' : ''}`} />
              {recording.sentiment.charAt(0).toUpperCase() + recording.sentiment.slice(1)}
            </span>
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          <Download className="h-5 w-5" />
        </button>
      </div>

      {/* Audio Player */}
      <div className="mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <SkipBack className="h-4 w-4" />
              </button>
              <button 
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <SkipForward className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">{currentTime} / {recording.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <div className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-full">
                <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full">
            <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add new interfaces for filter options
interface FilterOptions {
  date: string;
  sentiment: string;
  duration: string;
  agent: string;
}

const CallReview = () => {
  const [currentTime] = useState('0:00');
  const [isFlagged, setIsFlagged] = useState(false);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    date: '',
    sentiment: '',
    duration: '',
    agent: '',
  });

  // Filter options
  const sentimentOptions = ['All', 'Positive', 'Neutral', 'Negative'];
  const durationOptions = ['All', '0-5 min', '5-15 min', '15+ min'];
  const agentOptions = ['All', 'Sarah Johnson', 'Mike Brown', 'Emily Davis'];

  const sampleRecording: CallRecording = {
    id: '1',
    agent: 'Sarah Johnson',
    customer: 'John Smith',
    duration: '15:30',
    date: 'Mar 15, 2024',
    quality_score: 92,
    sentiment: 'positive',
    transcript: [
      {
        id: '1',
        time: '0:00',
        speaker: 'agent',
        text: "Thank you for calling our support center. This is Sarah. How may I help you today?",
        sentiment: 0.6,
      },
      {
        id: '2',
        time: '0:05',
        speaker: 'customer',
        text: "Hi Sarah, I'm having trouble accessing my account. I keep getting an error message.",
        sentiment: -0.2,
      },
      {
        id: '3',
        time: '0:12',
        speaker: 'agent',
        text: "I'm sorry to hear that. I'll help you resolve this issue. Can you please provide your account number?",
        sentiment: 0.7,
      },
      {
        id: '4',
        time: '0:18',
        speaker: 'customer',
        text: "Yes, it's ACT-2024-0789.",
        sentiment: 0.1,
      },
      {
        id: '5',
        time: '0:25',
        speaker: 'agent',
        text: "Thank you. I can see there was a temporary lock on your account due to multiple login attempts. I'll help you reset that now.",
        sentiment: 0.8,
      },
    ],
    sentiment_timeline: [
      { time: '0:00', value: 0.6 },
      { time: '0:05', value: -0.2 },
      { time: '0:12', value: 0.7 },
      { time: '0:18', value: 0.1 },
      { time: '0:25', value: 0.8 },
    ],
    tags: [
      { id: '1', time: '0:05', type: 'frustration', label: 'Customer Frustration' },
      { id: '2', time: '0:12', type: 'satisfaction', label: 'Positive Response' },
      { id: '3', time: '0:25', type: 'satisfaction', label: 'Issue Resolution' },
    ],
    compliance_checklist: [
      { id: '1', label: 'Greeting', required: true, status: 'pass', timestamp: '0:00' },
      { id: '2', label: 'Identity Verification', required: true, status: 'pass', timestamp: '0:18' },
      { id: '3', label: 'Issue Documentation', required: true, status: 'pass', timestamp: '0:25' },
      { id: '4', label: 'Solution Provided', required: true, status: 'pass', timestamp: '0:25' },
      { id: '5', label: 'Closing', required: true, status: 'na' },
    ],
    scorecard: {
      aht: {
        value: 280,
        target: 300,
        unit: 's',
      },
      adherence: {
        value: 95,
        target: 90,
      },
      sentiment: {
        value: 0.85,
        trend: 5.2,
      },
      qualityScore: {
        value: 92,
        breakdown: [
          { category: 'Communication', score: 95 },
          { category: 'Problem Resolution', score: 90 },
          { category: 'Compliance', score: 100 },
          { category: 'Efficiency', score: 85 },
        ],
      },
    },
    summary: {
      key_points: [
        'Customer unable to access account due to multiple failed login attempts',
        'Account was temporarily locked for security',
        'Agent identified the issue quickly and offered immediate solution',
      ],
      action_items: [
        'Reset account access',
        'Document incident in customer history',
        'Follow up on security measures',
      ],
      areas_of_concern: [
        'Multiple failed login attempts might indicate security issue',
      ],
      positive_highlights: [
        'Quick issue identification',
        'Professional and empathetic response',
        'Efficient resolution process',
      ],
    },
    flagged: false,
  };

  const handleTimeClick = (_time: string) => {
    // This functionality is not implemented yet
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFlagClick = () => {
    setIsFlagged(!isFlagged);
    // Here you would typically make an API call to update the flag status
    console.log('Call flagged:', !isFlagged);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Call Review</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review call recordings, transcripts, and quality metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search calls..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter Button and Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${isFilterOpen 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                } border`}
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-50 animate-fadeIn">
                <div className="p-4 space-y-4">
                  {/* Date Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={filterOptions.date}
                      onChange={(e) => handleFilterChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Sentiment Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sentiment
                    </label>
                    <select
                      value={filterOptions.sentiment}
                      onChange={(e) => handleFilterChange('sentiment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {sentimentOptions.map(option => (
                        <option key={option} value={option.toLowerCase()}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <select
                      value={filterOptions.duration}
                      onChange={(e) => handleFilterChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {durationOptions.map(option => (
                        <option key={option} value={option.toLowerCase()}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Agent Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agent
                    </label>
                    <select
                      value={filterOptions.agent}
                      onChange={(e) => handleFilterChange('agent', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {agentOptions.map(option => (
                        <option key={option} value={option.toLowerCase()}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Apply and Reset Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => {
                        // Handle apply filters
                        setIsFilterOpen(false);
                        console.log('Applied filters:', filterOptions);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => {
                        setFilterOptions({
                          date: '',
                          sentiment: '',
                          duration: '',
                          agent: '',
                        });
                        setIsFilterOpen(false);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Flag for Review Button */}
          <button
            onClick={handleFlagClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors border
              ${isFlagged 
                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            <Flag className={`h-5 w-5 ${isFlagged ? 'fill-current' : ''}`} />
            <span>Flag for Review</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {/* Audio Player and Call Info */}
            <CallRecording recording={sampleRecording} />
            
            {/* Sentiment Timeline */}
            <div className="mb-6">
              <SentimentTimeline
                sentimentData={sampleRecording.sentiment_timeline}
                tags={sampleRecording.tags}
                currentTime={currentTime}
                onTimeClick={handleTimeClick}
              />
            </div>

            {/* Transcript Section */}
            <div className="mt-6">
              <button
                onClick={() => setIsTranscriptVisible(!isTranscriptVisible)}
                className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {isTranscriptVisible ? 'Hide Transcript' : 'View Transcript'}
                </span>
                {isTranscriptVisible ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {isTranscriptVisible && (
                <div className="mt-4 max-h-[400px] overflow-y-auto pr-2 animate-fadeIn">
                  <div className="space-y-4">
                    {sampleRecording.transcript.map((entry) => (
                      <div
                        key={entry.id}
                        className={`flex ${entry.speaker === 'agent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-4 ${
                            entry.speaker === 'agent'
                              ? 'bg-blue-50 dark:bg-blue-900/30'
                              : 'bg-gray-50 dark:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {entry.speaker === 'agent' ? sampleRecording.agent : sampleRecording.customer}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{entry.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{entry.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call Summary */}
          <CallSummary summary={sampleRecording.summary} />
        </div>

        <div className="space-y-6">
          {/* Agent Scorecard */}
          <AgentScorecard scorecard={sampleRecording.scorecard} />

          {/* Compliance Checklist */}
          <ComplianceChecklist items={sampleRecording.compliance_checklist} />
        </div>
      </div>
    </div>
  );
};

export default CallReview; 