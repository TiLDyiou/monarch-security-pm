import { ManOutlined, SmileOutlined, WomanOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import type { FC, ReactNode } from 'react';
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
import { cn } from '@/lib/utils';
import { FinancialRoadmap } from './components/FinancialRoadmap';
import { formatNumber } from '@/utils/format';
import { client, netWorth, surplus, totalAssets } from '../mock/client';
import { useLanguage } from '@/i18n/LanguageContext';

// One shell for every block on the page, so headers, borders and spacing read as a single system
const Panel: FC<{ title: ReactNode; subtitle?: ReactNode; className?: string; children: ReactNode }> = ({
  title,
  subtitle,
  className,
  children,
}) => (
  <section className={cn('rounded-xl border border-border/60 bg-card shadow-xs overflow-hidden', className)}>
    <header className="px-4 sm:px-5 py-3.5 border-b border-border/50">
      <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </header>
    {children}
  </section>
);

const Workplace: FC = () => {
  const { language, t } = useLanguage();
  const wp = t.dashboard.workplace;

  const stats = [
    {
      key: 'assets',
      icon: Landmark,
      label: wp.stats.totalAssets,
      value: formatNumber(totalAssets),
      unit: t.common.millionVnd,
      note: wp.stats.totalAssetsDesc,
    },
    {
      key: 'netWorth',
      icon: ShieldCheck,
      label: wp.stats.netWorth,
      value: formatNumber(netWorth),
      unit: t.common.millionVnd,
      note: wp.stats.netWorthDesc,
    },
    {
      key: 'surplus',
      icon: TrendingUp,
      label: wp.stats.surplus,
      value: `+${formatNumber(surplus)}`,
      unit: t.common.vndPerMonth,
      note: wp.stats.surplusDesc,
      accent: true,
    },
  ];

  const benchmarkData = useMemo(
    () => [
      { metric: wp.benchmark.metrics.expectedReturn, market: '8,23%', orp: '20,46%', ocp: '12,25%' },
      { metric: wp.benchmark.metrics.risk, market: '18,08%', orp: '25,65%', ocp: '11,19%' },
      { metric: wp.benchmark.metrics.sharpe, market: '0,1291', orp: '0,5676', ocp: '0,5676' },
      { metric: wp.benchmark.metrics.utility, market: '-0,0006', orp: '0,0378', ocp: '0,0908' },
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

  const radarSeries = [
    { label: wp.radar.legends.ocp, dot: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400', key: 'danhMucVal' as const },
    { label: wp.radar.legends.market, dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', key: 'thiTruongVal' as const },
    { label: wp.radar.legends.bonds, dot: 'bg-slate-400', text: 'text-slate-500', key: 'traiPhieuVal' as const },
  ];

  const clientProfiles = useMemo(() => {
    const age = (year: number) =>
      `${new Date().getFullYear() - year} ${language === 'en' ? 'yrs' : 'tuổi'}`;
    return [
      {
        id: 'husband',
        name: client.husband.name,
        year: client.husband.birthYear,
        tag: `${age(client.husband.birthYear)} · ${wp.profiles.husband.tag}`,
        role: wp.profiles.husband.role,
        org: wp.profiles.husband.org,
        income: wp.profiles.husband.income,
        benefit: wp.profiles.husband.benefit,
        icon: ManOutlined,
      },
      {
        id: 'wife',
        name: client.wife.name,
        year: client.wife.birthYear,
        tag: `${age(client.wife.birthYear)} · ${wp.profiles.wife.tag}`,
        role: wp.profiles.wife.role,
        org: wp.profiles.wife.org,
        income: wp.profiles.wife.income,
        benefit: wp.profiles.wife.benefit,
        icon: WomanOutlined,
      },
      {
        id: 'child-0',
        name: client.children[0].name,
        year: client.children[0].birthYear,
        tag: `${age(client.children[0].birthYear)} · ${wp.profiles.child1.tag}`,
        role: wp.profiles.child1.role,
        org: wp.profiles.child1.org,
        icon: SmileOutlined,
      },
      {
        id: 'child-1',
        name: client.children[1].name,
        year: client.children[1].birthYear,
        tag: `${age(client.children[1].birthYear)} · ${wp.profiles.child2.tag}`,
        role: wp.profiles.child2.role,
        org: wp.profiles.child2.org,
        icon: SmileOutlined,
      },
    ];
  }, [wp, language]);

  return (
    <PageContainer title={false} header={{ title: null, breadcrumb: {} }}>
      <Row gutter={[24, 24]}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <div className="flex flex-col gap-6">
            {/* Household: financial capacity on top, members below, in one panel */}
            <Panel title={wp.header.title} subtitle={wp.header.subtitle}>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/50 border-b border-border/50">
                {stats.map((s) => (
                  <div key={s.key} className="px-4 sm:px-5 py-4 flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                      <s.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="mt-0.5 whitespace-nowrap">
                        <span
                          className={cn(
                            'text-lg font-semibold tracking-tight tabular-nums',
                            s.accent ? 'text-teal-600 dark:text-teal-400' : 'text-foreground',
                          )}
                        >
                          {s.value}
                        </span>{' '}
                        <span className="text-xs text-muted-foreground">{s.unit}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 mt-0.5">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2">
                {clientProfiles.map((p, i) => (
                  <li
                    key={p.id}
                    className={cn(
                      'px-4 sm:px-5 py-4 flex items-start gap-3 border-border/50',
                      i < clientProfiles.length - 1 && 'border-b',
                      i >= clientProfiles.length - 2 && 'sm:border-b-0',
                      i % 2 === 0 && 'sm:border-r',
                    )}
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <p.icon className="text-sm" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {p.name} <span className="font-normal text-muted-foreground">· {p.year}</span>
                        </p>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{p.tag}</span>
                      </div>
                      <p className="text-xs text-foreground/85 mt-0.5">{p.role}</p>
                      <p className="text-xs text-muted-foreground">{p.org}</p>
                      {(p.income || p.benefit) && (
                        <p className="text-[11px] mt-1.5">
                          {p.income && <span className="font-medium text-teal-700 dark:text-teal-400">{p.income}</span>}
                          {p.income && p.benefit && <span className="text-muted-foreground"> · </span>}
                          {p.benefit && <span className="text-muted-foreground">{p.benefit}</span>}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <FinancialRoadmap />
          </div>
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="flex flex-col gap-6">
            <Panel title={wp.benchmark.title}>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="px-4 sm:px-5 py-2.5 text-left font-medium">{wp.benchmark.metricCol}</th>
                    <th className="px-2 py-2.5 text-right font-medium whitespace-nowrap">VN-Index</th>
                    <th className="px-2 py-2.5 text-right font-medium">ORP</th>
                    <th className="pl-2 pr-4 sm:pr-5 py-2.5 text-right font-semibold text-teal-600 dark:text-teal-400">OCP</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkData.map((row) => (
                    <tr key={row.metric} className="border-b border-border/40 last:border-b-0">
                      <td className="px-4 sm:px-5 py-2.5 text-foreground">{row.metric}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-foreground/75 whitespace-nowrap">{row.market}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-foreground/75 whitespace-nowrap">{row.orp}</td>
                      <td className="pl-2 pr-4 sm:pr-5 py-2.5 text-right tabular-nums font-semibold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                        {row.ocp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel title={wp.radar.title}>
              <div className="w-full h-[260px] px-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="68%" data={performanceRadarData}>
                    <PolarGrid stroke="rgba(148, 163, 184, 0.3)" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 500 }}
                      className="text-foreground/80"
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={wp.radar.legends.ocp} dataKey="danhMuc" stroke="#00a0b0" fill="#00a0b0" fillOpacity={0.3} strokeWidth={2} />
                    <Radar name={wp.radar.legends.market} dataKey="thiTruong" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={1.5} />
                    <Radar
                      name={wp.radar.legends.bonds}
                      dataKey="traiPhieu"
                      stroke="#94a3b8"
                      fill="#94a3b8"
                      fillOpacity={0.12}
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        const item = active ? payload?.[0]?.payload : null;
                        if (!item) return null;
                        return (
                          <div className="bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-2.5 text-xs min-w-[180px]">
                            <div className="font-semibold text-foreground mb-1.5 pb-1 border-b border-border/50">{item.subject}</div>
                            <div className="flex flex-col gap-1">
                              {radarSeries.map((s, i) => (
                                <div key={s.key} className="flex items-center justify-between gap-3">
                                  <span className={cn('flex items-center gap-1.5 font-medium', s.text)}>
                                    <span className={cn('w-2 h-2 rounded-full', s.dot)} />
                                    {s.label}
                                  </span>
                                  <span className={i === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                                    {item[s.key]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 px-4 py-3 border-t border-border/50 text-[11px]">
                {radarSeries.map((s, i) => (
                  <span key={s.key} className={cn('flex items-center gap-1.5', i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground')}>
                    <span className={cn('w-2 h-2 rounded-full', s.dot)} />
                    {s.label}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
