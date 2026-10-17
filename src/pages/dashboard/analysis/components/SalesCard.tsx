import { Column } from '@ant-design/plots';
import { Button, Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { formatNumber } from '@/utils/format';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
import { monthsInRange } from '../utils/utils';

export type TimeType = 'month' | 'quarter' | 'year';
const { RangePicker } = DatePicker;

const SalesCard = ({
  rangePickerValue,
  salesData,
  cashFlowData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerProps['value'];
  isActive: (key: TimeType) => string;
  salesData: DataItem[];
  cashFlowData: DataItem[];
  loading: boolean;
  handleRangePickerChange: RangePickerProps['onChange'];
  selectDate: (key: TimeType) => void;
}) => {
  const { styles } = useStyles();
  // Monthly figures (after optimization) scaled to the selected time range
  const months = monthsInRange(rangePickerValue);
  const scale = (data: DataItem[]) =>
    data.map((d) => ({ x: d.x, y: (d.y as number) * months }));
  const expenseData = scale(salesData);
  const flowData = scale(cashFlowData);
  const rankingListData = [...expenseData]
    .sort((a, b) => b.y - a.y)
    .map((d) => ({ title: d.x as string, total: d.y }));
  const totalExpense = expenseData.reduce((s, d) => s + d.y, 0);
  const periodLabel = months === 1 ? '1 tháng' : `${months} tháng`;

  return (
    <Card
      loading={loading}
      variant="borderless"
      styles={{
        body: {
          padding: loading ? 24 : 0,
        },
      }}
    >
      <Tabs
        className={styles.salesCard}
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <Button
                type="text"
                className={isActive('month')}
                onClick={() => selectDate('month')}
              >
                Tháng này
              </Button>
              <Button
                type="text"
                className={isActive('quarter')}
                onClick={() => selectDate('quarter')}
              >
                Quý này
              </Button>
              <Button
                type="text"
                className={isActive('year')}
                onClick={() => selectDate('year')}
              >
                Năm nay
              </Button>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              variant="filled"
              format="DD/MM/YYYY"
              style={{
                width: 256,
              }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{
          marginBottom: 24,
        }}
        items={[
          {
            key: 'expenses',
            label: 'Phân bổ chi tiêu',
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      data={expenseData}
                      xField="x"
                      yField="y"
                      paddingBottom={12}
                      axis={{
                        x: {
                          title: false,
                        },
                        y: {
                          title: false,
                          gridLineDash: null,
                          gridStroke: '#ccc',
                          labelFormatter: (v: number) => `${formatNumber(v / 1_000_000)} tr`,
                        },
                      }}
                      scale={{
                        x: { paddingInner: 0.4 },
                      }}
                      tooltip={{
                        name: `Chi tiêu (${periodLabel})`,
                        channel: 'y',
                        valueFormatter: (v: number) => `${formatNumber(v)} ₫`,
                      }}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${
                              i < 3 ? styles.rankingItemNumberActive : ''
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={styles.rankingItemTitle}
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <span>
                            {formatNumber(item.total)}
                            <span style={{ marginLeft: 8, opacity: 0.55 }}>
                              {formatNumber(Math.round((item.total / totalExpense) * 1000) / 10)}%
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            ),
          },
          {
            key: 'cashflow',
            label: 'Dòng tiền',
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      data={flowData}
                      xField="x"
                      yField="y"
                      paddingBottom={12}
                      axis={{
                        x: {
                          title: false,
                        },
                        y: {
                          title: false,
                          labelFormatter: (v: number) => `${formatNumber(v / 1_000_000)} tr`,
                        },
                      }}
                      scale={{
                        x: { paddingInner: 0.4 },
                      }}
                      tooltip={{
                        name: `Số tiền (${periodLabel})`,
                        channel: 'y',
                        valueFormatter: (v: number) => `${formatNumber(v)} ₫`,
                      }}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>Tổng hợp dòng tiền</h4>
                    <ul className={styles.rankingList}>
                      {flowData.map((item, i) => (
                        <li key={item.x as string}>
                          <span
                            className={`${
                              i < 2
                                ? styles.rankingItemNumberActive
                                : styles.rankingItemNumber
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={styles.rankingItemTitle}
                            title={item.x as string}
                          >
                            {item.x}
                          </span>
                          <span>{formatNumber(item.y)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            ),
          },
        ]}
      />
    </Card>
  );
};
export default SalesCard;
