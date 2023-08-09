import React from 'react';
import { Modal, Typography } from 'antd';
import { useTodoContext } from '../context/TodoContext';

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
function ModalCardDetail({ cardId, visible, onClose }) {
  const { todos } = useTodoContext();
  const card = todos.cards[cardId];

  return (
    <Modal
      title={card.title}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Text>{card.description}</Text>
    </Modal>
  );
}

export default ModalCardDetail;
