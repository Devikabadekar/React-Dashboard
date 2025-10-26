import React, { useState } from 'react';
import { useTheme } from './ThemeContext'; 

export function RevenueChart() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const currentWeekData = [8, 17, 16, 13, 10, 17, 23];
  const previousWeekData = [17, 8, 6, 12, 16, 17, 17];

  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const svgX = (x / rect.width) * 1200;

    const monthIndex = Math.floor(svgX / 200);
    if (monthIndex >= 0 && monthIndex < 6) {
      setActiveMonth(activeMonth === monthIndex ? null : monthIndex);
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const svgX = (x / rect.width) * 1200;

    const monthIndex = Math.floor(svgX / 200);
    if (monthIndex >= 0 && monthIndex < 6) {
      setActiveMonth(activeMonth === monthIndex ? null : monthIndex);
      setMousePosition({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    }
  };

  return (
    <div
      className={`col-span-2 border rounded-xl p-6 w-full transition-colors duration-300 ${
        isLight ? 'bg-white border-gray-300' : 'bg-[#1a1a1a] border-[#2a2a2a]'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-medium ${isLight ? 'text-black' : 'text-white'}`}>Revenue</h3>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#67e8f9]"></span>
            <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Current Week</span>
            <span className={isLight ? 'text-black font-semibold ml-1' : 'text-white font-semibold ml-1'}>$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]"></span>
            <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Previous Week</span>
            <span className={isLight ? 'text-black font-semibold ml-1' : 'text-white font-semibold ml-1'}>$68,768</span>
          </div>
        </div>
      </div>

      <div className="relative w-full" style={{ height: '320px', paddingLeft: '48px', paddingBottom: '32px' }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .tooltip-card { animation: fadeIn 0.2s ease-out; }
          .pulse-circle { animation: pulse 1.5s ease-in-out infinite; }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
        `}</style>

        <svg
          className="w-full h-full cursor-pointer"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          onClick={handleSvgClick}
          onTouchStart={handleTouchStart}
        >
          <defs>
            <linearGradient id="currentWeekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? 'rgba(103, 232, 249, 0.25)' : 'rgba(103, 232, 249, 0.15)'} />
              <stop offset="100%" stopColor={isLight ? 'rgba(103, 232, 249, 0)' : 'rgba(103, 232, 249, 0)'} />
            </linearGradient>
            <linearGradient id="previousWeekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? 'rgba(167, 139, 250, 0.2)' : 'rgba(167, 139, 250, 0.1)'} />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[100, 200, 300].map((y) => (
            <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke={isLight ? '#e5e7eb' : '#2a2a2a'} strokeWidth="1" />
          ))}

          {/* Previous Week - Purple Dashed Line */}
          <path
            d="M 0 240 Q 150 280, 300 320 T 600 260 T 900 300 T 1200 320"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            strokeDasharray="10,8"
            strokeLinecap="round"
            style={{ filter: activeMonth !== null ? 'url(#glow)' : 'none' }}
          />

          {/* Previous Week Area Fill */}
          <path
            d="M 0 240 Q 150 280, 300 320 T 600 260 T 900 300 T 1200 320 L 1200 400 L 0 400 Z"
            fill="url(#previousWeekGradient)"
          />

          {/* Current Week - Cyan Solid Line */}
          <path
            d="M 0 340 Q 150 260, 300 280 T 600 360 T 900 200 T 1200 140"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: activeMonth !== null ? 'url(#glow)' : 'none' }}
          />

          {/* Current Week Area Fill */}
          <path
            d="M 0 340 Q 150 260, 300 280 T 600 360 T 900 200 T 1200 140 L 1200 400 L 0 400 Z"
            fill="url(#currentWeekGradient)"
          />

          {/* Overlay Zones */}
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <rect
              key={index}
              x={index * 200}
              y="0"
              width="200"
              height="400"
              fill={activeMonth === index ? (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)') : 'transparent'}
            />
          ))}

          {/* Active Month Indicator */}
          {activeMonth !== null && (
            <>
              <line
                x1={activeMonth * 200 + 100}
                y1="0"
                x2={activeMonth * 200 + 100}
                y2="400"
                stroke={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <circle
                cx={activeMonth * 200 + 100}
                cy={340 - (currentWeekData[activeMonth] || 0) * 10}
                r="6"
                fill="#67e8f9"
                className="pulse-circle"
              />
              <circle
                cx={activeMonth * 200 + 100}
                cy={240 + (previousWeekData[activeMonth] || 0) * 5}
                r="6"
                fill="#a78bfa"
                className="pulse-circle"
              />
            </>
          )}
        </svg>

        {/* Y-axis labels */}
        <div
          className={`absolute left-0 top-0 h-full flex flex-col justify-between text-sm pr-3 ${
            isLight ? 'text-gray-600' : 'text-gray-500'
          }`}
          style={{ width: '48px', paddingBottom: '32px' }}
        >
          <span className="text-right">30M</span>
          <span className="text-right">20M</span>
          <span className="text-right">10M</span>
          <span className="text-right">0</span>
        </div>

        {/* X-axis labels */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-between text-sm ${
            isLight ? 'text-gray-600' : 'text-gray-500'
          }`}
          style={{ paddingLeft: '48px' }}
        >
          {months.map((month, index) => (
            <span
              key={month}
              className="flex-1 text-center transition-all duration-300"
              style={{
                color: activeMonth === index ? (isLight ? '#000' : '#fff') : isLight ? '#6b7280' : '#9ca3af',
                fontWeight: activeMonth === index ? 600 : 400,
                transform: activeMonth === index ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {month}
            </span>
          ))}
        </div>

        {/* Tooltip Card */}
        {activeMonth !== null && (
          <div
            className={`absolute rounded-lg p-4 shadow-2xl z-50 tooltip-card pointer-events-none border transition-colors ${
              isLight ? 'bg-white border-gray-300' : 'bg-[#2a2a2a] border-[#3a3a3a]'
            }`}
            style={{
              left: `${Math.min(Math.max(mousePosition.x, 120), 600)}px`,
              top: `${Math.max(mousePosition.y - 120, 20)}px`,
              minWidth: '200px',
            }}
          >
            <div className="mb-3">
              <h4 className={`font-semibold text-base mb-1 ${isLight ? 'text-black' : 'text-white'}`}>
                {months[activeMonth]}
              </h4>
              <p className={isLight ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Click again to close</p>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Current Week', color: '#67e8f9', value: currentWeekData[activeMonth] },
                { label: 'Previous Week', color: '#a78bfa', value: previousWeekData[activeMonth] },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className={isLight ? 'text-gray-700 text-sm' : 'text-gray-300 text-sm'}>
                      {item.label}
                    </span>
                  </div>
                  <span className={isLight ? 'text-black font-semibold text-sm' : 'text-white font-semibold text-sm'}>
                    ${(item.value * 1000).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className={`pt-2 mt-2 border-t ${isLight ? 'border-gray-300' : 'border-[#3a3a3a]'}`}>
                <div className="flex items-center justify-between">
                  <span className={isLight ? 'text-gray-600 text-xs' : 'text-gray-400 text-xs'}>Difference</span>
                  <span
                    className={`text-sm font-semibold ${
                      currentWeekData[activeMonth] > previousWeekData[activeMonth]
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {currentWeekData[activeMonth] > previousWeekData[activeMonth] ? '+' : ''}
                    ${(
                      (currentWeekData[activeMonth] - previousWeekData[activeMonth]) *
                      1000
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={isLight ? 'text-gray-600 text-xs' : 'text-gray-400 text-xs'}>Change</span>
                  <span
                    className={`text-sm font-semibold ${
                      currentWeekData[activeMonth] > previousWeekData[activeMonth]
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {(
                      ((currentWeekData[activeMonth] - previousWeekData[activeMonth]) /
                        (previousWeekData[activeMonth] || 1)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`absolute -bottom-2 left-8 w-4 h-4 transform rotate-45 ${
                isLight ? 'bg-white border-r border-b border-gray-300' : 'bg-[#2a2a2a] border-r border-b border-[#3a3a3a]'
              }`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
