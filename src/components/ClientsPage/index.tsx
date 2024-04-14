import React from 'react';
import Search from 'antd/es/input/Search';
import { Button, Descriptions, Flex, Spin } from 'antd';
import { BirthdayIcon, ClientCard, ClientsListWrapper } from './styles';
import { ClientT } from '../../types/client';
import { CreateClientRequestType, CreatePurchaseRequestType } from '../../queries/client';
import { DeleteButton } from '../ClientActions/DeleteButton';
import { NewClientButton } from '../ClientActions/NewClientButton';
import { PurchaseButton } from '../ClientActions/PurchaseButton';
import { BarsOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { LOCAL_DATE_FORMAT } from '../../constants/common';
export type ClientPageProps = {
  clients?: ClientT[];
  onSearch: (query: string) => void;
  onDelete: (id: string) => Promise<void>;
  onCreate: (fields: CreateClientRequestType['fields']) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  loading: boolean;
  clientInfoRedirect: (id: string) => void;
  percentFromPriceAsBonuses: number;
};

export const ClientsPage: React.FC<ClientPageProps> = ({
  clients,
  onSearch,
  onDelete,
  loading,
  onCreate,
  onCreatePurchase,
  clientInfoRedirect,
  percentFromPriceAsBonuses,
}) => {
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <NavBar onSearch={onSearch} onCreate={onCreate} />
      <ClientsList
        clients={clients}
        onDelete={onDelete}
        onCreatePurchase={onCreatePurchase}
        clientInfoRedirect={clientInfoRedirect}
        percentFromPriceAsBonuses={percentFromPriceAsBonuses}
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

type ClientsListProps = Pick<
  ClientPageProps,
  'clients' | 'onDelete' | 'onCreatePurchase' | 'clientInfoRedirect' | 'percentFromPriceAsBonuses'
>;

const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  onDelete,
  onCreatePurchase,
  clientInfoRedirect,
  percentFromPriceAsBonuses,
}) => {
  const handleRedirect = (id: string) => () => {
    clientInfoRedirect(id);
  };
  const currentDate = dayjs().format('MM-DD');
  return (
    <ClientsListWrapper>
      {clients?.map((client) => {
        const birthday = dayjs(client?.birthday, LOCAL_DATE_FORMAT)?.format('MM-DD');
        return (
          <ClientCard key={client?.objectId}>
            <Descriptions
              extra={
                <Flex gap={12} align="center">
                  <PurchaseButton
                    onCreatePurchase={onCreatePurchase}
                    objectId={client?.objectId}
                    totalBonuses={client?.bonuses + client?.giftedBonuses}
                    percentFromPriceAsBonuses={percentFromPriceAsBonuses}
                  />
                  <Button type="primary" onClick={handleRedirect(client?.objectId)} icon={<BarsOutlined />}>
                    Info
                  </Button>
                  <DeleteButton
                    name={client?.fullName?.toUpperCase()}
                    objectId={client?.objectId}
                    onDelete={onDelete}
                  />
                </Flex>
              }
              column={6}
              size="small"
              title={client?.fullName?.toUpperCase()}>
              <Descriptions.Item label="ID">{client?.id}</Descriptions.Item>
              <Descriptions.Item label="Bonuses">{client?.bonuses}</Descriptions.Item>
              <Descriptions.Item label="Gifted Bonuses">{client?.giftedBonuses}</Descriptions.Item>
              <Descriptions.Item label="Bithday">
                {client?.birthday} {birthday === currentDate && <BirthdayIcon />}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{client?.phone}</Descriptions.Item>
            </Descriptions>
          </ClientCard>
        );
      })}
    </ClientsListWrapper>
  );
};
