import { X, Check, Phone, Play, Pause, Volume2, FileText, History } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  callData: {
    customerId: string;
    phone: string;
    reason: string;
    summary: string;
    duration: string;
    agent: string;
    riskScore?: number;
  };
}

const getTranscript = (callData: CallDetailsModalProps['callData']) => {
  const issue = callData.reason.toLowerCase();
  const risk = callData.riskScore || 0;

  // Billing Dispute
  if (issue.includes('billing')) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Sarah Johnson', text: 'Hello, this is Sarah from billing support. How can I help you?' },
      { time: '0:07', speaker: 'customer', name: 'John Doe', text: 'I see a charge I do not recognize on my bill.' },
      { time: '0:15', speaker: 'agent', name: 'Sarah Johnson', text: 'Let me review your account. Can you confirm the amount?' },
      { time: '0:22', speaker: 'customer', name: 'John Doe', text: 'It is $45 from last week.' },
      { time: '0:28', speaker: 'agent', name: 'Sarah Johnson', text: 'Thank you. I see the charge. I will open a dispute and follow up within 24 hours.' },
      { time: '0:36', speaker: 'customer', name: 'John Doe', text: 'Thank you, I appreciate your help.' },
      { time: '0:40', speaker: 'agent', name: 'Sarah Johnson', text: 'You\'re welcome. I will keep you updated.' },
    ];
  }
  // Product Issues
  if (issue.includes('product')) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Jamie Smith', text: 'Hi, this is Jamie from product support. What seems to be the problem?' },
      { time: '0:06', speaker: 'customer', name: 'Chris Evans', text: 'My device keeps restarting randomly.' },
      { time: '0:13', speaker: 'agent', name: 'Jamie Smith', text: 'I\'m sorry to hear that. When did this start happening?' },
      { time: '0:19', speaker: 'customer', name: 'Chris Evans', text: 'It started yesterday after the update.' },
      { time: '0:25', speaker: 'agent', name: 'Jamie Smith', text: 'Thank you for letting me know. I will escalate this to our technical team.' },
      { time: '0:32', speaker: 'customer', name: 'Chris Evans', text: 'Please do, I need this fixed soon.' },
      { time: '0:36', speaker: 'agent', name: 'Jamie Smith', text: 'We\'ll get back to you as soon as possible.' },
    ];
  }
  // Service Quality
  if (issue.includes('service quality')) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Alex Johnson', text: 'Thank you for calling. I see you have a service quality concern.' },
      { time: '0:07', speaker: 'customer', name: 'Jane Lee', text: 'Yes, my calls keep dropping and the connection is poor.' },
      { time: '0:15', speaker: 'agent', name: 'Alex Johnson', text: 'I apologize for the trouble. I will run diagnostics on your line.' },
      { time: '0:22', speaker: 'customer', name: 'Jane Lee', text: 'Thank you, I hope this can be fixed.' },
      { time: '0:28', speaker: 'agent', name: 'Alex Johnson', text: 'We will prioritize your case and update you soon.' },
      { time: '0:34', speaker: 'customer', name: 'Jane Lee', text: 'Thanks for your help.' },
      { time: '0:38', speaker: 'agent', name: 'Alex Johnson', text: 'You\'re welcome.' },
    ];
  }
  // Support Response
  if (issue.includes('support response')) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Taylor Wilson', text: 'Support team here, this is Taylor. How can I assist?' },
      { time: '0:06', speaker: 'customer', name: 'Patricia Kim', text: 'I have not received a response to my last three emails.' },
      { time: '0:13', speaker: 'agent', name: 'Taylor Wilson', text: 'I apologize for the delay. Let me check your case.' },
      { time: '0:19', speaker: 'customer', name: 'Patricia Kim', text: 'I need an urgent update.' },
      { time: '0:25', speaker: 'agent', name: 'Taylor Wilson', text: 'I see your case and will escalate it to our lead.' },
      { time: '0:32', speaker: 'customer', name: 'Patricia Kim', text: 'Thank you, please keep me posted.' },
      { time: '0:36', speaker: 'agent', name: 'Taylor Wilson', text: 'Absolutely, you will hear from us today.' },
    ];
  }
  // Default fallback by risk
  if (risk >= 80) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Sarah Johnson', text: 'Hello, this is Sarah from support. I see you have a critical issue.' },
      { time: '0:07', speaker: 'customer', name: 'John Doe', text: 'Yes, I am very upset. My service has been down for two days and no one has helped.' },
      { time: '0:18', speaker: 'agent', name: 'Sarah Johnson', text: 'I apologize for the inconvenience. I will escalate this to our highest priority.' },
      { time: '0:28', speaker: 'customer', name: 'John Doe', text: 'I need this fixed today or I will consider leaving.' },
      { time: '0:36', speaker: 'agent', name: 'Sarah Johnson', text: 'I understand. I am opening a priority ticket and our team will call you within the hour.' },
      { time: '0:45', speaker: 'customer', name: 'John Doe', text: 'Thank you. Please follow up.' },
      { time: '0:50', speaker: 'agent', name: 'Sarah Johnson', text: 'Absolutely. I will personally monitor your case.' },
    ];
  }
  if (risk >= 60) {
    return [
      { time: '0:00', speaker: 'agent', name: 'Alex Johnson', text: 'Hi, this is Alex from customer care. How can I help?' },
      { time: '0:06', speaker: 'customer', name: 'Jane Lee', text: 'I have been waiting for a billing correction for a week.' },
      { time: '0:14', speaker: 'agent', name: 'Alex Johnson', text: 'I see your request. Let me check the status.' },
      { time: '0:22', speaker: 'customer', name: 'Jane Lee', text: 'I just want to make sure it is being handled.' },
      { time: '0:28', speaker: 'agent', name: 'Alex Johnson', text: 'It is in progress and should be resolved in 2 business days.' },
      { time: '0:36', speaker: 'customer', name: 'Jane Lee', text: 'Thank you for the update.' },
      { time: '0:40', speaker: 'agent', name: 'Alex Johnson', text: 'You\'re welcome. I will notify you when it\'s complete.' },
    ];
  }
  return [
    { time: '0:00', speaker: 'agent', name: 'Jamie Smith', text: 'Hello, thank you for calling. How can I help you today?' },
    { time: '0:06', speaker: 'customer', name: 'Chris Evans', text: 'Just checking on my account status.' },
    { time: '0:12', speaker: 'agent', name: 'Jamie Smith', text: 'Everything looks good. Is there anything else I can do?' },
    { time: '0:18', speaker: 'customer', name: 'Chris Evans', text: 'No, that\'s all. Thank you!' },
    { time: '0:22', speaker: 'agent', name: 'Jamie Smith', text: 'You\'re welcome. Have a great day!' },
  ];
};

const parseDuration = (duration: string) => {
  // e.g. '1m 15s' => 75
  const match = duration.match(/(?:(\d+)m)?\s*(\d+)s/);
  if (!match) return 75;
  const mins = match[1] ? parseInt(match[1], 10) : 0;
  const secs = match[2] ? parseInt(match[2], 10) : 0;
  return mins * 60 + secs;
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const CallDetailsModal = ({ isOpen, onClose, callData }: CallDetailsModalProps & { callData: { riskScore?: number } }) => {
  const transcript = getTranscript(callData);
  const duration = Math.min(parseDuration(callData.duration), 90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev < duration) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowTranscript(false);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setIsPlaying((p) => !p);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Call Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customer</h3>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white mr-2">
                  Customer ID {callData.customerId}
                </span>
                <div className="flex items-center bg-emerald-800/90 dark:bg-emerald-700/50 text-emerald-100 px-3 py-1.5 rounded-full space-x-1.5">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span className="text-sm font-medium whitespace-nowrap">CRM Verified</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phone</h3>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white mr-2">
                  {callData.phone}
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-800/90 dark:bg-emerald-700/50 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-emerald-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Reason & Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reason for Review</h3>
            <p className="text-lg font-medium text-yellow-500 dark:text-yellow-400">
              {callData.reason}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Summary</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {callData.summary}
            </p>
          </div>

          {/* Call Recording */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Call Recording</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <button
                  className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(currentTime)}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
                    <div className="w-3/4 h-full bg-gray-500 dark:bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowTranscript((v) => !v)}
            >
              <FileText className="h-5 w-5 mr-2" />
              {showTranscript ? 'Hide Transcript' : 'View Transcript'}
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <History className="h-5 w-5 mr-2" />
              Customer Conversation History
            </button>
          </div>

          {/* Transcript Section */}
          {showTranscript && (
            <div className="mt-6 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">Transcript</h4>
              <ul className="space-y-3">
                {transcript.map((entry, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-12 flex-shrink-0">{entry.time}</span>
                    <span className={`text-xs px-2 py-1 rounded ${entry.speaker === 'agent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>{entry.name}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{entry.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CallDetailsModal; 