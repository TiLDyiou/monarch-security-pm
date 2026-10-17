import {
  assets,
  cashHoldings,
  expenses,
  getStockPrices,
  income,
  netWorth,
  portfolioAllocation,
  surplus,
  totalExpenses,
  totalLiabilities,
} from '../mock/client';
import type { AnalysisData } from './data.d';

// Stands in for the template's `request('/api/fake_analysis_chart_data')`
export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  const prices = getStockPrices();
  return Promise.resolve({
    data: {
      salesData: expenses,
      cashFlowData: [
        ...income,
        { x: 'Tổng chi tiêu', y: totalExpenses },
        { x: 'Thặng dư', y: surplus },
      ],
      searchData: prices,
      salesTypeData: assets.map((a) => ({ x: a.short, y: a.value })),
      salesTypeDataOnline: [
        { x: 'Nợ vay ngân hàng', y: totalLiabilities },
        { x: 'Giá trị tài sản ròng', y: netWorth },
      ],
      salesTypeDataOffline: cashHoldings,
      salesTypeDataPortfolio: portfolioAllocation,
    },
  });
}
