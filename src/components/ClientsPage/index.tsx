import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import { Button, DatePicker, DatePickerProps, Descriptions, Flex, Input, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ClientCard, ClientsListWrapper } from './styles';
import { Client } from '../../types/client';
import { LoadingScreen } from '../../ui-kit/loading';
import { CreateClientRequestType } from '../../queries/client';
import { COUNTRY_CODE } from '../../constants/common';
import dayjs from 'dayjs';

type ClientPageProps = {
  clients?: Client[];
  onSearch: (query: string) => void;
  onDelete: (id: string) => Promise<void>;
  onCreate: (fields: CreateClientRequestType['fields']) => Promise<void>;
  loading: boolean;
};

export const ClientsPage: React.FC<ClientPageProps> = ({ clients, onSearch, onDelete, loading, onCreate }) => {
  if (loading) return <LoadingScreen />;
  return (
    <>
      <NavBar onSearch={onSearch} onCreate={onCreate} />
      <ClientsList clients={clients} onDelete={onDelete} />
    </>
  );
};

const NavBar: React.FC<Pick<ClientPageProps, 'onSearch' | 'onCreate'>> = ({ onSearch, onCreate }) => {
  return (
    <Flex gap={12}>
      <Search placeholder="Input client name" onSearch={onSearch} allowClear size="large" />
      <NewClientButton onCreate={onCreate} />
    </Flex>
  );
};

const ClientsList: React.FC<Pick<ClientPageProps, 'clients' | 'onDelete'>> = ({ clients, onDelete }) => {
  return (
    <ClientsListWrapper>
      {clients?.map((item) => (
        <ClientCard key={item?.objectId}>
          <Descriptions
            extra={
              <Flex gap={12} align="center">
                <Button type="primary">Add Purchase</Button>
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

export const DeleteButton: React.FC<Pick<ClientPageProps, 'onDelete'> & { objectId: string; name: string }> = ({
  onDelete,
  name,
  objectId,
}) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = (id: string) => async () => {
    await onDelete(id);
  };

  return (
    <>
      <Modal title="Confirm Delete Client" open={open} onOk={handleOk(objectId)} onCancel={toggleModal}>
        Delete client {name}?
      </Modal>
      <Button onClick={toggleModal} type="primary">
        Delete
      </Button>
    </>
  );
};

type CreateClientStateType = Omit<CreateClientRequestType['fields'], 'birthday'> & { birthday: dayjs.Dayjs };

const NewClientButton: React.FC<Pick<ClientPageProps, 'onCreate'>> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CreateClientStateType>({
    fullName: '',
    phone: '',
    birthday: dayjs('1990-05-05') as dayjs.Dayjs,
  });
  const [errors, setErrors] = useState<Record<keyof CreateClientStateType, boolean>>({
    fullName: false,
    phone: false,
    birthday: false,
  });

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = async () => {
    if (!fields?.birthday) return setErrors((prev) => ({ ...prev, birthday: true }));
    if (!fields?.fullName) return setErrors((prev) => ({ ...prev, fullName: true }));
    if (!fields?.phone || fields?.phone?.length < 9) return setErrors((prev) => ({ ...prev, phone: true }));

    await onCreate({
      ...fields,
      birthday: fields.birthday?.toDate(),
      phone: `${COUNTRY_CODE}${fields.phone}`,
    });
  };

  const onChange = (name: keyof CreateClientRequestType['fields']) => (input: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'phone' && input?.target?.value.length > 9) return;
    setFields((prev) => ({ ...prev, [name]: input?.target?.value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    if (date) setFields((prev) => ({ ...prev, birthday: date }));
    setErrors((prev) => ({ ...prev, birthday: false }));
  };

  return (
    <>
      <Modal title="Create New Client" open={open} onOk={handleOk} onCancel={toggleModal}>
        <Flex gap={12} vertical>
          <Typography.Paragraph>Firstname and Lastname </Typography.Paragraph>
          <Input
            name={'fullName'}
            value={fields.fullName}
            placeholder="Oleh Sannikov"
            status={errors.fullName ? 'error' : ''}
            variant="outlined"
            onChange={onChange('fullName')}
          />
          <Typography.Paragraph>Firstname and Lastname </Typography.Paragraph>
          <Input
            addonBefore={COUNTRY_CODE}
            name={'phone'}
            value={fields.phone}
            status={errors.phone ? 'error' : ''}
            placeholder="508471102"
            variant="outlined"
            type="number"
            onChange={onChange('phone')}
          />
          <Typography.Paragraph>Bithday</Typography.Paragraph>
          <DatePicker
            status={errors.birthday ? 'error' : ''}
            value={fields.birthday}
            onChange={onChangeDate}
            format="DD-MM-YYYY"
          />
        </Flex>
      </Modal>
      <Button size="large" type="primary" onClick={toggleModal} icon={<PlusOutlined />}>
        Add New Client
      </Button>
    </>
  );
};
