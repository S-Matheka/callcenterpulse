import { type SentimentPoint, type CallTag } from './types';

interface SentimentTimelineProps {
  sentimentData: SentimentPoint[];
  tags: CallTag[];
  currentTime: string;
  onTimeClick?: (time: string) => void;
}

const SentimentTimeline: React.FC<SentimentTimelineProps> = ({
  tags,
  currentTime,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment Timeline</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{currentTime}</span>
      </div>
      <div className="relative h-32">
        {/* Timeline visualization */}
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="absolute flex items-center"
            style={{
              left: `${(parseInt(tag.time) / 100) * 100}%`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentTimeline; 