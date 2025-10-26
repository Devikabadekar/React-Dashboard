import { X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeContext';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  type: string;
  title: string;
  time: string;
  icon: string;
  details?: string;
}

const notifications: Notification[] = [
  { 
    type: 'bug', 
    title: 'You have a bug that needs...', 
    time: 'Just now', 
    icon: '🐛',
    details: 'You have a bug that needs attention. Please review the issue in your dashboard and take necessary action to resolve it.'
  },
  { 
    type: 'user', 
    title: 'New user registered', 
    time: '59 minutes ago', 
    icon: '👤',
    details: 'A new user has successfully registered on the platform. Welcome them and ensure they have access to all necessary resources.'
  },
  { 
    type: 'bug', 
    title: 'You have a bug that needs...', 
    time: '12 hours ago', 
    icon: '🐛',
    details: 'You have a bug that needs immediate attention. This issue was reported 12 hours ago and requires your review.'
  },
  { 
    type: 'subscription', 
    title: 'Andi Lane subscribed to you', 
    time: 'Today, 11:59 AM', 
    icon: '💬',
    details: 'Andi Lane has subscribed to your updates. They will now receive notifications about your activities and posts.'
  },
];

const activities = [
  { user: 'You', avatar: '👤', action: 'have a bug that needs...', time: 'Just now' },
  { user: 'Released', avatar: '👤', action: 'a new version', time: '59 minutes ago' },
  { user: 'Submitted', avatar: '👤', action: 'a bug', time: '12 hours ago' },
  { user: 'Modified', avatar: '👤', action: 'A data in Page X', time: 'Today, 11:59 AM' },
  { user: 'Deleted', avatar: '👤', action: 'a page in Project X', time: 'Feb 2, 2023' },
];

const contacts = [
  { name: 'Natali Craig', avatar: '👤' },
  { name: 'Drew Cano', avatar: '👤' },
  { name: 'Orlando Diggs', avatar: '👤' },
  { name: 'Andi Lane', avatar: '👤' },
  { name: 'Kate Morrison', avatar: '👤' },
  { name: 'Koray Okumus', avatar: '👤' },
];

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const bgColor = isLight ? 'bg-white' : 'bg-[#0f0f0f]';
  const borderColor = isLight ? 'border-gray-200' : 'border-[#1a1a1a]';
  const textColor = isLight ? 'text-black' : 'text-white';
  const hoverBg = isLight ? 'hover:bg-gray-100' : 'hover:bg-[#1a1a1a]';
  const subTextColor = isLight ? 'text-gray-500' : 'text-gray-400';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 ${isLight ? 'bg-black/20' : 'bg-black/50'} z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 ${bgColor} ${borderColor} border-l z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-4 border-b ${borderColor} flex items-center justify-between`}>
            {selectedNotification ? (
              <>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className={`p-1 rounded transition-colors ${hoverBg} mr-2`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className={`text-sm font-semibold flex-1 ${textColor}`}>Notification Details</h2>
              </>
            ) : (
              <h2 className={`text-sm font-semibold ${textColor}`}>Notifications</h2>
            )}
            <button
              onClick={onClose}
              className={`p-1 rounded transition-colors ${hoverBg}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedNotification ? (
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 text-2xl">
                    {selectedNotification.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold ${textColor} mb-1`}>
                      {selectedNotification.title}
                    </h3>
                    <p className="text-xs text-gray-500">{selectedNotification.time}</p>
                  </div>
                </div>
                <div className={`mt-4 p-4 rounded-lg ${bgColor}`}>
                  <p className={`text-sm leading-relaxed ${subTextColor}`}>
                    {selectedNotification.details}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Notifications List */}
                <div className="p-4 space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedNotification(notification)}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${hoverBg}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${textColor}`}>{notification.title}</p>
                        <p className="text-xs mt-0.5 text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activities */}
                <div className={`p-4 border-t ${borderColor}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${textColor}`}>Activities</h3>
                  <div className="space-y-3">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors ${hoverBg}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 text-xs">
                          {activity.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm`}>
                            <span className="font-medium">{activity.user}</span>{' '}
                            <span className="text-gray-400">{activity.action}</span>
                          </p>
                          <p className="text-xs mt-0.5 text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contacts */}
                <div className={`p-4 border-t ${borderColor}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${textColor}`}>Contacts</h3>
                  <div className="space-y-2">
                    {contacts.map((contact, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${hoverBg}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
                          {contact.avatar}
                        </div>
                        <span className={`text-sm ${textColor}`}>{contact.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSidebar;
