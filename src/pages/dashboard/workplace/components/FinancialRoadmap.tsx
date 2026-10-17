'use client';

import React from 'react';
import {
  Checklist1,
  type OnboardingStep,
} from '@/components/dashboardblocks/checklist';
import { formatNumber } from '@/utils/format';
import { inflation, surplusAfterHouse } from '../../mock/client';
import { Info, Sparkles } from 'lucide-react';

export interface FinancialRoadmapProps {
  className?: string;
}

export const FinancialRoadmap: React.FC<FinancialRoadmapProps> = ({ className }) => {
  const financialSteps: OnboardingStep[] = [
    {
      id: 'car',
      title: 'Mua xe hơi phục vụ gia đình',
      duration: 'Mốc 3 năm',
      state: 'skipped',
      badge: 'Chưa khả thi · Khuyến nghị tạm hoãn',
      description: 'Để tiện đưa đón con đi học và sinh hoạt cuối tuần.',
      extraDetails: (
        <div className="mt-3.5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3.5 px-4 rounded-lg bg-muted/30 border border-border/50 text-base">
            <div>
              <span className="text-muted-foreground block text-sm font-medium mb-1">
                Nhu cầu vốn điều chỉnh lạm phát
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-foreground tabular-nums">912,93 triệu ₫</span>
                <span className="text-sm text-muted-foreground">gốc 800 triệu ₫</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-sm font-medium mb-1">
                Giá trị quỹ dự phóng tại năm thứ 3
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">723,80 triệu ₫</span>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-semibold">Đạt 79,3% · Thiếu 189,13 triệu ₫</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-muted dark:bg-muted/50 h-2.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: '79.3%' }} />
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-base text-amber-900 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
            <span className="font-semibold shrink-0 text-amber-800 dark:text-amber-300">Khuyến nghị chiến lược:</span>
            <span>
              Tạm hoãn mục tiêu mua xe để không rút 723,80 triệu ₫ ra khỏi quỹ, bảo toàn toàn bộ dòng vốn tiếp tục sinh lãi kép cho mục tiêu an cư dài hạn.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'loan_recovery',
      title: 'Thu hồi nợ cá nhân cho mượn',
      duration: 'Mốc 5 năm',
      state: 'done',
      badge: 'Dòng tiền vào · Bổ sung tái đầu tư',
      description:
        'Thu hồi toàn bộ 100,00 triệu ₫ tiền gốc cho mượn đúng hạn ở tháng thứ 60 để tăng quy mô quỹ đầu tư.',
      extraDetails: (
        <div className="mt-3.5 p-3.5 rounded-lg bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 text-base flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-muted-foreground block text-sm font-medium">Dòng tiền gốc thu hồi đúng hạn</span>
            <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">+100,00 triệu ₫</span>
          </div>
          <div className="sm:max-w-[65%] text-muted-foreground text-base leading-relaxed">
            Toàn bộ 100 triệu ₫ được nạp trực tiếp vào quỹ đầu tư OCP, gia tăng quy mô tài sản sinh lời ngay trước giai đoạn tăng tốc 5 năm cuối.
          </div>
        </div>
      ),
    },
    {
      id: 'house',
      title: 'Mua nhà đất khu vực Quận 2, Quận 9 cũ',
      duration: 'Mốc 10 năm',
      state: 'done',
      badge: 'Khả thi vượt trội · Vượt 153% nhu cầu',
      description:
        'Mục tiêu an cư dài hạn gần chỗ làm của hai vợ chồng và trường học của hai con.',
      extraDetails: (
        <div className="mt-3.5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3.5 px-4 rounded-lg bg-muted/30 border border-border/50 text-base">
            <div>
              <span className="text-muted-foreground block text-sm font-medium mb-1">
                Nhu cầu vốn điều chỉnh lạm phát
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-foreground tabular-nums">5.357,74 triệu ₫</span>
                <span className="text-sm text-muted-foreground">gốc 3.450 triệu ₫</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-sm font-medium mb-1">
                Giá trị quỹ dự phóng tại năm thứ 10
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400 tabular-nums">8.199,80 triệu ₫</span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">Đạt 153,0% · Dôi dư vượt trội</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-muted dark:bg-muted/50 h-2.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-700" style={{ width: '100%' }} />
          </div>

          <div className="p-3.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 text-base text-teal-950 dark:text-teal-200 flex items-start gap-2.5 leading-relaxed">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-teal-900 dark:text-teal-100">Kết quả hoạch định:</span>{' '}
              Cán đích vượt mức với thặng dư dôi dư <strong className="font-bold text-teal-700 dark:text-teal-300">+{formatNumber(surplusAfterHouse)} triệu ₫</strong>. Gia đình sở hữu trọn vẹn nhà đất an cư mà không cần vay nợ, đồng thời giữ được quỹ tài sản đệm cho tương lai.
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Checklist1
      className={className}
      defaultExpandedMode="none"
      title="Mục tiêu tài chính & Đánh giá tính khả thi"
      description={`Tỷ lệ lạm phát giả định ${formatNumber(inflation)}%/năm`}
      steps={financialSteps}
      headerBanner={
        <div className="mt-4 p-4 rounded-lg bg-teal-50/60 dark:bg-teal-950/25 border border-teal-200/60 dark:border-teal-900/40 flex items-start gap-3 text-base text-teal-950 dark:text-teal-200 leading-relaxed">
          <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-teal-900 dark:text-teal-100">
              Cơ chế quỹ tích lũy liên tục:
            </span>{' '}
            Toàn bộ kế hoạch vận hành trên cùng một quỹ đầu tư tăng trưởng liên tục. Quyết định không rút vốn ở các mốc ngắn hạn giúp bảo toàn trọn vẹn sức mạnh lãi kép để hiện thực hóa mục tiêu an cư lớn nhất.
          </div>
        </div>
      }
    />
  );
};
