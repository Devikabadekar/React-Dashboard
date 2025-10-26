import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

export function ProjectionsChart() {
  const { theme } = useTheme();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  
  const actualsData = [16, 20, 18, 22, 15, 20]; 
  const projectionsData = [4, 5, 3, 7, 3, 5]; 

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const maxValue = 30;

  const handleTouch = (index: number) => {
    setTouchedIndex(touchedIndex === index ? null : index);
  };

  const activeIndex = hoveredIndex !== null ? hoveredIndex : touchedIndex;

  return (
    <div
      className={`border rounded-xl p-4 sm:p-6 w-full transition-colors ${
        theme === 'light'
          ? 'bg-white border-gray-200 text-black'
          : 'bg-[#1a1a1a] border-[#2a2a2a] text-white'
      }`}
    >
      <div className="mb-4 sm:mb-8">
        <h3
          className={`text-lg sm:text-xl font-semibold transition-colors ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Projections vs Actuals
        </h3>
      </div>

      <div
        className="relative w-full chart-container"
        style={{
          height: '280px',
          paddingLeft: '32px',
          paddingBottom: '32px',
        }}
      >
        <style>{`
          @media (min-width: 640px) {
            .chart-container {
              height: 340px !important;
              padding-left: 48px !important;
              padding-bottom: 40px !important;
            }
          }

          @keyframes slideUp {
            from { transform: translateY(8px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .tooltip-enter { animation: slideUp 0.3s ease-out; }
          .bar-active { animation: pulse 0.6s ease-in-out; }
        `}</style>

        {/* Grid lines */}
        <div className="absolute left-8 sm:left-12 right-0 top-0 h-full">
          {[0, 33.33, 66.66, 100].map((pos) => (
            <div
              key={pos}
              className={`absolute w-full border-t transition-colors duration-300 ${
                theme === 'light' ? 'border-gray-200' : 'border-[#2a2a2a]'
              }`}
              style={{ top: `${pos}%` }}
            ></div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div
          className={`absolute left-0 top-0 flex flex-col justify-between text-xs sm:text-sm transition-colors duration-300 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}
          style={{
            height: 'calc(100% - 32px)',
            width: '32px',
          }}
        >
          <span className="text-right pr-2">30M</span>
          <span className="text-right pr-2">20M</span>
          <span className="text-right pr-2">10M</span>
          <span className="text-right pr-2">0</span>
        </div>

        {/* Bars */}
        <div
          className="absolute left-8 sm:left-12 right-0 flex items-end justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8"
          style={{
            height: 'calc(100% - 32px)',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {months.map((month, index) => {
            const totalHeight =
              ((actualsData[index] + projectionsData[index]) / maxValue) * 100;
            const actualsHeight =
              (actualsData[index] /
                (actualsData[index] + projectionsData[index])) *
              100;
            const projectionsHeight =
              (projectionsData[index] /
                (actualsData[index] + projectionsData[index])) *
              100;
            const isActive = activeIndex === index;

            return (
              <div
                key={month}
                className="flex-1 flex flex-col items-center h-full justify-end min-w-0 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTouch(index)}
                onTouchStart={() => handleTouch(index)}
              >
                <div
                  className={`w-full flex flex-col rounded-t-md overflow-visible relative transition-all duration-500 ease-out ${
                    isActive ? 'bar-active' : ''
                  }`}
                  style={{
                    height: `${totalHeight}%`,
                    maxWidth: '60px',
                    minWidth: '20px',
                    transform: isActive
                      ? 'translateY(-8px) scale(1.05)'
                      : 'translateY(0) scale(1)',
                    filter: isActive ? 'brightness(1.2)' : 'brightness(1)',
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  {/* Tooltip for Projections */}
                  {isActive && (
                    <div
                      className={`absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap tooltip-enter shadow-lg z-20 pointer-events-none ${
                        theme === 'light'
                          ? 'bg-gray-200 text-black'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <div className="font-semibold">
                        Projections: {projectionsData[index]}M
                      </div>
                      <div
                        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                          theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                        }`}
                      ></div>
                    </div>
                  )}

                  {/* Projections (top - gray) */}
                  <div
                    className="w-full bg-gradient-to-t from-[#5a6268] to-[#6c757d] transition-all duration-500 ease-out rounded-t-lg"
                    style={{
                      height: `${projectionsHeight}%`,
                      boxShadow: isActive
                        ? '0 -4px 24px rgba(108, 117, 125, 0.5)'
                        : 'none',
                    }}
                  ></div>

                  {/* Actuals (bottom - light blue) */}
                  <div
                    className="w-full bg-gradient-to-t from-[#7dd3fc] to-[#bae6fd] transition-all duration-500 ease-out relative"
                    style={{
                      height: `${actualsHeight}%`,
                      boxShadow: isActive
                        ? '0 4px 24px rgba(125, 211, 252, 0.6)'
                        : 'none',
                    }}
                  >
                    {/* Tooltip for Actuals */}
                    {isActive && (
                      <div
                        className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap tooltip-enter shadow-lg z-20 pointer-events-none ${
                          theme === 'light'
                            ? 'bg-cyan-200 text-black'
                            : 'bg-cyan-700 text-white'
                        }`}
                      >
                        <div className="font-semibold">
                          Actuals: {actualsData[index]}M
                        </div>
                        <div
                          className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                            theme === 'light'
                              ? 'bg-cyan-200'
                              : 'bg-cyan-700'
                          }`}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div
          className={`absolute bottom-0 left-8 sm:left-12 right-0 flex justify-between text-xs sm:text-sm transition-colors duration-300 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {months.map((month, index) => (
            <span
              key={month}
              className="flex-1 text-center min-w-0 transition-all duration-300"
              style={{
                maxWidth: '60px',
                color:
                  activeIndex === index
                    ? theme === 'light'
                      ? '#000'
                      : '#fff'
                    : '#6b7280',
                fontWeight: activeIndex === index ? 600 : 400,
                transform:
                  activeIndex === index ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
