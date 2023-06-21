import { Modal, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

function ModalAddCard({ isOpenModalAddCard, handleCloseModalAddCard, handleAddTodo }) {

  const [form] = useForm();
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleMemberSelectedChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = (values) => {
    form.resetFields();
    handleAddTodo(values);
    handleCloseModalAddCard();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="Add Card" open={isOpenModalAddCard} onOk={form.submit} onCancel={handleCloseModalAddCard}>
        <Form
          name="basic"
          form={form}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input description!',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item name="gender" label="Member" rules={[{ required: true }]}>
          <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      > 
        <Select
          mode="multiple"
          size= 'middle'
          placeholder="Please select"
          onChange={handleMemberSelectedChange}
          style={{
            width: '100%',
          }}
          options={options}
        />
        
      </Space>
      </Form.Item>



        </Form>
      </Modal >
    </>
  )
}

export default ModalAddCard