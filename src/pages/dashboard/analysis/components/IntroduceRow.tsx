import { Col, Row, Skeleton, Tooltip } from 'antd';
import { Info } from 'lucide-react';
import {
  KPI,
  KPIChange,
  KPIContent,
  KPIValue,
} from '@/components/dashboardblocks/kpi';
import { CardDescription } from '@/components/ui/card';
import { formatNumber, formatPercent } from '@/utils/format';
import { portfolio } from '../../mock/client';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading }: { loading: boolean }) => {
  const premium = portfolio.expectedReturn - portfolio.riskFree;
  const vnIndexRisk = 18.08;
  const riskDiff = portfolio.risk - vnIndexRisk;

  if (loading) {
    return (
      <Row gutter={24}>
        {[1, 2, 3].map((i) => (
          <Col key={i} {...topColResponsiveProps}>
            <div className="rounded-xl bg-card p-5 shadow-sm border-0">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={24}>
      {/* ── 1. Tỷ suất sinh lợi kỳ vọng (Emerald / Green) ── */}
      <Col {...topColResponsiveProps}>
        <KPI className="h-full border-0 shadow-sm">
          <KPIContent className="gap-1.5 justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <CardDescription className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
                  Tỷ suất sinh lợi kỳ vọng
                </CardDescription>
                <Tooltip title="E(rc) của danh mục hoàn chỉnh OCP, tính theo năm">
                  <Info className="h-3.5 w-3.5 text-emerald-600/60 hover:text-emerald-700 cursor-pointer transition-colors" />
                </Tooltip>
              </div>
              <KPIValue
                value={portfolio.expectedReturn}
                format="percent"
                animated
                className="text-foreground"
              />
            </div>

            <div className="mt-1">
              <KPIChange
                comparison="vs lãi suất phi rủi ro"
                previous={portfolio.riskFree}
                value={portfolio.expectedReturn}
                customDiff={premium}
                variant="emerald"
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>Theo tháng</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                +{formatPercent(portfolio.expectedReturnMonthly, 4)}
              </span>
            </div>
          </KPIContent>
        </KPI>
      </Col>

      {/* ── 2. Rủi ro danh mục (Indigo / Purple) ── */}
      <Col {...topColResponsiveProps}>
        <KPI className="h-full border-0 shadow-sm">
          <KPIContent className="gap-1.5 justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <CardDescription className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase">
                  Rủi ro danh mục
                </CardDescription>
                <Tooltip title="Độ lệch chuẩn σc của danh mục hoàn chỉnh, tính theo năm">
                  <Info className="h-3.5 w-3.5 text-indigo-600/60 hover:text-indigo-700 cursor-pointer transition-colors" />
                </Tooltip>
              </div>
              <KPIValue
                value={portfolio.risk}
                format="percent"
                animated
                className="text-foreground"
              />
            </div>

            <div className="mt-1">
              <KPIChange
                comparison={`thấp hơn VN-Index ${formatPercent(vnIndexRisk)}`}
                previous={vnIndexRisk}
                value={portfolio.risk}
                customDiff={riskDiff}
                variant="indigo"
                reverseColor
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>Theo tháng</span>
              <span className="font-semibold text-indigo-700 dark:text-indigo-400">
                {formatPercent(portfolio.riskMonthly, 4)}
              </span>
            </div>
          </KPIContent>
        </KPI>
      </Col>

      {/* ── 3. Lãi suất phi rủi ro (Blue / Sky) ── */}
      <Col {...topColResponsiveProps}>
        <KPI className="h-full border-0 shadow-sm">
          <KPIContent className="gap-1.5 justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <CardDescription className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wider uppercase">
                  Lãi suất phi rủi ro
                </CardDescription>
                <Tooltip title="rf – Lãi suất Trái phiếu Chính phủ kỳ hạn 10 năm">
                  <Info className="h-3.5 w-3.5 text-blue-600/60 hover:text-blue-700 cursor-pointer transition-colors" />
                </Tooltip>
              </div>
              <KPIValue
                value={portfolio.riskFree}
                format="percent"
                animated
                className="text-foreground"
              />
            </div>

            <div className="mt-1">
              <KPIChange
                comparison="TPCP kỳ hạn 10 năm"
                previous={portfolio.riskFree}
                value={portfolio.riskFree}
                customDiff={portfolio.riskFree}
                variant="blue"
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>Chỉ số Sharpe OCP</span>
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                {formatNumber(portfolio.sharpe, 4)}
              </span>
            </div>
          </KPIContent>
        </KPI>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
