import React from 'react';
import { Goals3 } from '@/components/dashboardblocks/goals';
import { goals, roadmap10Years } from '@/pages/dashboard/mock/client';
import { formatNumber } from '@/utils/format';

const houseGoal = goals.find((g) => g.key === 'house')!;

const ActiveChart: React.FC = () => {
  return (
    <Goals3
      title="Dự phóng tăng trưởng tài sản 10 năm"
      description="Kế hoạch tích lũy tài sản và mua nhà 10 năm"
      days={roadmap10Years.map((r) => r.x)}
      projectedData={roadmap10Years.map((r) => r.y)}
      target={houseGoal.futureValue}
      formatter={(v) => `${formatNumber(Math.round(v))} tr ₫`}
    />
  );
};

export default ActiveChart;
