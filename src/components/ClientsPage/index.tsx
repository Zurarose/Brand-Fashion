import React from 'react';
import Search from 'antd/es/input/Search';
import { Button, Descriptions, Flex } from 'antd';
import { ClientCard, ClientsListWrapper } from './styles';
import { ClientT } from '../../types/client';
import { LoadingScreen } from '../../ui-kit/loading';
import { CreateClientRequestType, CreatePurchaseRequestType } from '../../queries/client';
import { DeleteButton } from '../ClientActions/DeleteButton';
import { NewClientButton } from '../ClientActions/NewClientButton';
import { PurchaseButton } from '../ClientActions/PurchaseButton';
import { BarsOutlined, CrownOutlined } from '@ant-design/icons';

export type ClientPageProps = {
  clients?: ClientT[];
  onSearch: (query: string) => void;
  onDelete: (id: string) => Promise<void>;
  onCreate: (fields: CreateClientRequestType['fields']) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  loading: boolean;
  clientInfoRedirect: (id: string) => void;
};

export const ClientsPage: React.FC<ClientPageProps> = ({
  clients,
  onSearch,
  onDelete,
  loading,
  onCreate,
  onCreatePurchase,
  clientInfoRedirect,
}) => {
  if (loading) return <LoadingScreen />;
  return (
    <>
      <NavBar onSearch={onSearch} onCreate={onCreate} />
      <ClientsList
        clients={clients}
        onDelete={onDelete}
        onCreatePurchase={onCreatePurchase}
        clientInfoRedirect={clientInfoRedirect}
      />
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

type ClientsListProps = Pick<ClientPageProps, 'clients' | 'onDelete' | 'onCreatePurchase' | 'clientInfoRedirect'>;

const ClientsList: React.FC<ClientsListProps> = ({ clients, onDelete, onCreatePurchase, clientInfoRedirect }) => {
  const handleRedirect = (id: string) => () => {
    clientInfoRedirect(id);
  };
  const currentDay = `${new Date().getDate()}/${new Date().getMonth()}`;

  return (
    <ClientsListWrapper>
      {clients?.map((item) => {
        const userBithday = `${new Date(item?.birthday).getDate()}/${new Date(item?.birthday).getMonth()}`;
        const isBirthday = userBithday === currentDay;
        console.log(currentDay, userBithday, item?.birthday);
        return (
          <ClientCard key={item?.objectId}>
            <Descriptions
              extra={
                <Flex gap={12} align="center">
                  <PurchaseButton onCreatePurchase={onCreatePurchase} objectId={item?.objectId} />
                  <Button type="primary" onClick={handleRedirect(item?.objectId)} icon={<BarsOutlined />}>
                    Info
                  </Button>
                  <DeleteButton name={item?.fullName?.toUpperCase()} objectId={item?.objectId} onDelete={onDelete} />
                </Flex>
              }
              column={6}
              size="small"
              title={item?.fullName?.toUpperCase()}>
              <Descriptions.Item label="ID">{item?.id}</Descriptions.Item>
              <Descriptions.Item label="Bonuses">{item?.bonuses}</Descriptions.Item>
              <Descriptions.Item label="Gifted Bonuses">{item?.giftedBonuses}</Descriptions.Item>
              <Descriptions.Item label="Bithday">
                {item?.birthday} {isBirthday && <CrownOutlined />}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{item?.phone}</Descriptions.Item>
            </Descriptions>
          </ClientCard>
        );
      })}
    </ClientsListWrapper>
  );
};
