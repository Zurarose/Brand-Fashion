import { useMutation, useQuery } from '@apollo/client';
import {
  ClientPurchasesQuery,
  ClientPurchasesResponseType,
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
import { ClientT } from '../types/client';
import { COUNTRY_CODE, LOCAL_DATE_FORMAT, SERVER_DATE_FORMAT } from '../constants/common';
import { message } from 'antd';
import dayjs from 'dayjs';

export const useClientActions = () => {
  const [messageApi, error] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [createClient] = useMutation<CreateClientResponseType, CreateClientRequestType>(CreateClientMutation);
  const [createPurchase] = useMutation<CreatePurchaseResponseType, CreatePurchaseRequestType>(CreatePurchaseMutation);
  const [deleteClient] = useMutation<DeleteClientResponseType, DeleteClientRequestType>(DeleteClientMutation);

  const onCreatePurchase = async (fields: CreatePurchaseRequestType['fields'], onSuccess?: () => Promise<void>) => {
    try {
      setLoading(true);
      const { data, errors } = await createPurchase({
        variables: {
          fields: { ...fields, price: Number(fields.price), usedBonuses: Number(fields.usedBonuses) },
        },
      });
      if (data?.createPurchase?.purchasa?.id) {
        onSuccess?.();
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

  const onDelete = async (id: string, onSuccess?: () => Promise<void>) => {
    try {
      setLoading(true);
      const { data, errors } = await deleteClient({ variables: { id: id } });
      if (data?.deleteClient?.client?.id) {
        onSuccess?.();
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

  const onCreate = async (fields: CreateClientRequestType['fields'], onSuccess?: () => Promise<void>) => {
    try {
      setLoading(true);
      const { data, errors } = await createClient({
        variables: {
          fields: { ...fields, phone: `${COUNTRY_CODE}${fields.phone}` },
        },
      });
      if (data?.createClient?.client?.id) {
        onSuccess?.();
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
    onDelete,
    onCreatePurchase,
    loading,
    onCreate,
  };
};

export const useClients = () => {
  const [loading, setLoading] = useState(true);
  const { viewer } = useViewerStore();
  const [initClients, setInitClients] = useState<ClientT[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientT[]>([]);
  const { error, loading: loadingAction, onCreate, onCreatePurchase, onDelete } = useClientActions();

  const { refetch } = useQuery<ClientsResponseType>(ClientQuery, {
    skip: !viewer,
    onCompleted: (data) => {
      parseClientsData(data);
      setLoading(false);
    },
  });

  const onSuccess = async () => {
    const { data } = await refetch();
    parseClientsData(data);
  };

  const onCreateClient = async (fields: CreateClientRequestType['fields']) => {
    onCreate(fields, onSuccess);
  };

  const onDeleteClient = async (id: string) => {
    onDelete(id, onSuccess);
  };

  const onCreateClientPurschuse = async (fields: CreatePurchaseRequestType['fields']) => {
    onCreatePurchase(fields, onSuccess);
  };

  const onSearch = (query: string) => {
    if (!query) return setFilteredClients(initClients);
    setFilteredClients(
      initClients?.filter(
        (item) => item?.fullName?.toLowerCase()?.includes(query?.toLowerCase()) || item?.id?.includes(query),
      ),
    );
  };

  const parseClientsData = (data: ClientsResponseType) => {
    const clients = data?.clients?.edges
      ?.map(
        (client) =>
          ({
            ...client.node,
            id: client?.node?.phone?.slice(-4),
            birthday: dayjs(client?.node.birthday, SERVER_DATE_FORMAT).format(LOCAL_DATE_FORMAT),
          }) as ClientT,
      )
      .sort(compareBirthdays);
    setInitClients(clients);
    setFilteredClients(clients);
  };

  return {
    error,
    onSearch,
    loading: loading || loadingAction,
    clients: filteredClients,
    onCreatePurchase: onCreateClientPurschuse,
    onCreate: onCreateClient,
    onDelete: onDeleteClient,
  };
};

// Function to compare birthdays
const compareBirthdays = (clientA: ClientT, clientB: ClientT): number => {
  const today = dayjs();
  const birthdayA = dayjs(clientA.birthday, LOCAL_DATE_FORMAT).set('hours', 0).set('year', today.year());
  const birthdayB = dayjs(clientB.birthday, LOCAL_DATE_FORMAT).set('hours', 0).set('year', today.year());
  const diffA = Math.abs(today.diff(birthdayA, 'day'));
  const diffB = Math.abs(today.diff(birthdayB, 'day'));
  return diffA - diffB;
};
export const useClient = (clientId?: string) => {
  const { viewer } = useViewerStore();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<ClientT | undefined>(undefined);
  const { onCreatePurchase, onDelete, error } = useClientActions();

  const { refetch } = useQuery<ClientPurchasesResponseType>(ClientPurchasesQuery, {
    variables: { id: clientId },
    skip: !clientId || !viewer,
    onCompleted: (data) => {
      parseClientData(data);
      setLoading(false);
    },
  });

  const onSuccess = async () => {
    const { data } = await refetch();
    parseClientData(data);
  };

  const onDeleteClient = async (id: string) => {
    onDelete(id, onSuccess);
  };

  const onCreateClientPurschuse = async (fields: CreatePurchaseRequestType['fields']) => {
    onCreatePurchase(fields, onSuccess);
  };

  const parseClientData = (data: ClientPurchasesResponseType) => {
    const client = {
      ...data?.client,
      birthday: dayjs(data?.client.birthday, SERVER_DATE_FORMAT).format(LOCAL_DATE_FORMAT),
      id: data?.client?.phone?.slice(-4),
    };
    setClient(client);
    return;
  };

  return { loading, error, client, onDelete: onDeleteClient, onCreatePurchase: onCreateClientPurschuse };
};
