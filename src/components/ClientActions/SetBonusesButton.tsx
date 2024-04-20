import React, { useState } from 'react';
import { Button, Flex, Input, Modal, Typography } from 'antd';
import { SetBonusesRequestType } from '../../queries/client';
import { StarOutlined } from '@ant-design/icons';

type CreatePurchaseStateType = Omit<SetBonusesRequestType, 'userId'>;

type PurchaseButtonProps = {
  objectId: string;
  initBonuses: {
    amount: number;
    amountgifted: number;
  };
  onSetBonuses: (values: SetBonusesRequestType) => Promise<void>;
};

export const SetBonusesButton: React.FC<PurchaseButtonProps> = ({ onSetBonuses, initBonuses, objectId }) => {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CreatePurchaseStateType>({
    amount: initBonuses?.amount,
    amountgifted: initBonuses?.amountgifted,
  });
  const [errors, setErrors] = useState<Record<keyof CreatePurchaseStateType, boolean>>({
    amount: false,
    amountgifted: false,
  });

  const onChange = (name: keyof CreatePurchaseStateType) => (input: React.ChangeEvent<HTMLInputElement>) => {
    if (input?.target?.value === '') input.target.value = '0';
    setFields((prev) => ({ ...prev, [name]: Number(input?.target?.value) }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const toggleModal = () => setOpen((prev) => !prev);

  const handleOk = async () => {
    if (typeof fields?.amount === 'undefined') return setErrors((prev) => ({ ...prev, amount: true }));
    if (typeof fields?.amountgifted === 'undefined') return setErrors((prev) => ({ ...prev, amountgifted: true }));
    await onSetBonuses({
      ...fields,
      userId: objectId,
    });
    toggleModal();
  };

  return (
    <>
      <Modal title="Изменить количество бонусов" open={open} onOk={handleOk} onCancel={toggleModal}>
        <Flex gap={12} vertical>
          <Typography.Paragraph>Бонусы</Typography.Paragraph>
          <Input
            addonAfter={<StarOutlined />}
            name={'amount'}
            value={fields.amount}
            status={errors.amount ? 'error' : ''}
            placeholder="Enter user bonuses"
            variant="outlined"
            type="number"
            onChange={onChange('amount')}
          />
          <Typography.Paragraph>Подаренные бонусы</Typography.Paragraph>
          <Input
            addonAfter={<StarOutlined />}
            name={'amountgifted'}
            value={fields.amountgifted}
            status={errors.amountgifted ? 'error' : ''}
            placeholder="Enter user gifted bonuses"
            variant="outlined"
            type="number"
            onChange={onChange('amountgifted')}
          />
        </Flex>
      </Modal>
      <Button type="primary" onClick={toggleModal} icon={<StarOutlined />}>
        Редактировать бонусы
      </Button>
    </>
  );
};
