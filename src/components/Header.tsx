import { Search, Sun, Moon, Bell, LayoutGrid, Star, LayoutDashboard } from 'lucide-react';
import { useTheme } from './ThemeContext'; // adjust path if needed

interface HeaderProps {
  onNotificationClick: () => void;
}

export function Header({ onNotificationClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`h-14 border-b flex items-center justify-between px-6 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white text-black border-gray-200'
          : 'bg-[#0f0f0f] text-white border-[#1a1a1a]'
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className={`w-4 h-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'}`} />
          <Star className={`w-4 h-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'}`} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-500'}>Dashboards</span>
          <span className={theme === 'light' ? 'text-gray-400' : 'text-gray-600'}>/</span>
          <span className={theme === 'light' ? 'text-black' : 'text-white'}>Default</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          />
          <input
            type="text"
            placeholder="Search"
            className={`border rounded pl-9 pr-12 py-1.5 text-sm placeholder-gray-500 focus:outline-none w-64 transition-colors duration-300 ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300 text-black focus:border-gray-400'
                : 'bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#3a3a3a]'
            }`}
          />
          <kbd
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            ⌘/
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          className={`p-2 rounded transition-colors duration-200 ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#1a1a1a]'
          }`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-gray-700" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-400" />
          )}
        </button>

        {/* History Button */}
        <button
          className={`p-2 rounded transition-colors duration-200 ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#1a1a1a]'
          }`}
          aria-label="History"
        >
          <svg
            className={`w-4 h-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          className={`p-2 rounded relative transition-colors duration-200 ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#1a1a1a]'
          }`}
          onClick={onNotificationClick}
          aria-label="Notifications"
        >
          <Bell className={`w-4 h-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        {/* Dashboard Icon */}
        <button
          className={`p-2 rounded transition-colors duration-200 ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#1a1a1a]'
          }`}
        >
          <LayoutDashboard className={`w-4 h-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
        </button>
      </div>
    </header>
  );
}
