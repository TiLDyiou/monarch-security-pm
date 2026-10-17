'use client';

import * as React from 'react';
import { Check, ChevronDownIcon, Clock, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

export type StepState = 'done' | 'current' | 'todo' | 'skipped';

export interface StepStateDetail {
  label: string;
  text: string;
  bg?: string;
}

export const stepStateConfig: Record<StepState, StepStateDetail> = {
  done: {
    label: 'Khả thi · Thực thi',
    text: 'text-emerald-700 dark:text-emerald-400 font-semibold',
  },
  current: {
    label: 'Mục tiêu trọng tâm',
    text: 'text-teal-700 dark:text-teal-400 font-semibold',
  },
  skipped: {
    label: 'Chưa khả thi · Tạm hoãn',
    text: 'text-amber-700 dark:text-amber-400 font-semibold',
  },
  todo: {
    label: 'Dự kiến tương lai',
    text: 'text-muted-foreground',
  },
};

export const StepIndicator: React.FC<{
  index: number;
  state: StepState;
  className?: string;
}> = ({ index, state, className }) => {
  if (state === 'done') {
    return (
      <div
        className={cn(
          'size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs',
          className,
        )}
      >
        <Check className="size-4 stroke-[2.5]" />
      </div>
    );
  }

  if (state === 'skipped') {
    return (
      <div
        className={cn(
          'size-7 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-400 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold',
          className,
        )}
      >
        <Minus className="size-3.5 stroke-[2.5]" />
      </div>
    );
  }

  if (state === 'current') {
    return (
      <div
        className={cn(
          'size-7 rounded-full border-2 border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs',
          className,
        )}
      >
        {index}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'size-7 rounded-full border border-border bg-muted/30 text-muted-foreground flex items-center justify-center shrink-0 text-xs font-medium',
        className,
      )}
    >
      {index}
    </div>
  );
};

export interface ChecklistProgress {
  done: number;
  skipped: number;
  total: number;
  percentage: number;
}

export function getChecklistProgress(steps: OnboardingStep[]): ChecklistProgress {
  const done = steps.filter((s) => s.state === 'done').length;
  const skipped = steps.filter((s) => s.state === 'skipped').length;
  const total = steps.length;
  // Progress in financial roadmap context measures milestone resolution/readiness
  const percentage = total > 0 ? Math.round(((done + skipped) / total) * 100) : 0;
  return { done, skipped, total, percentage };
}

export function getNextStep(steps: OnboardingStep[]): OnboardingStep | undefined {
  return steps.find((s) => s.state === 'current') ?? steps.find((s) => s.state === 'todo');
}

export function skipStep(steps: OnboardingStep[], id: string): OnboardingStep[] {
  return steps.map((s) => (s.id === id ? { ...s, state: 'skipped' as StepState } : s));
}

export interface OnboardingStep {
  action?: string;
  description: string;
  duration?: string;
  id: string;
  optional?: boolean;
  state: StepState;
  title: string;
  badge?: string;
  extraDetails?: React.ReactNode;
}

export interface Checklist1Props {
  onAction?: (id: string) => void;
  onSkip?: (id: string) => void;
  steps: OnboardingStep[];
  title: string;
  description?: React.ReactNode;
  headerBanner?: React.ReactNode;
  extraFooter?: React.ReactNode;
  className?: string;
  defaultExpandedMode?: 'all' | 'none' | 'first';
}

export const Checklist1: React.FC<Checklist1Props> = (props) => {
  const {
    onAction,
    onSkip,
    title,
    description,
    headerBanner,
    extraFooter,
    className,
    defaultExpandedMode = 'none',
  } = props;
  const { t } = useLanguage();
  const stateLabels = t.dashboard.workplace.roadmap.states;
  const id = React.useId();
  const [steps, setSteps] = React.useState(props.steps);
  const [expanded, setExpanded] = React.useState<Set<string>>(() => {
    if (defaultExpandedMode === 'all') {
      return new Set(props.steps.map((s) => s.id));
    }
    if (defaultExpandedMode === 'first') {
      const next = getNextStep(props.steps);
      return new Set(next ? [next.id] : []);
    }
    return new Set<string>();
  });
  const [announcement, setAnnouncement] = React.useState('');
  const progress = getChecklistProgress(steps);

  const toggle = (stepId: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const skip = (step: OnboardingStep) => {
    const nextSteps = skipStep(steps, step.id);
    const next = getNextStep(nextSteps);
    setSteps(nextSteps);
    setExpanded((current) => {
      const updated = new Set(current);
      updated.delete(step.id);
      if (next) updated.add(next.id);
      return updated;
    });
    setAnnouncement(
      next ? `Tạm hoãn ${step.title}. Tiếp theo: ${next.title}` : `Tạm hoãn ${step.title}`,
    );
    onSkip?.(step.id);
  };

  return (
    <Card className={cn('@container gap-0 pb-0 border border-border/60 shadow-xs bg-card overflow-hidden', className)}>
      <CardHeader className="border-b border-border/50 p-5 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-bold text-foreground tracking-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              {description ?? (
                <>
                  {t.dashboard.workplace.roadmap.progressSummary.doneFormat(progress.done, progress.total)}
                  {progress.skipped > 0 && t.dashboard.workplace.roadmap.progressSummary.skippedFormat(progress.skipped)}
                </>
              )}
            </CardDescription>
          </div>
        </div>
        {headerBanner}
      </CardHeader>

      <CardContent className="px-0 py-0">
        <p role="status" className="sr-only">
          {announcement}
        </p>
        <ol>
          {steps.map((step, index) => {
            const baseConfig = stepStateConfig[step.state] || stepStateConfig.todo;
            const config = {
              ...baseConfig,
              label: stateLabels[step.state] || baseConfig.label,
            };
            const isOpen = expanded.has(step.id);
            const panelId = `${id}-${step.id}`;
            return (
              <li key={step.id} className="border-b border-border/50 last:border-b-0">
                <button
                  type="button"
                  aria-controls={panelId}
                  aria-current={step.state === 'current' ? 'step' : undefined}
                  aria-expanded={isOpen}
                  onClick={() => toggle(step.id)}
                  className="hover:bg-muted/40 focus-visible:ring-ring/50 flex w-full items-center gap-3.5 px-5 sm:px-6 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset transition-colors"
                >
                  <StepIndicator index={index + 1} state={step.state} />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span
                      className={cn(
                        'text-lg font-semibold tracking-tight',
                        step.state === 'skipped'
                          ? 'text-foreground/90'
                          : step.state === 'current'
                          ? 'text-teal-700 dark:text-teal-400 font-bold'
                          : 'text-foreground',
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="text-muted-foreground text-sm sm:text-base flex items-center flex-wrap gap-x-2 gap-y-0.5">
                      <span className={config.text}>{step.badge ?? config.label}</span>
                      {step.duration && <span>· {step.duration}</span>}
                    </span>
                  </span>
                  <ChevronDownIcon
                    aria-hidden
                    className={cn(
                      'text-muted-foreground size-4 shrink-0 transition-transform motion-reduce:transition-none',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                <div id={panelId} hidden={!isOpen} className="px-5 sm:px-6 pb-4 pt-1 sm:pl-16">
                  <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>
                  {step.extraDetails}
                  {(step.action || step.optional) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.action && (
                        <Button
                          size="sm"
                          variant={step.state === 'current' ? 'default' : 'outline'}
                          onClick={() => onAction?.(step.id)}
                          className={cn(
                            'text-xs font-medium h-8',
                            step.state === 'current' && 'bg-teal-600 hover:bg-teal-700 text-white',
                          )}
                        >
                          {step.action}
                        </Button>
                      )}
                      {step.optional && step.state !== 'skipped' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => skip(step)}
                          aria-label={`Tạm hoãn ${step.title}`}
                          className="text-xs font-medium h-8 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                        >
                          Tạm hoãn
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>

      {extraFooter}
    </Card>
  );
};
