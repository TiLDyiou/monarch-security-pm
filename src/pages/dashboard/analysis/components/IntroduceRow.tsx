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
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t } = useLanguage();
  const kpiTexts = t.dashboard.analysis.kpi;

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
                  {kpiTexts.expectedReturn}
                </CardDescription>
                <Tooltip title={kpiTexts.expectedReturnTooltip}>
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
                comparison={kpiTexts.expectedReturnVsRiskFree}
                previous={portfolio.riskFree}
                value={portfolio.expectedReturn}
                customDiff={premium}
                variant="emerald"
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>{kpiTexts.expectedReturnMonthly}</span>
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
                  {kpiTexts.risk}
                </CardDescription>
                <Tooltip title={kpiTexts.riskTooltip}>
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
                comparison={`${kpiTexts.riskVsVnIndex} ${formatPercent(vnIndexRisk)}`}
                previous={vnIndexRisk}
                value={portfolio.risk}
                customDiff={riskDiff}
                variant="indigo"
                reverseColor
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>{kpiTexts.riskMonthly}</span>
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
                  {kpiTexts.riskFree}
                </CardDescription>
                <Tooltip title={kpiTexts.riskFreeTooltip}>
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
                comparison={kpiTexts.riskFreeTenYear}
                previous={portfolio.riskFree}
                value={portfolio.riskFree}
                customDiff={portfolio.riskFree}
                variant="blue"
                showComparison
              />
            </div>

            <div className="mt-3 pt-2 text-xs text-muted-foreground flex items-center justify-between">
              <span>{kpiTexts.sharpeRatio}</span>
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
