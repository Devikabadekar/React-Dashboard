import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { OrderList } from './components/OrderList';
import { RightSidebar } from './components/RightSidebar';
import { ThemeProvider, useTheme } from './components/ThemeContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'default' | 'ecommerce' | 'projects' | 'courses'>('default');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { theme } = useTheme(); 

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        theme === 'light' ? 'bg-gray-50 text-black' : 'bg-[#0a0a0a] text-white'
      }`}
    >
      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onNotificationClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />

        <main
          className={`flex-1 overflow-auto transition-colors duration-300 ${
            theme === 'light' ? 'bg-gray-50 text-black' : 'bg-[#0f0f0f] text-white'
          }`}
        >
          {currentView === 'default' && <OrderList />}
          {currentView === 'ecommerce' && <Dashboard />}
          {currentView === 'projects' && <div className="p-6">Projects View</div>}
          {currentView === 'courses' && <div className="p-6">Courses View</div>}
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
