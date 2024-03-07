import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type DeleteButtonProps = {
  onDelete: (id: string) => Promise<void>;
  objectId: string;
  name: string;
};
export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, name, objectId }) => {
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
      <Button onClick={toggleModal} type="primary" icon={<DeleteOutlined />}>
        Delete
      </Button>
    </>
  );
};
