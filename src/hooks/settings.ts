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
import { useSettingsStore } from '../store/settings';

export const useSettings = () => {
  const { setSettings, settings } = useSettingsStore();
  const [messageApi, error] = message.useMessage();
  const { viewer } = useViewerStore();
  const [loading, setLoading] = useState(true);

  const [updateConfig] = useMutation<boolean, SettingsQueryRequsetType>(SetSettingsMutation);
  const { refetch } = useQuery<SettingsQueryResponseType>(SettingsQuery, {
    skip: !viewer,
    onCompleted: (data) => {
      setSettings(data?.getConfig);
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
        setSettings(data?.getConfig);
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
    settings,
    loading,
    onSetConfig,
  };
};
