import { GridContent } from '@ant-design/pro-components';
import { Col, Row, Skeleton } from 'antd';
import { type FC, lazy, Suspense } from 'react';
import { Card as ShadcnCard } from '@/components/ui/card';
import MarketNewsCard from './components/MarketNewsCard';
import useStyles from './style.style';

const TradingViewChart = lazy(() => import('./components/TradingViewChart'));

const Monitor: FC = () => {
  const { styles } = useStyles();

  return (
    <GridContent>
      {/* Shift up to eliminate unnecessary top spacing and maximize vertical viewport */}
      <div className="-mt-3 sm:-mt-5">
        <Row gutter={[20, 16]}>
          {/* ── 1. Hero: Realtime Trading Terminal ── */}
          <Col span={24}>
            <ShadcnCard className="rounded-xl border border-border/60 bg-card text-card-foreground shadow-xs overflow-hidden p-2 sm:p-3">
              <div className={styles.chartWrapper}>
                <Suspense
                  fallback={
                    <Skeleton.Node
                      active
                      style={{ width: '100%', height: 480 }}
                    />
                  }
                >
                  <TradingViewChart />
                </Suspense>
              </div>
            </ShadcnCard>
          </Col>

          {/* ── 2. Cập nhật tin tức thị trường (vnstockjs) ── */}
          <Col span={24}>
            <MarketNewsCard />
          </Col>
        </Row>
      </div>
    </GridContent>
  );
};

export default Monitor;
