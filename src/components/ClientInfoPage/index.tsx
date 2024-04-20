import React from 'react';
import { CreatePurchaseRequestType, EditClientRequestType, SetBonusesRequestType } from '../../queries/client';
import { ClientT } from '../../types/client';
import { Descriptions, Flex, Spin } from 'antd';
import { PurchaseButton } from '../ClientActions/PurchaseButton';
import { DeleteButton } from '../ClientActions/DeleteButton';
import { PurchaseCard, PurchasesListWrapper } from './styles';
import { CURRENCY_SYMBOL, LOCAL_DATE_FORMAT } from '../../constants/common';
import { SetBonusesButton } from '../ClientActions/SetBonusesButton';
import { EditClientButton } from '../ClientActions/EditClientButton';
import dayjs from 'dayjs';

type ClientInfoPageProps = {
  onDelete: (id: string) => Promise<void>;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  onSetBonuses: (values: SetBonusesRequestType) => Promise<void>;
  onEditClient: (id: string, fields: EditClientRequestType['fields']) => Promise<void>;
  loading: boolean;
  client?: ClientT;
  percentFromPriceAsBonuses: number;
};

export const ClientInfoPage: React.FC<ClientInfoPageProps> = ({
  loading,
  client,
  onCreatePurchase,
  onEditClient,
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
              <EditClientButton
                fullName={client?.fullName}
                birthday={dayjs(client?.birthday, LOCAL_DATE_FORMAT).toDate()}
                phone={client?.phone}
                objectId={client?.objectId}
                onEditClient={onEditClient}
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
          <Descriptions.Item label="Бонусы">{client?.bonuses}</Descriptions.Item>
          <Descriptions.Item label="Подаренные бонусы">{client?.giftedBonuses}</Descriptions.Item>
          <Descriptions.Item label="День рождение">{client?.birthday}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{client?.phone}</Descriptions.Item>
          <Descriptions.Item label="Всего покупок">{client?.Purchases?.edges?.length}</Descriptions.Item>
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
            <Descriptions.Item label="Цена">
              {item?.node?.price} {CURRENCY_SYMBOL}
            </Descriptions.Item>
            <Descriptions.Item label="Дата">
              {new Date(item?.node?.date)?.toLocaleDateString('ru-RU')}
            </Descriptions.Item>
            <Descriptions.Item label="Получено бонусов">{item?.node?.bonuseReceived}</Descriptions.Item>
            <Descriptions.Item label="Использовано бонусов">{item?.node?.usedBonuses}</Descriptions.Item>
          </Descriptions>
        </PurchaseCard>
      ))}
    </PurchasesListWrapper>
  );
};
