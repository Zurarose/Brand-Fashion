import { useViewerStore } from '../store/user';
import { useMutation, useQuery } from '@apollo/client';
import {
  SetSettingsMutation,
  SettingsQuery,
  SettingsQueryRequsetType,
  SettingsQueryResponseType,
} from '../queries/settings';
import { useState } from 'react';
import { message } from 'antd';

export const useSettings = () => {
  const [messageApi, error] = message.useMessage();
  const { viewer } = useViewerStore();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<SettingsQueryResponseType['getConfig']>({
    GETTING_PERCENT_BONUSES: 0,
    GIFT_BONUSES_USER_BIRTHDAY: 0,
    LIMITED_BONUSES_TIMEOUT_DAYS: 0,
  });

  const [updateConfig] = useMutation<boolean, SettingsQueryRequsetType>(SetSettingsMutation);
  const { refetch } = useQuery<SettingsQueryResponseType>(SettingsQuery, {
    skip: !viewer,
    onCompleted: (data) => {
      setConfig(data?.getConfig);
      setLoading(false);
    },
  });

  const onSetConfig = async (fields: SettingsQueryRequsetType) => {
    try {
      setLoading(true);
      const { data, errors } = await updateConfig({
        variables: fields,
      });
      if (data) {
        const { data } = await refetch();
        setConfig(data?.getConfig);
        return;
      }
      throw new Error(errors?.[0]?.message);
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

  return {
    error,
    config,
    loading,
    onSetConfig,
  };
};
