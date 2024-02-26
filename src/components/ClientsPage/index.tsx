import React from 'react';
import Search from 'antd/es/input/Search';
import { Descriptions, Flex } from 'antd';
import { ClientCard, ClientsListWrapper } from './styles';
import { Client } from '../../types/client';
import { LoadingScreen } from '../../ui-kit/loading';
import { CreateClientRequestType, CreatePurchaseRequestType } from '../../queries/client';
import { DeleteButton } from './DeleteButton';
import { NewClientButton } from './NewClientButton';
import { PurchaseButton } from './PurchaseButton';

export type ClientPageProps = {
  clients?: Client[];
  onSearch: (query: string) => void;
  onDelete: (id: string) => Promise<void>;
  onCreate: (fields: CreateClientRequestType['fields']) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  loading: boolean;
};

export const ClientsPage: React.FC<ClientPageProps> = ({
  clients,
  onSearch,
  onDelete,
  loading,
  onCreate,
  onCreatePurchase,
}) => {
  if (loading) return <LoadingScreen />;
  return (
    <>
      <NavBar onSearch={onSearch} onCreate={onCreate} />
      <ClientsList clients={clients} onDelete={onDelete} onCreatePurchase={onCreatePurchase} />
    </>
  );
};

type NavBarProps = Pick<ClientPageProps, 'onSearch' | 'onCreate'>;

const NavBar: React.FC<NavBarProps> = ({ onSearch, onCreate }) => {
  return (
    <Flex gap={12}>
      <Search placeholder="Input client name" onSearch={onSearch} allowClear size="large" />
      <NewClientButton onCreate={onCreate} />
    </Flex>
  );
};

type ClientsListProps = Pick<ClientPageProps, 'clients' | 'onDelete' | 'onCreatePurchase'>;

const ClientsList: React.FC<ClientsListProps> = ({ clients, onDelete, onCreatePurchase }) => {
  return (
    <ClientsListWrapper>
      {clients?.map((item) => (
        <ClientCard key={item?.objectId}>
          <Descriptions
            extra={
              <Flex gap={12} align="center">
                <PurchaseButton onCreatePurchase={onCreatePurchase} objectId={item?.objectId} />
                <DeleteButton name={item?.fullName?.toUpperCase()} objectId={item?.objectId} onDelete={onDelete} />
              </Flex>
            }
            column={6}
            size="small"
            title={item?.fullName?.toUpperCase()}>
            <Descriptions.Item label="ID">{item?.id}</Descriptions.Item>
            <Descriptions.Item label="Bonuses">{item?.bonuses}</Descriptions.Item>
            <Descriptions.Item label="Gifted Bonuses">{item?.giftedBonuses}</Descriptions.Item>
            <Descriptions.Item label="Bithday">{item?.birthday}</Descriptions.Item>
            <Descriptions.Item label="Phone">{item?.phone}</Descriptions.Item>
          </Descriptions>
        </ClientCard>
      ))}
    </ClientsListWrapper>
  );
};
