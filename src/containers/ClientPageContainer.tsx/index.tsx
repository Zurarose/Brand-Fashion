import React from 'react';
import { ClientsPage } from '../../components/ClientsPage';
import { useClients } from '../../hooks/clients';

export const ClientsPageContainer = () => {
  const { clients, onSearch, onDelete, loading, onCreate } = useClients();
  return (
    <ClientsPage clients={clients} onSearch={onSearch} onDelete={onDelete} loading={loading} onCreate={onCreate} />
  );
};
