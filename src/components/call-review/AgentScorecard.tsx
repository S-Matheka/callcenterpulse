import { Clock, TrendingUp, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { type AgentScorecard as AgentScorecardType } from './types';

interface AgentScorecardProps {
  scorecard: AgentScorecardType;
}

const AgentScorecard: React.FC<AgentScorecardProps> = ({ scorecard }) => {
  const getProgressColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 1) return 'bg-green-500';
    if (ratio >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Agent Scorecard</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* AHT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Average Handle Time</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Target: {scorecard.aht.target}{scorecard.aht.unit}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(scorecard.aht.value, scorecard.aht.target)}`}
                style={{ width: `${(scorecard.aht.value / scorecard.aht.target) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {scorecard.aht.value}{scorecard.aht.unit}
            </span>
          </div>
        </div>

        {/* Adherence */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule Adherence</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Target: {scorecard.adherence.target}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(scorecard.adherence.value, scorecard.adherence.target)}`}
                style={{ width: `${(scorecard.adherence.value / scorecard.adherence.target) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {scorecard.adherence.value}%
            </span>
          </div>
        </div>

        {/* Sentiment Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Sentiment Score</span>
            </div>
            <span className={`text-sm font-medium ${
              scorecard.sentiment.trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {scorecard.sentiment.trend >= 0 ? '↑' : '↓'} {Math.abs(scorecard.sentiment.trend)}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${scorecard.sentiment.value * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {(scorecard.sentiment.value * 10).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Quality Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Quality Score</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${scorecard.qualityScore.value}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {scorecard.qualityScore.value}%
            </span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Score Breakdown</h4>
        <div className="space-y-2">
          {scorecard.qualityScore.breakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.category}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentScorecard; 