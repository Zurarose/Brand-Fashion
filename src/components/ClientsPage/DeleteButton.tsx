import React, { useState } from 'react';
import { ClientPageProps } from '.';
import { Button, Modal } from 'antd';

type DeleteButtonProps = Pick<ClientPageProps, 'onDelete'> & { objectId: string; name: string };
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
      <Button onClick={toggleModal} type="primary">
        Delete
      </Button>
    </>
  );
};