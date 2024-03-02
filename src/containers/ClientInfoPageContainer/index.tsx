import React from 'react';
import { useParams } from 'react-router-dom';
import { useClient } from '../../hooks/clients';
import { ClientInfoPage } from '../../components/ClientInfoPage';

export const ClientInfoPageContainer = () => {
  const { id } = useParams();
  const { client, error, loading, onCreatePurchase, onDelete } = useClient(id);

  return (
    <>
      {error}
      <ClientInfoPage loading={loading} client={client} onCreatePurchase={onCreatePurchase} onDelete={onDelete} />
    </>
  );
};
