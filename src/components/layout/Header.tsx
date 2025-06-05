import { useState } from 'react';
import { 
  Bell, 
  Sun,
  Moon,
  ChevronDown,
  Menu,
  Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import Calendar from '../shared/Calendar';
import PulseDrawer from '../shared/PulseDrawer';
import NotificationDrawer from '../shared/NotificationDrawer';
import { format, subDays } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [dateRange, setDateRange] = useState('Yesterday');
  const [selectedQueue, setSelectedQueue] = useState('All Queues');
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [hasNotifications] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(subDays(new Date(), 1));
  const [isPulseOpen, setIsPulseOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const queues = ['All Queues', 'Sales', 'Support', 'Billing', 'Technical'];
  const channels = ['All Channels', 'Voice', 'Email', 'Chat', 'SMS'];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDateRange(format(date, 'MMM d, yyyy'));
    setIsDatePickerOpen(false);
  };

  const quickSelections = [
    {
      label: 'Today',
      onClick: () => {
        const today = new Date();
        setSelectedDate(today);
        setDateRange('Today');
        setIsDatePickerOpen(false);
      }
    },
    {
      label: 'Yesterday',
      onClick: () => {
        const yesterday = subDays(new Date(), 1);
        setSelectedDate(yesterday);
        setDateRange('Yesterday');
        setIsDatePickerOpen(false);
      }
    },
    {
      label: 'Last 7 Days',
      onClick: () => {
        setSelectedDate(new Date());
        setDateRange('Last 7 Days');
        setIsDatePickerOpen(false);
      }
    },
    {
      label: 'Last 30 Days',
      onClick: () => {
        setSelectedDate(new Date());
        setDateRange('Last 30 Days');
        setIsDatePickerOpen(false);
      }
    },
    {
      label: 'Last 90 Days',
      onClick: () => {
        setSelectedDate(new Date());
        setDateRange('Last 90 Days');
        setIsDatePickerOpen(false);
      }
    }
  ];

  const Dropdown = ({ 
    value, 
    options, 
    onChange 
  }: { 
    value: string; 
    options: string[]; 
    onChange: (value: string) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
          <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <li
                  key={option}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                    ${option === value ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{dateRange}</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isDatePickerOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isDatePickerOpen && (
              <div className="absolute z-50 mt-1">
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  quickSelections={quickSelections}
                />
              </div>
            )}
          </div>

          <Dropdown 
            value={selectedQueue} 
            options={queues} 
            onChange={setSelectedQueue} 
          />
          <Dropdown 
            value={selectedChannel} 
            options={channels} 
            onChange={setSelectedChannel} 
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <button 
            onClick={() => setIsNotificationOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
          >
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setIsPulseOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Ask Pulse</span>
          </button>
        </div>
      </div>

      <PulseDrawer 
        isOpen={isPulseOpen}
        onClose={() => setIsPulseOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
};

export default Header; 