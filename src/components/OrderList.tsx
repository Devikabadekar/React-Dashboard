import { useState } from 'react';
import { Plus, Filter, ArrowUpDown, Search, MoreHorizontal, Calendar, Sun, Moon } from 'lucide-react';

interface Order {
  id: string;
  user: string;
  avatar: string;
  project: string;
  address: string;
  date: string;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
}

const orders: Order[] = [
  { id: '#CM9801', user: 'Natali Craig', avatar: '👤', project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
  { id: '#CM9802', user: 'Kate Morrison', avatar: '👤', project: 'CRM Admin pages', address: 'Larry San Francisco', date: 'A minute ago', status: 'Complete' },
  { id: '#CM9803', user: 'Drew Cano', avatar: '👤', project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
  { id: '#CM9804', user: 'Orlando Diggs', avatar: '👤', project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' },
  { id: '#CM9805', user: 'Andi Lane', avatar: '👤', project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' },
  { id: '#CM9801', user: 'Natali Craig', avatar: '👤', project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
  { id: '#CM9802', user: 'Kate Morrison', avatar: '👤', project: 'CRM Admin pages', address: 'Larry San Francisco', date: 'A minute ago', status: 'Complete' },
  { id: '#CM9803', user: 'Drew Cano', avatar: '👤', project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
  { id: '#CM9804', user: 'Orlando Diggs', avatar: '👤', project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' }, 
  { id: '#CM9805', user: 'Andi Lane', avatar: '👤', project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' }, 
];

export function OrderList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'In Progress': return 'text-blue-500';
      case 'Complete': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Approved': return 'text-cyan-500';
      case 'Rejected': return 'text-red-500';
    }
  };

  const theme = {
    bg: isDarkTheme ? 'bg-gray-900' : 'bg-white',
    text: isDarkTheme ? 'text-white' : 'text-black',
    border: isDarkTheme ? 'border-gray-700' : 'border-gray-300',
    hover: isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    inputBg: isDarkTheme ? 'bg-gray-800' : 'bg-white',
    inputText: isDarkTheme ? 'text-white' : 'text-black',
    placeholder: isDarkTheme ? 'placeholder-gray-400' : 'placeholder-gray-500',
    buttonBg: isDarkTheme ? 'bg-gray-800' : 'bg-white',
    buttonHover: isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    checkboxBg: isDarkTheme ? 'bg-gray-700' : 'bg-gray-100',
    checkboxBorder: isDarkTheme ? 'border-gray-600' : 'border-gray-400',
    iconColor: isDarkTheme ? 'text-gray-300' : 'text-gray-600',
    controlIcon: isDarkTheme ? 'text-white' : 'text-gray-600',
  };

  return (
    <div className={`p-6 ${theme.bg} min-h-screen transition-colors duration-300`}>
      <div className="mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className={`text-xl font-semibold ${theme.text}`}>Order List</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded border ${theme.border} ${theme.buttonBg} ${theme.buttonHover}`}
          >
            {isDarkTheme 
              ? <Sun className="w-4 h-4 text-yellow-400" /> 
              : <Moon className="w-4 h-4 text-gray-700" />}
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded border ${theme.border} ${theme.buttonBg} ${theme.buttonHover}`}>
              <Plus className={`w-4 h-4 ${theme.controlIcon}`} />
            </button>
            <button className={`p-2 rounded border ${theme.border} ${theme.buttonBg} ${theme.buttonHover}`}>
              <Filter className={`w-4 h-4 ${theme.controlIcon}`} />
            </button>
            <button className={`p-2 rounded border ${theme.border} ${theme.buttonBg} ${theme.buttonHover}`}>
              <ArrowUpDown className={`w-4 h-4 ${theme.controlIcon}`} />
            </button>
          </div>

          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
            <input
              type="text"
              placeholder="Search"
              className={`rounded pl-9 pr-4 py-1.5 text-sm border ${theme.border} ${theme.inputText} ${theme.placeholder} focus:outline-none w-64 transition-colors ${theme.inputBg}`}
            />
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-lg overflow-hidden border ${theme.border}`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className="text-left p-4 text-sm font-medium text-gray-500 w-12">
                  <input type="checkbox" className={`rounded border ${theme.checkboxBorder} ${theme.checkboxBg} checked:bg-blue-500 checked:border-blue-500 transition-colors`} />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Project</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Address</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={`${order.id}-${index}`} className={`border-b ${theme.border} ${theme.hover} transition-colors`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(`${order.id}-${index}`)}
                      onChange={() => toggleRow(`${order.id}-${index}`)}
                      className={`rounded border ${theme.checkboxBorder} ${theme.checkboxBg} checked:bg-blue-500 checked:border-blue-500 transition-colors duration-200`}
                    />
                  </td>
                  <td className={`p-4 text-sm ${theme.text}`}>{order.id}</td>
                  <td className={`p-4 ${theme.text}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {order.avatar}
                      </div>
                      <span className="text-sm">{order.user}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${theme.text}`}>{order.project}</td>
                  <td className={`p-4 text-sm ${theme.text}`}>{order.address}</td>
                  <td className={`p-4 text-sm flex items-center gap-2 ${theme.text}`}>
                    <Calendar className={`w-3 h-3 ${theme.iconColor}`} />
                    {order.date}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(order.status).replace('text-', 'bg-')}`}></span>
                      <span className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className={`p-1 rounded transition-colors ${theme.buttonHover}`}>
                      <MoreHorizontal className={`w-4 h-4 ${theme.controlIcon}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className={`p-2 rounded transition-colors ${theme.buttonHover} ${theme.text}`}
          >
            &lt;
          </button>
          {[1,2,3,4,5].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded transition-colors ${currentPage === page ? `${theme.buttonBg} ${theme.inputText}` : `${theme.text} ${theme.buttonHover}`}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
            className={`p-2 rounded transition-colors ${theme.buttonHover} ${theme.text}`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
