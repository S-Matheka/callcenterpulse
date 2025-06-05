import { useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Sparkles, Send, TrendingUp, Clock, PhoneCall, DollarSign } from 'lucide-react';
import { Fragment, useState } from 'react';
import { customerMoodData, dailyData, churnRiskData } from '../../data/mockData';

interface PulseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const preQueriedQuestions = [
  {
    icon: TrendingUp,
    text: "What's our current customer satisfaction trend compared to last period?",
    answer: `Yesterday's customer mood: Positive ${customerMoodData.overall.positive}%, Neutral ${customerMoodData.overall.neutral}%, Frustrated ${customerMoodData.overall.frustrated}%. Positive is up 3% vs last period. Frustration is down 2%.` 
  },
  {
    icon: Clock,
    text: "What's our average wait time and how does it compare to target?",
    answer: `Average wait time yesterday was ${dailyData.avgWaitTime}s. This is within the target range (target: 45s). Most departments are under 45s except Sales (41s) and Technical (39s).` 
  },
  {
    icon: PhoneCall,
    text: "How many calls were abandoned and which department is most affected?",
    answer: `81 calls were abandoned yesterday (${dailyData.abandonmentRate}%). Sales had the highest abandoned calls (22), followed by Support (18).` 
  },
  {
    icon: DollarSign,
    text: "How many high churn risk customers do we have?",
    answer: `${churnRiskData.filter(r => r.riskScore > 80).length} high churn risk customers detected yesterday. Main factors: service quality and support response. Priority retention action recommended.`
  }
];

const PulseDrawer = ({ isOpen, onClose }: PulseDrawerProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedQuestion && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedQuestion]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-[448px]">
                  <div className="fixed top-[4.5rem] right-4 w-[420px] flex h-[calc(100vh-6rem)] flex-col rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                          <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                            Pulse Assistant
                          </Dialog.Title>
                        </div>
                        <button
                          type="button"
                          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 px-6 py-6 overflow-y-auto">
                      <div className="flex items-start space-x-4 animate-fade-in">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 max-w-[85%]">
                            <p className="text-gray-900 dark:text-white text-base">
                              Hi! I'm Pulse, your communications insights assistant. How can I help you today?
                            </p>
                          </div>

                          <div className="mt-6 space-y-4">
                            {preQueriedQuestions.map((question, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedQuestion(question.text)}
                                className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                    <question.icon className="h-5 w-5" />
                                  </div>
                                  <span className="text-sm text-gray-900 dark:text-white">{question.text}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {selectedQuestion && (
                            <div ref={answerRef} className="mt-6 animate-fade-in">
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                    <Sparkles className="h-6 w-6 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 max-w-[85%]">
                                    <p className="text-gray-900 dark:text-white text-base">
                                      {preQueriedQuestions.find(q => q.text === selectedQuestion)?.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask anything about your call center metrics..."
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </div>
                        <button
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PulseDrawer; 