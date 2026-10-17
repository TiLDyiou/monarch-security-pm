import { GridContent } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import IntroduceRow from './components/IntroduceRow';
import PageLoading from './components/PageLoading';
import ProportionSales from './components/ProportionSales';
import type { TimeType } from './components/SalesCard';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import { fakeChartData } from './service';
import useStyles from './style.style';
import { getTimeDistance } from './utils/utils';

type RangePickerValue = RangePickerProps['value'];
export type SalesType = 'assets' | 'capital' | 'cash' | 'portfolio';
const Analysis: FC = () => {
  const { styles } = useStyles();
  const [salesType, setSalesType] = useState<SalesType>('assets');
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    () => getTimeDistance('month'),
  );
  const { isLoading: loading, data } = useQuery({
    queryKey: ['dashboard-analysis'],
    queryFn: () => fakeChartData().then((res) => res.data),
  });
  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as Dayjs, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  let salesPieData: any;
  if (salesType === 'assets') {
    salesPieData = data?.salesTypeData;
  } else if (salesType === 'capital') {
    salesPieData = data?.salesTypeDataOnline;
  } else if (salesType === 'portfolio') {
    salesPieData = data?.salesTypeDataPortfolio;
  } else {
    salesPieData = data?.salesTypeDataOffline;
  }

  const handleChangeSalesType = (value: SalesType) => {
    setSalesType(value);
  };
  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow loading={loading} />
      </Suspense>

      <Suspense fallback={null}>
        <SalesCard
          rangePickerValue={rangePickerValue}
          salesData={data?.salesData || []}
          cashFlowData={data?.cashFlowData || []}
          isActive={isActive}
          handleRangePickerChange={handleRangePickerChange}
          loading={loading}
          selectDate={selectDate}
        />
      </Suspense>

      <Row
        gutter={[24, 24]}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={24}>
          <Suspense fallback={null}>
            <TopSearch
              loading={loading}
              searchData={data?.searchData || []}
            />
          </Suspense>
        </Col>
        <Col span={24}>
          <Suspense fallback={null}>
            <ProportionSales
              salesType={salesType}
              loading={loading}
              salesPieData={salesPieData || []}
              handleChangeSalesType={handleChangeSalesType}
            />
          </Suspense>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Analysis;
