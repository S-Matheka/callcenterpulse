import { X, Play, Volume2 } from 'lucide-react';

interface CallPlaybackModalProps {
  isOpen: boolean;
  onClose: () => void;
  callId: string;
}

const CallPlaybackModal = ({ isOpen, onClose, callId }: CallPlaybackModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl relative">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Call Playback
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Call Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Call ID</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{callId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="80"
                    className="w-24"
                  />
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="h-32 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center">
                <div className="w-full h-16 flex items-center justify-center gap-1">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-wave"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.02}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Play className="h-6 w-6" />
                </button>
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-1/3 bg-blue-500 dark:bg-blue-400 rounded-full" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">2:45 / 8:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallPlaybackModal; 