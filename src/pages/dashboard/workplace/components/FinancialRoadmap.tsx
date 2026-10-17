import React from 'react';
import { Check, Pause } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineRail,
  TimelineTime,
  TimelineTitle,
} from '@/components/ui/timeline';
import { useLanguage } from '@/i18n/LanguageContext';
import { Panel } from './Panel';

export interface FinancialRoadmapProps {
  className?: string;
}

// Goal milestones on the @dashboardcn timeline: one line of copy and one line of figures per goal
export const FinancialRoadmap: React.FC<FinancialRoadmapProps> = ({ className }) => {
  const { t } = useLanguage();
  const rm = t.dashboard.workplace.roadmap;
  const { car, loanRecovery, house } = rm.steps;

  const goals = [
    {
      id: 'car',
      title: car.title,
      tag: rm.tags.car,
      time: car.duration,
      status: 'default' as const,
      marker: <Pause />,
      markerClassName: 'border-amber-400 text-amber-600',
      badgeClassName: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      description: car.recommendationText,
      figures: (
        <>
          <span>{rm.labels.need} <span className="text-foreground/80 font-medium">{car.needAdjusted}</span></span>
          <span aria-hidden="true">·</span>
          <span>{rm.labels.fund} <span className="text-amber-700 dark:text-amber-400 font-medium">{car.fundValue}</span></span>
          <span aria-hidden="true">·</span>
          <span>{car.fundPercent}</span>
        </>
      ),
    },
    {
      id: 'loan',
      title: loanRecovery.title,
      tag: rm.tags.loanRecovery,
      time: loanRecovery.duration,
      status: 'done' as const,
      marker: <Check />,
      badgeClassName: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
      description: loanRecovery.description,
      figures: (
        <>
          <span>
            <span className="text-sky-700 dark:text-sky-400 font-medium">{loanRecovery.recoveredValue}</span>{' '}
            {loanRecovery.recoveredLabel}
          </span>
        </>
      ),
    },
    {
      id: 'house',
      title: house.title,
      tag: rm.tags.house,
      time: house.duration,
      status: 'done' as const,
      marker: <Check />,
      badgeClassName: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
      description: (
        <>
          {house.outcomeTextPrefix}{' '}
          <strong className="font-semibold text-teal-700 dark:text-teal-400">{house.outcomeSurplus}</strong>
          {house.outcomeTextSuffix}
        </>
      ),
      figures: (
        <>
          <span>{rm.labels.need} <span className="text-foreground/80 font-medium">{house.needAdjusted}</span></span>
          <span aria-hidden="true">·</span>
          <span>{rm.labels.fund} <span className="text-teal-700 dark:text-teal-400 font-medium">{house.fundValue}</span></span>
          <span aria-hidden="true">·</span>
          <span>{house.fundPercent}</span>
        </>
      ),
    },
  ];

  return (
    <Panel title={rm.title} subtitle={rm.subtitle} className={className}>
      <div className="px-4 sm:px-5 py-4">
        <Timeline>
          {goals.map((goal) => (
            <TimelineItem key={goal.id} status={goal.status}>
              <TimelineRail>
                <TimelineMarker className={goal.markerClassName}>{goal.marker}</TimelineMarker>
                <TimelineConnector />
              </TimelineRail>
              <TimelineContent className="gap-1.5">
                <TimelineHeader>
                  <TimelineTitle>{goal.title}</TimelineTitle>
                  <Badge variant="secondary" className={`rounded-md px-1.5 py-0 text-[11px] font-medium ${goal.badgeClassName}`}>
                    {goal.tag}
                  </Badge>
                  <TimelineTime>{goal.time}</TimelineTime>
                </TimelineHeader>
                <TimelineDescription className="text-xs leading-relaxed">{goal.description}</TimelineDescription>
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tabular-nums">
                  {goal.figures}
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Panel>
  );
};

export default FinancialRoadmap;
