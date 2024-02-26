import { useMutation, useQuery } from '@apollo/client';
import {
  ClientQuery,
  ClientsResponseType,
  CreateClientMutation,
  CreateClientRequestType,
  CreateClientResponseType,
  CreatePurchaseMutation,
  CreatePurchaseRequestType,
  CreatePurchaseResponseType,
  DeleteClientMutation,
  DeleteClientRequestType,
  DeleteClientResponseType,
} from '../queries/client';
import { useViewerStore } from '../store/user';
import { useState } from 'react';
import { Client } from '../types/client';
import { COUNTRY_CODE } from '../constants/common';
import { message } from 'antd';

export const useClients = () => {
  const [loading, setLoading] = useState(true);
  const { viewer } = useViewerStore();
  const [messageApi, error] = message.useMessage();
  const [initClients, setInitClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  const [deleteClient] = useMutation<DeleteClientResponseType, DeleteClientRequestType>(DeleteClientMutation);

  const [createClient] = useMutation<CreateClientResponseType, CreateClientRequestType>(CreateClientMutation);

  const [createPurchase] = useMutation<CreatePurchaseResponseType, CreatePurchaseRequestType>(CreatePurchaseMutation);

  const { refetch } = useQuery<ClientsResponseType>(ClientQuery, {
    skip: !viewer,
    onCompleted: (data) => {
      parseClientData(data);
      setLoading(false);
    },
  });

  const onCreate = async (fields: CreateClientRequestType['fields']) => {
    try {
      setLoading(true);
      const { data, errors } = await createClient({
        variables: {
          fields: { ...fields, phone: `${COUNTRY_CODE}${fields.phone}` },
        },
      });
      if (data?.createClient?.client?.id) {
        const { data } = await refetch();
        parseClientData(data);
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

  const onCreatePurchase = async (fields: CreatePurchaseRequestType['fields']) => {
    try {
      setLoading(true);
      const { data, errors } = await createPurchase({
        variables: {
          fields: { ...fields, price: Number(fields.price), usedBonuses: Number(fields.usedBonuses) },
        },
      });
      if (data?.createPurchase?.purchase?.id) {
        const { data } = await refetch();
        parseClientData(data);
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

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { data, errors } = await deleteClient({ variables: { id: id } });
      if (data?.deleteClient?.client?.id) {
        const { data } = await refetch();
        parseClientData(data);
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

  const onSearch = (query: string) => {
    if (!query) return setFilteredClients(initClients);
    setFilteredClients(
      initClients?.filter(
        (item) => item?.fullName?.toLowerCase()?.includes(query?.toLowerCase()) || item?.id?.includes(query),
      ),
    );
  };

  const parseClientData = (data: ClientsResponseType) => {
    const clients = data?.clients?.edges?.map(
      (client) =>
        ({
          ...client.node,
          birthday: new Date(client.node?.birthday)?.toLocaleDateString('ru-RU'),
          id: client?.node?.phone?.slice(-4),
        }) as Client,
    );
    setInitClients(clients);
    setFilteredClients(clients);
  };

  return {
    loading,
    error,
    clients: filteredClients,
    onCreatePurchase,
    onSearch,
    onCreate,
    onDelete,
  };
};
