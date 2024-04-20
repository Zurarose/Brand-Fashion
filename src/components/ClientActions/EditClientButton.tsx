import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Flex, Input, Modal, Typography } from 'antd';
import { CreateClientRequestType, EditClientRequestType } from '../../queries/client';
import { COUNTRY_CODE, LOCAL_DATE_FORMAT } from '../../constants/common';
import dayjs from 'dayjs';
import { EditFilled } from '@ant-design/icons';

type EditClientStateType = Omit<CreateClientRequestType['fields'], 'birthday'> & { birthday: dayjs.Dayjs };

type EditClientButtonProps = EditClientRequestType['fields'] & {
  objectId: string;
  onEditClient: (id: string, values: EditClientRequestType['fields']) => Promise<void>;
};

export const EditClientButton: React.FC<EditClientButtonProps> = ({
  onEditClient,
  objectId,
  birthday,
  fullName,
  phone,
}) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<EditClientStateType>({
    birthday: dayjs(birthday),
    fullName: fullName,
    phone: phone?.slice(4),
  });
  const [errors, setErrors] = useState<Record<keyof EditClientStateType, boolean>>({
    fullName: false,
    phone: false,
    birthday: false,
  });

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = async () => {
    if (!fields?.birthday) return setErrors((prev) => ({ ...prev, birthday: true }));
    if (!fields?.fullName) return setErrors((prev) => ({ ...prev, fullName: true }));
    if (!fields?.phone || fields?.phone?.length < 9) return setErrors((prev) => ({ ...prev, phone: true }));
    await onEditClient(objectId, {
      ...fields,
      birthday: fields?.birthday?.toDate(),
    });
    toggleModal();
  };

  const onChange = (name: keyof EditClientStateType) => (input: React.ChangeEvent<HTMLInputElement>) => {
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
            changeOnBlur
            format={LOCAL_DATE_FORMAT}
          />
        </Flex>
      </Modal>
      <Button size="middle" type="primary" onClick={toggleModal} icon={<EditFilled />}>
        Edit
      </Button>
    </>
  );
};
