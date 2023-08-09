import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useTodoContext } from '../context/TodoContext';

function ModalEditCard({ card, visible, onClose }) {
  const { todos, setTodos } = useTodoContext();
  const [form] = Form.useForm();

  const handleEditSubmit = (values) => {
    const updatedCard = {
      ...card,
      title: values.title,
      description: values.description,
    };

    setTodos((prevState) => ({
      ...prevState,
      cards: {
        ...prevState.cards,
        [card.id]: updatedCard,
      },
    }));

    onClose();
  };

  return (
    <Modal
      title="Edit Card"
      visible={visible}
      onCancel={onClose}
      onOk={form.submit}
    >
      <Form
        form={form}
        onFinish={handleEditSubmit}
        initialValues={{
          title: card.title,
          description: card.description,
        }}
        labelCol={{ span: 6 }} 
        wrapperCol={{ span: 18 }} 
      >
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalEditCard;
