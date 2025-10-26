import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  variant: 'light' | 'dark';
}

export function MetricCard({ title, value, change, isPositive, variant }: MetricCardProps) {
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
        variant === 'light'
          ? 'bg-gradient-to-br from-gray-100 to-white text-black'
          : 'bg-[#1a1a1a] border border-[#2a2a2a] text-white'
      }`}
    >
      <div className={`text-sm mb-2 ${variant === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        {title}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-sm">
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>{change}</span>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
