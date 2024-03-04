import React, { useState } from 'react';
import { CreateClientRequestType } from '../../queries/client';
import { COUNTRY_CODE } from '../../constants/common';
import { Button, DatePicker, DatePickerProps, Flex, Input, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

type CreateClientStateType = Omit<CreateClientRequestType['fields'], 'birthday'> & { birthday: dayjs.Dayjs };

type NewClientButtonProps = {
  onCreate: (fields: CreateClientRequestType['fields']) => Promise<void>;
};

export const NewClientButton: React.FC<NewClientButtonProps> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CreateClientStateType>({
    fullName: '',
    phone: '',
    birthday: dayjs(),
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
    });
  };

  const onChange = (name: keyof CreateClientStateType) => (input: React.ChangeEvent<HTMLInputElement>) => {
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
