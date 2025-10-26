import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

interface SalesDataItem {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface SegmentItem extends SalesDataItem {
  startAngle: number;
  sweepAngle: number;
}

export function TotalSalesChart() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const salesData: SalesDataItem[] = [
    { label: 'Direct', value: 300.56, color: '#d8b4fe', percentage: 46.7 },
    { label: 'Affiliate', value: 135.18, color: '#a7f3d0', percentage: 21.0 },
    { label: 'E-mail', value: 48.96, color: '#93c5fd', percentage: 7.6 },
    { label: 'Sponsored', value: 154.02, color: '#7dd3fc', percentage: 23.9 },
  ];

  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const total = salesData.reduce((sum, item) => sum + item.value, 0);

  const handleSegmentClick = (index: number) => {
    setShowDetails(showDetails === index ? null : index);
  };

  const calculateSegments = (): SegmentItem[] => {
    const segments: SegmentItem[] = [];
    let startAngle = -90;
    const gapAngle = 2;

    const totalValue = salesData.reduce((sum, item) => sum + item.value, 0);

    salesData.forEach((item) => {
      const percentage = (item.value / totalValue) * 100;
      const sweepAngle = (percentage / 100) * 360 - gapAngle;

      segments.push({
        ...item,
        startAngle: startAngle + gapAngle / 2,
        sweepAngle,
        percentage,
      });

      startAngle += sweepAngle + gapAngle;
    });

    return segments;
  };

  const segments = calculateSegments();

  const createDonutPath = (
    startAngle: number,
    sweepAngle: number,
    outerRadius: number,
    innerRadius: number
  ): string => {
    const cornerRadius = 6;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + sweepAngle) * Math.PI) / 180;

    const outerStartX = 100 + outerRadius * Math.cos(startRad);
    const outerStartY = 100 + outerRadius * Math.sin(startRad);
    const outerEndX = 100 + outerRadius * Math.cos(endRad);
    const outerEndY = 100 + outerRadius * Math.sin(endRad);

    const innerStartX = 100 + innerRadius * Math.cos(startRad);
    const innerStartY = 100 + innerRadius * Math.sin(startRad);
    const innerEndX = 100 + innerRadius * Math.cos(endRad);
    const innerEndY = 100 + innerRadius * Math.sin(endRad);

    const largeArc = sweepAngle > 180 ? 1 : 0;

    const angleOffset = cornerRadius / outerRadius;
    const innerAngleOffset = cornerRadius / innerRadius;

    const outerStartOffsetRad = startRad + angleOffset;
    const outerEndOffsetRad = endRad - angleOffset;
    const innerStartOffsetRad = startRad + innerAngleOffset;
    const innerEndOffsetRad = endRad - innerAngleOffset;

    const outerStartOffsetX = 100 + outerRadius * Math.cos(outerStartOffsetRad);
    const outerStartOffsetY = 100 + outerRadius * Math.sin(outerStartOffsetRad);
    const outerEndOffsetX = 100 + outerRadius * Math.cos(outerEndOffsetRad);
    const outerEndOffsetY = 100 + outerRadius * Math.sin(outerEndOffsetRad);

    const innerStartOffsetX = 100 + innerRadius * Math.cos(innerStartOffsetRad);
    const innerStartOffsetY = 100 + innerRadius * Math.sin(innerStartOffsetRad);
    const innerEndOffsetX = 100 + innerRadius * Math.cos(innerEndOffsetRad);
    const innerEndOffsetY = 100 + innerRadius * Math.sin(innerEndOffsetRad);

    return `
      M ${outerStartOffsetX} ${outerStartOffsetY}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndOffsetX} ${outerEndOffsetY}
      Q ${outerEndX} ${outerEndY}, ${innerEndOffsetX} ${innerEndOffsetY}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartOffsetX} ${innerStartOffsetY}
      Q ${innerStartX} ${innerStartY}, ${outerStartOffsetX} ${outerStartOffsetY}
      Z
    `;
  };

  return (
    <div
      className={`rounded-2xl p-4 w-full max-w-md border transition-colors duration-300 ${
        isLight
          ? 'bg-white border-gray-200 text-black'
          : 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
      }`}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 8px ${isLight ? '#000' : '#fff'}); }
          50% { filter: drop-shadow(0 0 16px ${isLight ? '#000' : '#fff'}); }
        }
        .detail-card { animation: fadeIn 0.3s ease-out; }
        .segment-active { animation: pulseGlow 1.5s ease-in-out infinite; }
      `}</style>

      <h3 className={`text-2xl font-bold mb-4 ${isLight ? 'text-black' : 'text-white'}`}>
        Total Sales
      </h3>

      <div className="flex flex-col items-center justify-center mb-4 relative">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              {segments.map((segment, index) => (
                <filter key={`glow-${index}`} id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {segments.map((segment, index) => {
              const isActive = activeSegment === index || showDetails === index;
              const path = createDonutPath(segment.startAngle, segment.sweepAngle, 75, 50);
              return (
                <g
                  key={index}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveSegment(index)}
                  onMouseLeave={() => setActiveSegment(null)}
                  onClick={() => handleSegmentClick(index)}
                  onTouchStart={() => handleSegmentClick(index)}
                >
                  <path
                    d={path}
                    fill={segment.color}
                    className={`transition-all duration-300 ${isActive ? 'segment-active' : ''}`}
                    style={{
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: '100px 100px',
                      filter: isActive ? `url(#glow-${index})` : 'none',
                      opacity: isActive ? 1 : 0.95,
                    }}
                  />
                </g>
              );
            })}

            {/* Center circle */}
            <circle cx="100" cy="100" r="50" fill={isLight ? '#fff' : '#2a2a2a'} />
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className={`text-4xl font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                {showDetails !== null ? salesData[showDetails].percentage : '38.6'}%
              </div>
              {showDetails !== null && (
                <div className={`text-sm mt-1 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
                  {salesData[showDetails].label}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Card */}
        {showDetails !== null && (
          <div
            className={`absolute top-full mt-4 rounded-lg p-4 shadow-2xl z-50 w-64 border detail-card transition-colors duration-300 ${
              isLight
                ? 'bg-white border-gray-200 text-black'
                : 'bg-[#1a1a1a] border-[#3a3a3a] text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: salesData[showDetails].color }}
                ></span>
                <h4 className="font-semibold">{salesData[showDetails].label}</h4>
              </div>
              <button
                onClick={() => setShowDetails(null)}
                className={`${isLight ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Amount</span>
                <span className="font-semibold">${salesData[showDetails].value.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Percentage</span>
                <span className="font-semibold">{salesData[showDetails].percentage}%</span>
              </div>
              <div className={`pt-2 mt-2 border-t ${isLight ? 'border-gray-200' : 'border-[#3a3a3a]'}`}>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Total Sales</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {salesData.map((item, index) => {
          const isActive = activeSegment === index || showDetails === index;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-2 -mx-2 rounded cursor-pointer transition-all duration-300 ${
                isLight
                  ? isActive
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                  : isActive
                  ? 'bg-[#333333]'
                  : 'hover:bg-[#2f2f2f]'
              }`}
              onClick={() => handleSegmentClick(index)}
              onMouseEnter={() => setActiveSegment(index)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: item.color,
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 8px ${item.color}` : 'none',
                  }}
                ></span>
                <span
                  className={`text-lg transition-all duration-300 ${
                    isLight
                      ? isActive
                        ? 'text-black font-semibold'
                        : 'text-gray-700'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-lg font-semibold transition-all duration-300 ${
                  isLight ? 'text-black' : 'text-gray-200'
                }`}
              >
                ${item.value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
