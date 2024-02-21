import { useMutation, useQuery } from '@apollo/client';
import {
  ClientQuery,
  ClientsResponseType,
  CreateClientMutation,
  CreateClientRequestType,
  CreateClientResponseType,
  DeleteClientMutation,
  DeleteClientRequestType,
  DeleteClientResponseType,
} from '../queries/client';
import { useViewerStore } from '../store/user';
import { useState } from 'react';
import { Client } from '../types/client';

export const useClients = () => {
  const [loading, setLoading] = useState(true);
  const { viewer } = useViewerStore();
  const [initClients, setInitClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  const [deleteClient] = useMutation<DeleteClientResponseType, DeleteClientRequestType>(DeleteClientMutation);

  const [createClient] = useMutation<CreateClientResponseType, CreateClientRequestType>(CreateClientMutation);

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
      console.log({ fields });
      const { data } = await createClient({
        variables: {
          fields: fields,
        },
      });
      if (data?.createClient?.client?.id) {
        const { data } = await refetch();
        parseClientData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await deleteClient({ variables: { id: id } });
      if (data?.deleteClient?.client?.id) {
        const { data } = await refetch();
        parseClientData(data);
      }
    } catch (error) {
      console.log(error);
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
    clients: filteredClients,
    onSearch,
    onCreate,
    onDelete,
  };
};
