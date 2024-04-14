import React from 'react';
import { useSettings } from '../../hooks/settings';
import { SettingsPage } from '../../components/SettingsPage';

export const SettingsPageContainer = () => {
  const { settings, error, loading, onSetConfig } = useSettings();
  return (
    <>
      {error}
      <SettingsPage config={settings} loading={loading} onSetConfig={onSetConfig} />
    </>
  );
};
