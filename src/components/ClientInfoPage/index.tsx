import React from 'react';
import { CreatePurchaseRequestType } from '../../queries/client';
import { ClientT } from '../../types/client';
import { LoadingScreen } from '../../ui-kit/loading';
import { Descriptions, Flex } from 'antd';
import { PurchaseButton } from '../ClientActions/PurchaseButton';
import { DeleteButton } from '../ClientActions/DeleteButton';
import { PurchuseCard, PurchusesListWrapper } from './styles';
import { CURRENCY_SYMBOL } from '../../constants/common';

type ClientInfoPageProps = {
  onDelete: (id: string) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  loading: boolean;
  client?: ClientT;
};

export const ClientInfoPage: React.FC<ClientInfoPageProps> = ({ loading, client, onCreatePurchase, onDelete }) => {
  if (loading || !client) return <LoadingScreen />;

  return (
    <Flex justify="center" align="flex-start" gap={24} vertical>
      <Descriptions
        extra={
          <Flex gap={12} align="center">
            <PurchaseButton onCreatePurchase={onCreatePurchase} objectId={client?.objectId} />
            <DeleteButton name={client?.fullName?.toUpperCase()} objectId={client?.objectId} onDelete={onDelete} />
          </Flex>
        }
        layout="vertical"
        size="middle"
        title={client?.fullName?.toUpperCase()}>
        <Descriptions.Item label="ID">{client?.id}</Descriptions.Item>
        <Descriptions.Item label="Bonuses">{client?.bonuses}</Descriptions.Item>
        <Descriptions.Item label="Gifted Bonuses">{client?.giftedBonuses}</Descriptions.Item>
        <Descriptions.Item label="Bithday">{client?.birthday}</Descriptions.Item>
        <Descriptions.Item label="Phone">{client?.phone}</Descriptions.Item>
        <Descriptions.Item label="Total Purchuses">{client?.Purchases?.edges?.length}</Descriptions.Item>
      </Descriptions>
      <PurchusesList purshuses={client?.Purchases} />
    </Flex>
  );
};

const PurchusesList: React.FC<{ purshuses: ClientT['Purchases'] }> = ({ purshuses }) => {
  return (
    <PurchusesListWrapper>
      {purshuses?.edges?.map((item) => (
        <PurchuseCard key={item?.node?.objectId}>
          <Descriptions column={6} size="small" title={item?.node?.itemName}>
            <Descriptions.Item label="ID">{item?.node?.objectId?.toUpperCase()}</Descriptions.Item>
            <Descriptions.Item label="Price">
              {item?.node?.price} {CURRENCY_SYMBOL}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(item?.node?.date)?.toLocaleDateString('ru-RU')}
            </Descriptions.Item>
            <Descriptions.Item label="Bonuses received">{item?.node?.bonuseReceived}</Descriptions.Item>
            <Descriptions.Item label="Bonuses used">{item?.node?.usedBonuses}</Descriptions.Item>
          </Descriptions>
        </PurchuseCard>
      ))}
    </PurchusesListWrapper>
  );
};
