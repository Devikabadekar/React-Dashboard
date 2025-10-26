import { TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { RevenueChart } from './RevenueChart';
import { ProjectionsChart } from './ProjectionsChart';
import { RevenueMap } from './RevenueMap';
import { TopSellingProducts } from './TopSellingProducts';
import { TotalSalesChart } from './TotalSalesChart';

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">eCommerce</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Customers"
          value="3,781"
          change="+11.01%"
          isPositive={true}
          variant="light"
        />
        <MetricCard
          title="Orders"
          value="1,219"
          change="-0.03%"
          isPositive={false}
          variant="dark"
        />
        <MetricCard
          title="Revenue"
          value="$695"
          change="+15.03%"
          isPositive={true}
          variant="dark"
        />
        <MetricCard
          title="Growth"
          value="30.1%"
          change="+6.08%"
          isPositive={true}
          variant="light"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <ProjectionsChart />
        </div>
        <div>
          <RevenueMap />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <RevenueChart />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TopSellingProducts />
        </div>
        <div>
          <TotalSalesChart />
        </div>
      </div>
    </div>
  );
}
