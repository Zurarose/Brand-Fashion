import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Flex, Input, Modal, Typography } from 'antd';
import { CreatePurchaseRequestType } from '../../queries/client';
import dayjs from 'dayjs';
import { CURRENCY_SYMBOL, LOCAL_DATE_FORMAT } from '../../constants/common';
import { PlusOutlined, StarOutlined } from '@ant-design/icons';

type CreatePurchaseStateType = Omit<CreatePurchaseRequestType['fields'], 'date' | 'Client'> & { date: dayjs.Dayjs };

type PurchaseButtonProps = {
  objectId: string;
  onCreatePurchase: (fields: CreatePurchaseRequestType['fields']) => Promise<void>;
  totalBonuses: number;
  percentFromPriceAsBonuses: number;
};

const initState = {
  price: 0,
  usedBonuses: 0,
  itemName: '',
  date: dayjs() as dayjs.Dayjs,
};

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  onCreatePurchase,
  objectId,
  totalBonuses,
  percentFromPriceAsBonuses,
}) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CreatePurchaseStateType>(initState);
  const [errors, setErrors] = useState<Record<keyof CreatePurchaseStateType, boolean>>({
    price: false,
    usedBonuses: false,
    itemName: false,
    date: false,
  });
  const onChange = (name: keyof CreatePurchaseStateType) => (input: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'usedBonuses' && Number(input?.target?.value) > totalBonuses) {
      input.target.value = String(totalBonuses);
    }

    if (name === 'price') {
      setFields((prev) => {
        return {
          ...prev,
          [name]: Number(input?.target?.value),
          usedBonuses: 0,
        };
      });
      setErrors((prev) => ({ ...prev, [name]: false }));
      return;
    }
    if (name === 'usedBonuses') {
      setFields((prev) => {
        const maxForUse = Number(Number((Number(prev.price) / 100) * percentFromPriceAsBonuses)?.toFixed(2));
        return {
          ...prev,
          [name]:
            Number(input?.target?.value) > maxForUse ? maxForUse : Number(Number(input?.target?.value)?.toFixed(2)),
        };
      });
      setErrors((prev) => ({ ...prev, [name]: false }));
      return;
    }
    setFields((prev) => ({ ...prev, [name]: input?.target?.value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    if (date) setFields((prev) => ({ ...prev, date: date }));
    setErrors((prev) => ({ ...prev, date: false }));
  };

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = async () => {
    if (!fields?.itemName) return setErrors((prev) => ({ ...prev, itemName: true }));
    if (!fields?.price) return setErrors((prev) => ({ ...prev, price: true }));
    if (!fields?.date) return setErrors((prev) => ({ ...prev, date: true }));
    if (Number(fields.usedBonuses) > (fields.price / 100) * percentFromPriceAsBonuses)
      return setErrors((prev) => ({ ...prev, usedBonuses: true }));

    await onCreatePurchase({
      ...fields,
      date: fields.date?.toDate(),
      Client: {
        link: objectId,
      },
    });
    toggleModal();
    setFields(initState);
  };

  return (
    <>
      <Modal title="Новая покупка" open={open} onOk={handleOk} onCancel={toggleModal}>
        <Flex gap={12} vertical>
          <Typography.Paragraph>Название товара</Typography.Paragraph>
          <Input
            name={'itemName'}
            value={fields.itemName}
            placeholder="Pencil"
            status={errors.itemName ? 'error' : ''}
            variant="outlined"
            onChange={onChange('itemName')}
          />
          <Typography.Paragraph>Цена</Typography.Paragraph>
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
          <Typography.Paragraph>
            Сколько бонусов использовать {errors.usedBonuses && `(Максимальный процент: ${percentFromPriceAsBonuses}!)`}
          </Typography.Paragraph>
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
          <Typography.Paragraph>Дата</Typography.Paragraph>
          <DatePicker
            status={errors.date ? 'error' : ''}
            value={fields.date}
            onChange={onChangeDate}
            format={LOCAL_DATE_FORMAT}
            changeOnBlur
            allowClear={false}
          />
        </Flex>
      </Modal>
      <Button type="primary" onClick={toggleModal} icon={<PlusOutlined />}>
        Добавить покупку
      </Button>
    </>
  );
};
