import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  quickSelections?: {
    label: string;
    onClick: () => void;
  }[];
}

const Calendar = ({ selectedDate, onDateSelect, quickSelections }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startingDayIndex = monthStart.getDay();
  const previousMonthDays = Array(startingDayIndex).fill(null);
  
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-[280px]">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(day => (
            <div
              key={day}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {previousMonthDays.map((_, index) => (
            <div key={`prev-${index}`} className="h-8" />
          ))}
          {monthDays.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect?.(day)}
              className={`
                h-8 w-8 rounded-full text-sm flex items-center justify-center
                ${isToday(day) ? 'border border-blue-500 dark:border-blue-400' : ''}
                ${selectedDate && isSameDay(day, selectedDate)
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
              `}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quick selections */}
      {quickSelections && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          {quickSelections.map((selection, index) => (
            <button
              key={index}
              onClick={selection.onClick}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              {selection.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar; 