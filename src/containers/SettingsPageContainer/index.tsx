import React from 'react';
import { useSettings } from '../../hooks/settings';
import { SettingsPage } from '../../components/SettingsPage';

export const SettingsPageContainer = () => {
  const { config, error, loading, onSetConfig } = useSettings();
  return (
    <>
      {error}
      <SettingsPage config={config} loading={loading} onSetConfig={onSetConfig} />
    </>
  );
};
