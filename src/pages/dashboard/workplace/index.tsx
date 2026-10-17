import {
  ManOutlined,
  SmileOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Table } from 'antd';
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Landmark, ShieldCheck, TrendingUp } from 'lucide-react';
import { FinancialRoadmap } from './components/FinancialRoadmap';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { formatNumber } from '@/utils/format';
import {
  client,
  netWorth,
  surplus,
  totalAssets,
} from '../mock/client';
import { useLanguage } from '@/i18n/LanguageContext';

const Workplace: FC = () => {
  const { language, t } = useLanguage();
  const wp = t.dashboard.workplace;

  const benchmarkData = useMemo(
    () => [
      { metric: wp.benchmark.metrics.expectedReturn, market: '8,23%', orp: '20,46%', ocp: '12,25%' },
      { metric: wp.benchmark.metrics.risk, market: '18,08%', orp: '25,65%', ocp: '11,19%' },
      { metric: wp.benchmark.metrics.sharpe, market: '0,1291', orp: '0,5676', ocp: '0,5676' },
      { metric: wp.benchmark.metrics.utility, market: '-0,0006', orp: '0,0378', ocp: '0,0908' },
    ],
    [wp],
  );

  const benchmarkColumns = useMemo(
    () => [
      {
        title: <span className="whitespace-nowrap font-semibold text-sm">{wp.benchmark.metricCol}</span>,
        dataIndex: 'metric',
        key: 'metric',
        className: 'whitespace-nowrap text-sm py-3 px-2 font-medium text-foreground',
      },
      {
        title: <span className="whitespace-nowrap font-medium text-sm text-muted-foreground">VN-Index</span>,
        dataIndex: 'market',
        key: 'market',
        align: 'right' as const,
        className: 'whitespace-nowrap text-sm py-3 px-2 tabular-nums text-foreground/80',
      },
      {
        title: <span className="whitespace-nowrap font-medium text-sm text-muted-foreground">ORP</span>,
        dataIndex: 'orp',
        key: 'orp',
        align: 'right' as const,
        className: 'whitespace-nowrap text-sm py-3 px-2 tabular-nums text-foreground/80',
      },
      {
        title: <span className="whitespace-nowrap font-bold text-sm text-teal-600 dark:text-teal-400">OCP</span>,
        dataIndex: 'ocp',
        key: 'ocp',
        align: 'right' as const,
        className: 'whitespace-nowrap text-sm py-3 px-2 tabular-nums',
        render: (v: string) => <strong className="text-teal-600 dark:text-teal-400 font-bold text-sm">{v}</strong>,
      },
    ],
    [wp],
  );

  const performanceRadarData = useMemo(
    () => [
      {
        subject: wp.radar.subjects.return,
        danhMuc: 85,
        thiTruong: 65,
        traiPhieu: 45,
        danhMucVal: '12,25%',
        thiTruongVal: '8,23%',
        traiPhieuVal: '5,90%',
      },
      {
        subject: wp.radar.subjects.risk,
        danhMuc: 52,
        thiTruong: 85,
        traiPhieu: 15,
        danhMucVal: '11,19%',
        thiTruongVal: '18,08%',
        traiPhieuVal: '1,50%',
      },
      {
        subject: wp.radar.subjects.growth,
        danhMuc: 88,
        thiTruong: 68,
        traiPhieu: 35,
        danhMucVal: wp.radar.values.growthOcp,
        thiTruongVal: wp.radar.values.growthMarket,
        traiPhieuVal: wp.radar.values.growthBonds,
      },
      {
        subject: wp.radar.subjects.sharpe,
        danhMuc: 95,
        thiTruong: 35,
        traiPhieu: 10,
        danhMucVal: '0,5676',
        thiTruongVal: '0,1291',
        traiPhieuVal: '0,0000',
      },
      {
        subject: wp.radar.subjects.utility,
        danhMuc: 92,
        thiTruong: 20,
        traiPhieu: 50,
        danhMucVal: '0,0908',
        thiTruongVal: '-0,0006',
        traiPhieuVal: '0,0500',
      },
    ],
    [wp],
  );

  const clientProfiles = useMemo(
    () => [
      {
        id: 'husband',
        name: `${client.husband.name} · ${client.husband.birthYear}`,
        tag: `${new Date().getFullYear() - client.husband.birthYear} ${language === 'en' ? 'yrs · ' : 'tuổi · '}${wp.profiles.husband.tag}`,
        role: wp.profiles.husband.role,
        org: wp.profiles.husband.org,
        income: wp.profiles.husband.income,
        benefit: wp.profiles.husband.benefit,
        icon: <ManOutlined className="text-base" />,
        iconClass: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/40',
      },
      {
        id: 'wife',
        name: `${client.wife.name} · ${client.wife.birthYear}`,
        tag: `${new Date().getFullYear() - client.wife.birthYear} ${language === 'en' ? 'yrs · ' : 'tuổi · '}${wp.profiles.wife.tag}`,
        role: wp.profiles.wife.role,
        org: wp.profiles.wife.org,
        income: wp.profiles.wife.income,
        benefit: wp.profiles.wife.benefit,
        icon: <WomanOutlined className="text-base" />,
        iconClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/40',
      },
      {
        id: 'child-0',
        name: `${client.children[0].name} · ${client.children[0].birthYear}`,
        tag: `${new Date().getFullYear() - client.children[0].birthYear} ${language === 'en' ? 'yrs · ' : 'tuổi · '}${wp.profiles.child1.tag}`,
        role: wp.profiles.child1.role,
        org: wp.profiles.child1.org,
        icon: <SmileOutlined className="text-base" />,
        iconClass: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40',
      },
      {
        id: 'child-1',
        name: `${client.children[1].name} · ${client.children[1].birthYear}`,
        tag: `${new Date().getFullYear() - client.children[1].birthYear} ${language === 'en' ? 'yrs · ' : 'tuổi · '}${wp.profiles.child2.tag}`,
        role: wp.profiles.child2.role,
        org: wp.profiles.child2.org,
        icon: <SmileOutlined className="text-base" />,
        iconClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40',
      },
    ],
    [wp, language],
  );

  return (
    <PageContainer
      title={false}
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          {/* Household Members & Financial Profile */}
          <div className="mb-6">
            <div className="mb-3.5 px-0.5">
              <h2 className="text-base font-semibold text-foreground tracking-tight">
                {wp.header.title}
              </h2>
              <p className="text-xs text-muted-foreground font-normal mt-0.5">
                {wp.header.subtitle}
              </p>
            </div>

            {/* Financial Capability Bar */}
            <div className="mb-4 rounded-xl border border-border/60 bg-card shadow-2xs overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                <div className="p-3.5 sm:p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/40 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground font-medium block">{wp.stats.totalAssets}</span>
                    <div className="text-lg sm:text-xl font-bold tracking-tight text-foreground tabular-nums">
                      {formatNumber(totalAssets)} {t.common.millionVnd}
                    </div>
                    <span className="text-[11px] text-muted-foreground/80 block mt-0.5">
                      {wp.stats.totalAssetsDesc}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground font-medium block">{wp.stats.netWorth}</span>
                    <div className="text-lg sm:text-xl font-bold tracking-tight text-foreground tabular-nums">
                      {formatNumber(netWorth)} {t.common.millionVnd}
                    </div>
                    <span className="text-[11px] text-muted-foreground/80 block mt-0.5">
                      {wp.stats.netWorthDesc}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground font-medium block">{wp.stats.surplus}</span>
                    <div className="text-lg sm:text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400 tabular-nums">
                      +{formatNumber(surplus)} {t.common.vndPerMonth}
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">
                      {wp.stats.surplusDesc}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              {clientProfiles.map((item) => (
                <Col xs={24} sm={12} key={item.id}>
                  <SpotlightCard
                    theme="light"
                    spotlightColor="rgba(0, 160, 176, 0.22)"
                    intensity={0.2}
                    spotlightSize={240}
                    softness={0.7}
                    shape="circle"
                    borderGlow={0.65}
                    proximity={80}
                    smoothing={0.25}
                    grain={0}
                    ambient={false}
                    flare
                    className="!p-4 sm:!p-5 h-full flex flex-col justify-between border border-border/70 hover:border-teal-500/40 transition-colors shadow-2xs hover:shadow-xs group cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.iconClass}`}
                        >
                          {item.icon}
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/50">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-foreground tracking-tight mb-1 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium text-foreground/85 mb-1">
                        {item.role}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {item.org}
                      </p>
                    </div>

                    {(item.income || item.benefit) && (
                      <div className="pt-2.5 border-t border-border/50 mt-auto flex flex-col gap-1 text-[11px]">
                        {item.income && (
                          <div className="font-semibold text-teal-700 dark:text-teal-400 flex items-center justify-between">
                            <span>{item.income}</span>
                          </div>
                        )}
                        {item.benefit && (
                          <div className="text-muted-foreground flex items-center justify-between">
                            <span>{item.benefit}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </SpotlightCard>
                </Col>
              ))}
            </Row>
          </div>

          <div style={{ marginBottom: 24 }}>
            <FinancialRoadmap />
          </div>
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            variant="borderless"
            title={wp.benchmark.title}
          >
            <Table
              size="middle"
              pagination={false}
              rowKey="metric"
              columns={benchmarkColumns}
              dataSource={benchmarkData}
              className="whitespace-nowrap"
            />
          </Card>
          <Card
            styles={{
              body: {
                padding: '10px 12px 14px',
              },
            }}
            variant="borderless"
            title={wp.radar.title}
          >
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="68%" data={performanceRadarData}>
                  <PolarGrid stroke="rgba(148, 163, 184, 0.3)" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 500 }}
                    className="text-foreground/80 font-medium"
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={wp.radar.legends.ocp}
                    dataKey="danhMuc"
                    stroke="#00a0b0"
                    fill="#00a0b0"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                  <Radar
                    name={wp.radar.legends.market}
                    dataKey="thiTruong"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                  <Radar
                    name={wp.radar.legends.bonds}
                    dataKey="traiPhieu"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const item = payload[0]?.payload;
                      if (!item) return null;
                      return (
                        <div className="bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-2.5 text-xs min-w-[190px]">
                          <div className="font-semibold text-foreground mb-1.5 pb-1 border-b border-border/50">
                            {item.subject}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-medium">
                                <span className="w-2 h-2 rounded-full bg-teal-500" />
                                {wp.radar.legends.ocp}:
                              </span>
                              <span className="font-semibold text-foreground">{item.danhMucVal}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                {wp.radar.legends.market}:
                              </span>
                              <span className="text-muted-foreground">{item.thiTruongVal}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                {wp.radar.legends.bonds}:
                              </span>
                              <span className="text-muted-foreground">{item.traiPhieuVal}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-x-3.5 gap-y-1 pt-2 border-t border-border/50 text-[11px]">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span>{wp.radar.legends.ocp}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>{wp.radar.legends.market}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span>{wp.radar.legends.bonds}</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
