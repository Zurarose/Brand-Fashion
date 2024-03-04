import React, { useMemo, useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import { StyledPicker } from './styles';
import dayjs from 'dayjs';
import { Line, LineConfig } from '@ant-design/charts';
import { StatsState } from '../../types/stats';
import { CURRENCY_SYMBOL, LOCAL_DATE_FORMAT, MIN_GLOBAL_DATE } from '../../constants/common';
import theme from '../../ui-kit/theme';
type StatsPageProps = {
  loading: boolean;
  onSearch: (startDate: Date, endDate: Date) => Promise<void>;
  stats: StatsState;
};

export const StatsPage: React.FC<StatsPageProps> = ({ stats, onSearch }) => {
  const [dates, setDates] = useState({ min: dayjs().startOf('year'), max: dayjs().endOf('year') });

  const graphSetting: LineConfig = {
    data: stats,
    xField: 'month',
    yField: 'value',
    colorField: theme.palette.primary,
    style: {
      fill: theme.palette.primary,
      stroke: theme.palette.primary,
      lineWidth: 2,
      cursor: 'pointer',
    },
  };

  const totalSales = useMemo(() => stats.reduce((acc, curr) => acc + curr.value, 0).toFixed(2), [stats]);

  const handleSearch = async () => {
    await onSearch(dates.min.toDate(), dates.max.toDate());
  };

  const handleChange = (name: keyof typeof dates) => (value: dayjs.Dayjs | null) => {
    if (!value) return;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  const getDisabledDates = (current: dayjs.Dayjs) => {
    return (
      current.isBefore(dayjs(MIN_GLOBAL_DATE, LOCAL_DATE_FORMAT).format(LOCAL_DATE_FORMAT)) ||
      current.isAfter(dayjs().endOf('year'))
    );
  };

  return (
    <>
      <Flex vertical gap={12}>
        <Typography>Select date range below</Typography>
        <Flex gap={12}>
          <StyledPicker
            allowClear={false}
            disabledDate={getDisabledDates}
            value={dates.min}
            onChange={handleChange('min')}
            format={'MM-YYYY'}
            variant="outlined"
          />
          <StyledPicker
            allowClear={false}
            value={dates.max}
            onChange={handleChange('max')}
            format={'MM-YYYY'}
            variant="outlined"
          />
          <Button onClick={handleSearch} type="primary">
            Show
          </Button>
        </Flex>
        <Line {...graphSetting} />
        <Typography>
          Total sales price: {totalSales} {CURRENCY_SYMBOL}
        </Typography>
      </Flex>
    </>
  );
};
