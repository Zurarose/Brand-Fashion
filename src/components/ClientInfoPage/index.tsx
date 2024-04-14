import React from 'react';
import { CreatePurchaseRequestType, SetBonusesRequestType } from '../../queries/client';
import { ClientT } from '../../types/client';
import { Descriptions, Flex, Spin } from 'antd';
import { PurchaseButton } from '../ClientActions/PurchaseButton';
import { DeleteButton } from '../ClientActions/DeleteButton';
import { PurchaseCard, PurchasesListWrapper } from './styles';
import { CURRENCY_SYMBOL } from '../../constants/common';
import { SetBonusesButton } from '../ClientActions/SetBonusesButton';

type ClientInfoPageProps = {
  onDelete: (id: string) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  onSetBonuses: (values: SetBonusesRequestType) => Promise<void>;
  loading: boolean;
  client?: ClientT;
  percentFromPriceAsBonuses: number;
};

export const ClientInfoPage: React.FC<ClientInfoPageProps> = ({
  loading,
  client,
  onCreatePurchase,
  onDelete,
  onSetBonuses,
  percentFromPriceAsBonuses,
}) => {
  if (loading || !client) return <Spin spinning={true} fullscreen />;
  return (
    <>
      <Flex justify="center" align="flex-start" gap={24} vertical>
        <Descriptions
          extra={
            <Flex gap={12} align="center">
              <PurchaseButton
                onCreatePurchase={onCreatePurchase}
                objectId={client?.objectId}
                totalBonuses={client?.bonuses + client?.giftedBonuses}
                percentFromPriceAsBonuses={percentFromPriceAsBonuses}
              />
              <DeleteButton name={client?.fullName?.toUpperCase()} objectId={client?.objectId} onDelete={onDelete} />
              <SetBonusesButton
                objectId={client?.objectId}
                initBonuses={{ amount: client?.bonuses, amountgifted: client?.giftedBonuses }}
                onSetBonuses={onSetBonuses}
              />
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
          <Descriptions.Item label="Total Purchases">{client?.Purchases?.edges?.length}</Descriptions.Item>
        </Descriptions>
        <PurchasesList purshuses={client?.Purchases} />
      </Flex>
    </>
  );
};

const PurchasesList: React.FC<{ purshuses: ClientT['Purchases'] }> = ({ purshuses }) => {
  return (
    <PurchasesListWrapper>
      {purshuses?.edges?.map((item) => (
        <PurchaseCard key={item?.node?.objectId}>
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
        </PurchaseCard>
      ))}
    </PurchasesListWrapper>
  );
};
