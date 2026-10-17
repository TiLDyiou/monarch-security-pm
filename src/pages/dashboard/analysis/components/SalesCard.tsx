import { Column } from '@ant-design/plots';
import { Button, Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { formatNumber } from '@/utils/format';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
import { monthsInRange } from '../utils/utils';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { language, t } = useLanguage();
  const cardTexts = t.dashboard.analysis.salesCard;

  // Monthly figures (after optimization) scaled to the selected time range
  const months = monthsInRange(rangePickerValue);
  const scale = (data: DataItem[]) =>
    data.map((d) => ({ x: d.x, y: (d.y as number) * months }));

  const expenseData = scale(salesData);
  const flowData = scale(cashFlowData);

  const getExpenseLabel = (key: string) => cardTexts.expenseItems[key] || key;
  const getCashflowLabel = (key: string) => cardTexts.cashflowItems[key] || key;

  const rankingListData = [...expenseData]
    .sort((a, b) => b.y - a.y)
    .map((d) => ({
      rawTitle: d.x as string,
      title: getExpenseLabel(d.x as string),
      total: d.y,
    }));

  const totalExpense = expenseData.reduce((s, d) => s + d.y, 0);
  const periodLabel = months === 1 ? t.common.month : `${months} ${t.common.months}`;
  const millionUnit = language === 'en' ? 'M' : 'tr';

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
                {cardTexts.thisMonth}
              </Button>
              <Button
                type="text"
                className={isActive('quarter')}
                onClick={() => selectDate('quarter')}
              >
                {cardTexts.thisQuarter}
              </Button>
              <Button
                type="text"
                className={isActive('year')}
                onClick={() => selectDate('year')}
              >
                {cardTexts.thisYear}
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
            label: cardTexts.expensesTab,
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      data={expenseData.map((d) => ({
                        x: getExpenseLabel(d.x as string),
                        y: d.y,
                      }))}
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
                          labelFormatter: (v: number) => `${formatNumber(v / 1_000_000)} ${millionUnit}`,
                        },
                      }}
                      scale={{
                        x: { paddingInner: 0.4 },
                      }}
                      tooltip={{
                        name: `${cardTexts.expensesTooltip} (${periodLabel})`,
                        channel: 'y',
                        valueFormatter: (v: number) => `${formatNumber(v)} ${t.common.vnd}`,
                      }}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.rawTitle}>
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
            label: cardTexts.cashflowTab,
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      data={flowData.map((d) => ({
                        x: getCashflowLabel(d.x as string),
                        y: d.y,
                      }))}
                      xField="x"
                      yField="y"
                      paddingBottom={12}
                      axis={{
                        x: {
                          title: false,
                        },
                        y: {
                          title: false,
                          labelFormatter: (v: number) => `${formatNumber(v / 1_000_000)} ${millionUnit}`,
                        },
                      }}
                      scale={{
                        x: { paddingInner: 0.4 },
                      }}
                      tooltip={{
                        name: `${cardTexts.cashflowTooltip} (${periodLabel})`,
                        channel: 'y',
                        valueFormatter: (v: number) => `${formatNumber(v)} ${t.common.vnd}`,
                      }}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>{cardTexts.cashflowSummary}</h4>
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
                            title={getCashflowLabel(item.x as string)}
                          >
                            {getCashflowLabel(item.x as string)}
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
