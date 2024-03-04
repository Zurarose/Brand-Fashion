import { useQuery } from '@apollo/client';
import { StatsQuery, StatsQueryResponseType } from '../queries/stats';
import { useViewerStore } from '../store/user';
import { useState } from 'react';
import dayjs from 'dayjs';
import { SERVER_DATE_FORMAT } from '../constants/common';
import { message } from 'antd';
import { StatsState } from '../types/stats';

export const useStats = () => {
  const [messageApi, error] = message.useMessage();

  const { viewer } = useViewerStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsState>([]);
  const { refetch } = useQuery<StatsQueryResponseType>(StatsQuery, {
    skip: !viewer,
    defaultOptions: {
      variables: {
        where: {
          AND: [
            { date: { lessThanOrEqualTo: dayjs().endOf('year') } },
            { date: { greaterThanOrEqualTo: dayjs().startOf('year') } },
          ],
        },
      },
    },
    onCompleted: (data) => {
      parseStatsData(data);
      setLoading(false);
    },
  });

  const onSearch = async (startDate: Date, endDate: Date) => {
    try {
      setLoading(true);
      const { data } = await refetch({
        where: { AND: [{ date: { lessThanOrEqualTo: endDate } }, { date: { greaterThanOrEqualTo: startDate } }] },
      });
      if (data?.purchases?.edges?.length) {
        parseStatsData(data);
        return;
      }
      throw new Error('No data');
    } catch (error) {
      if (error instanceof Error)
        messageApi.open({
          type: 'error',
          content: error.message ? error.message : '',
        });
    } finally {
      setLoading(false);
    }
  };

  const parseStatsData = (data: StatsQueryResponseType) => {
    const statsData: Record<string, number> = {};
    data?.purchases?.edges?.forEach((purchuse) => {
      if (statsData[dayjs(purchuse?.node?.date, SERVER_DATE_FORMAT).format('MMMM')]) {
        statsData[dayjs(purchuse?.node?.date, SERVER_DATE_FORMAT).format('MMMM')] += Number(purchuse?.node?.price);
      } else {
        Object.assign(statsData, {
          [dayjs(purchuse?.node?.date, SERVER_DATE_FORMAT).format('MMMM')]: Number(purchuse?.node?.price),
        });
      }
    });
    const parsedStats = Object.keys(statsData).map((key) => {
      return {
        month: key,
        value: statsData[key],
      };
    });
    setStats(parsedStats);
    return;
  };

  return { loading, stats, onSearch, error };
};
