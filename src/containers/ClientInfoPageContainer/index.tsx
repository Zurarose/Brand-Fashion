import React from 'react';
import { useParams } from 'react-router-dom';
import { useClient } from '../../hooks/clients';
import { ClientInfoPage } from '../../components/ClientInfoPage';
import { useSettingsStore } from '../../store/settings';

export const ClientInfoPageContainer = () => {
  const { id } = useParams();
  const { client, error, loading, onCreatePurchase, onDelete, onSetBonuses } = useClient(id);
  const { settings } = useSettingsStore();

  return (
    <>
      {error}
      <ClientInfoPage
        loading={loading}
        client={client}
        onCreatePurchase={onCreatePurchase}
        onDelete={onDelete}
        onSetBonuses={onSetBonuses}
        percentFromPriceAsBonuses={settings.MAX_BONUSES_PER_PURCHASE_PERCENT}
      />
    </>
  );
};
