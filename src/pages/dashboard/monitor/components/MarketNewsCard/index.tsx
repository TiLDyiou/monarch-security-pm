'use client';

import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  Button,
  Empty,
  Input,
  Pagination,
  Select,
  Skeleton,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  buildNewsIndex,
  fetchMarketNews,
  type MarketNewsItem,
  normalizeText,
  POPULAR_TICKERS,
  searchNews,
} from '@/pages/dashboard/services/marketNewsService';
import { useLanguage } from '@/i18n/LanguageContext';

const PAGE_SIZE = 5;

const MarketNewsCard: React.FC = () => {
  const { t } = useLanguage();
  const newsTexts = t.dashboard.monitor.news;

  const [selectedTicker, setSelectedTicker] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [news, setNews] = useState<MarketNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const formatNewsTime = (dateStr: string): string => {
    const d = dayjs(dateStr);
    if (!d.isValid()) return dateStr;
    const now = dayjs();
    const diffMinutes = Math.max(0, now.diff(d, 'minute'));
    if (diffMinutes < 1) return newsTexts.justNow;
    if (diffMinutes < 60) return `${diffMinutes} ${newsTexts.minutesAgo}`;
    const diffHours = now.diff(d, 'hour');
    if (diffHours < 24) return `${diffHours} ${newsTexts.hoursAgo}`;
    const diffDays = now.diff(d, 'day');
    if (diffDays === 1) return newsTexts.yesterday;
    if (diffDays < 7) return `${diffDays} ${newsTexts.daysAgo}`;
    return d.format('DD/MM/YYYY HH:mm');
  };

  // Only the latest request may update the list, so a slow answer for a previous ticker never overwrites the current one
  const requestId = useRef(0);

  const loadData = async (ticker: string, force = false) => {
    const id = ++requestId.current;
    setLoading(true);
    try {
      const items = await fetchMarketNews(ticker, { force });
      if (id !== requestId.current) return;
      setNews(items);
      setCurrentPage(1);
    } catch {
      // Handled via service fallback
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    loadData(selectedTicker);
  }, [selectedTicker]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(selectedTicker, true);
  };

  // Fields are normalised once per result set; typing only runs the ranked match
  const newsIndex = useMemo(() => buildNewsIndex(news), [news]);
  const deferredKeyword = useDeferredValue(searchKeyword);
  const filteredNews = useMemo(() => searchNews(newsIndex, deferredKeyword), [newsIndex, deferredKeyword]);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNews.slice(start, start + PAGE_SIZE);
  }, [filteredNews, currentPage]);

  return (
    <Card className="@container gap-0 pb-0 rounded-xl border border-border/60 bg-card text-card-foreground shadow-xs">
      {/* Header bar */}
      <CardHeader className="border-b px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight text-foreground">
            {newsTexts.title}
          </CardTitle>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ticker Selector */}
          <Select
            value={selectedTicker}
            onChange={(val) => setSelectedTicker(val)}
            className="w-full sm:w-64"
            popupMatchSelectWidth={false}
            size="middle"
            options={POPULAR_TICKERS.map((item) => ({
              label: item.code === 'ALL' ? newsTexts.broadMarket : `${item.code} - ${item.name}`,
              value: item.code,
            }))}
            showSearch
            filterOption={(input, option) =>
              normalizeText(String(option?.label ?? '')).includes(normalizeText(input))
            }
          />

          {/* Keyword Search */}
          <Input
            placeholder={newsTexts.searchPlaceholder}
            prefix={<Search className="size-3.5 text-muted-foreground mr-1" />}
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            allowClear
            size="middle"
            className="w-full sm:w-44"
          />

          {/* Refresh button */}
          <Tooltip title={newsTexts.refreshTooltip}>
            <Button
              icon={
                <RefreshCw
                  className={`size-3.5 ${refreshing ? 'animate-spin text-blue-600' : ''}`}
                />
              }
              onClick={handleRefresh}
              loading={refreshing}
              size="middle"
            />
          </Tooltip>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-0 py-0">
        {loading ? (
          <div className="space-y-4 p-5 sm:p-6">
            {[1, 2, 3].map((k) => (
              <div key={k} className="p-3 rounded-lg border border-border/40">
                <Skeleton active title={{ width: '65%' }} paragraph={{ rows: 2, width: ['100%', '80%'] }} />
              </div>
            ))}
          </div>
        ) : paginatedNews.length === 0 ? (
          <div className="py-12">
            <Empty description={newsTexts.emptyText} />
          </div>
        ) : (
          <ul className="divide-y divide-border/40 m-0 p-0 list-none">
            {paginatedNews.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 px-5 sm:px-6 py-4 transition-colors hover:bg-muted/15 @lg:flex-row @lg:items-start"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  {/* Source and Time only */}
                  <p className="text-xs text-muted-foreground m-0">
                    <span className="font-semibold text-foreground">{item.source}</span>
                    <span> · {formatNewsTime(item.publishDate)}</span>
                  </p>

                  {/* News Title */}
                  <h4 className="text-sm sm:text-base font-semibold text-foreground tracking-tight leading-snug m-0">
                    <a
                      href={item.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors inline-flex items-baseline gap-1"
                    >
                      <span>{item.title}</span>
                    </a>
                  </h4>

                  {/* News Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 m-0">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination footer */}
        {filteredNews.length > PAGE_SIZE && (
          <div className="flex justify-end p-4 border-t border-border/40 bg-card">
            <Pagination
              current={currentPage}
              total={filteredNews.length}
              pageSize={PAGE_SIZE}
              onChange={(page) => setCurrentPage(page)}
              size="small"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketNewsCard;
