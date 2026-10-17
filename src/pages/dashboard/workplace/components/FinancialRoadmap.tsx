'use client';

import React, { useMemo } from 'react';
import {
  Checklist1,
  type OnboardingStep,
} from '@/components/dashboardblocks/checklist';
import { formatNumber } from '@/utils/format';
import { inflation, surplusAfterHouse } from '../../mock/client';
import { Info, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface FinancialRoadmapProps {
  className?: string;
}

export const FinancialRoadmap: React.FC<FinancialRoadmapProps> = ({ className }) => {
  const { t } = useLanguage();
  const rm = t.dashboard.workplace.roadmap;

  const financialSteps: OnboardingStep[] = useMemo(() => [
    {
      id: 'car',
      title: rm.steps.car.title,
      duration: rm.steps.car.duration,
      state: 'skipped',
      badge: rm.steps.car.badge,
      description: rm.steps.car.description,
      extraDetails: (
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs font-medium mb-1">
                {rm.steps.car.needLabel}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-foreground tabular-nums">
                  {rm.steps.car.needAdjusted}
                </span>
                <span className="text-xs text-muted-foreground">
                  {rm.steps.car.needOriginal}
                </span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs font-medium mb-1">
                {rm.steps.car.fundLabel}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                  {rm.steps.car.fundValue}
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {rm.steps.car.fundPercent}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-muted dark:bg-muted/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: '79.3%' }} />
          </div>

          <div className="text-xs text-muted-foreground flex items-start gap-1.5 leading-relaxed">
            <span className="font-semibold shrink-0 text-amber-800 dark:text-amber-300">
              {rm.steps.car.recommendationTitle}
            </span>
            <span>
              {rm.steps.car.recommendationText}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'loan_recovery',
      title: rm.steps.loanRecovery.title,
      duration: rm.steps.loanRecovery.duration,
      state: 'done',
      badge: rm.steps.loanRecovery.badge,
      description: rm.steps.loanRecovery.description,
      extraDetails: (
        <div className="mt-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-muted-foreground block text-xs font-medium">
              {rm.steps.loanRecovery.recoveredLabel}
            </span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {rm.steps.loanRecovery.recoveredValue}
            </span>
          </div>
          <div className="sm:max-w-[65%] text-muted-foreground text-xs leading-relaxed">
            {rm.steps.loanRecovery.detailsText}
          </div>
        </div>
      ),
    },
    {
      id: 'house',
      title: rm.steps.house.title,
      duration: rm.steps.house.duration,
      state: 'done',
      badge: rm.steps.house.badge,
      description: rm.steps.house.description,
      extraDetails: (
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs font-medium mb-1">
                {rm.steps.house.needLabel}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-foreground tabular-nums">
                  {rm.steps.house.needAdjusted}
                </span>
                <span className="text-xs text-muted-foreground">
                  {rm.steps.house.needOriginal}
                </span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs font-medium mb-1">
                {rm.steps.house.fundLabel}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                  {rm.steps.house.fundValue}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {rm.steps.house.fundPercent}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-muted dark:bg-muted/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-700" style={{ width: '100%' }} />
          </div>

          <div className="text-xs text-muted-foreground flex items-start gap-1.5 leading-relaxed">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-px" />
            <div>
              <span className="font-semibold text-teal-900 dark:text-teal-100">
                {rm.steps.house.outcomeTitle}
              </span>{' '}
              {rm.steps.house.outcomeTextPrefix}{' '}
              <strong className="font-bold text-teal-700 dark:text-teal-300">
                {rm.steps.house.outcomeSurplus}
              </strong>
              {rm.steps.house.outcomeTextSuffix}
            </div>
          </div>
        </div>
      ),
    },
  ], [rm]);

  return (
    <Checklist1
      className={className}
      defaultExpandedMode="none"
      title={rm.title}
      description={`${rm.subtitle}`}
      steps={financialSteps}
      headerBanner={
        <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
          <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-px" />
          <div>
            <span className="font-medium text-foreground">
              {rm.bannerTitle}
            </span>{' '}
            {rm.bannerDesc}
          </div>
        </div>
      }
    />
  );
};

export default FinancialRoadmap;
