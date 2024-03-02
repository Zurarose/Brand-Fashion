import React from 'react';
import { ClientsPage } from '../../components/ClientsPage';
import { useClients } from '../../hooks/clients';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';

export const ClientsPageContainer = () => {
  const { clients, onSearch, onDelete, loading, onCreate, onCreatePurchase, error } = useClients();
  const navigate = useNavigate();

  const clientInfoRedirect = (id: string) => {
    navigate(routes.client(id));
  };

  return (
    <>
      {error}
      <ClientsPage
        clients={clients}
        onSearch={onSearch}
        onDelete={onDelete}
        loading={loading}
        onCreate={onCreate}
        onCreatePurchase={onCreatePurchase}
        clientInfoRedirect={clientInfoRedirect}
      />
    </>
  );
};
