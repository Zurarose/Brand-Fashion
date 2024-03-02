import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Flex, Input, Modal, Typography } from 'antd';
import { CreatePurchaseRequestType } from '../../queries/client';
import dayjs from 'dayjs';
import { CURRENCY_SYMBOL } from '../../constants/common';
import { PlusOutlined, StarOutlined } from '@ant-design/icons';

type CreatePurchaseStateType = Omit<CreatePurchaseRequestType['fields'], 'date' | 'Client'> & { date: dayjs.Dayjs };

type PurchaseButtonProps = {
  objectId: string;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
};

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ onCreatePurchase, objectId }) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CreatePurchaseStateType>({
    price: 0,
    usedBonuses: 0,
    itemName: '',
    date: dayjs() as dayjs.Dayjs,
  });
  const [errors, setErrors] = useState<Record<keyof CreatePurchaseStateType, boolean>>({
    price: false,
    usedBonuses: false,
    itemName: false,
    date: false,
  });

  const onChange = (name: keyof CreatePurchaseStateType) => (input: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [name]: input?.target?.value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    if (date) setFields((prev) => ({ ...prev, birthday: date }));
    setErrors((prev) => ({ ...prev, birthday: false }));
  };

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = async () => {
    await onCreatePurchase({
      ...fields,
      date: fields.date?.toDate(),
      Client: {
        link: objectId,
      },
    });
  };

  return (
    <>
      <Modal title="New Purchase" open={open} onOk={handleOk} onCancel={toggleModal}>
        <Flex gap={12} vertical>
          <Typography.Paragraph>Item Name</Typography.Paragraph>
          <Input
            name={'itemName'}
            value={fields.itemName}
            placeholder="Pencil"
            status={errors.itemName ? 'error' : ''}
            variant="outlined"
            onChange={onChange('itemName')}
          />
          <Typography.Paragraph>Price</Typography.Paragraph>
          <Input
            addonAfter={<span>{CURRENCY_SYMBOL}</span>}
            name={'price'}
            value={!fields.price ? '' : fields.price}
            status={errors.price ? 'error' : ''}
            placeholder="Enter item price"
            variant="outlined"
            type="number"
            onChange={onChange('price')}
          />
          <Typography.Paragraph>Bonuses to use</Typography.Paragraph>
          <Input
            addonAfter={<StarOutlined />}
            name={'usedBonuses'}
            value={!fields.usedBonuses ? '' : fields.usedBonuses}
            status={errors.usedBonuses ? 'error' : ''}
            placeholder="How Much Bonuses Used?"
            variant="outlined"
            type="number"
            onChange={onChange('usedBonuses')}
          />
          <Typography.Paragraph>Date</Typography.Paragraph>
          <DatePicker
            status={errors.date ? 'error' : ''}
            value={fields.date}
            onChange={onChangeDate}
            format="DD-MM-YYYY"
            allowClear={false}
          />
        </Flex>
      </Modal>
      <Button type="primary" onClick={toggleModal} icon={<PlusOutlined />}>
        Add Purchase
      </Button>
    </>
  );
};
