/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, Space, Avatar } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

// context
import { useTodoContext } from '../context/TodoContext'

function ModalAddCard() {

  const {modalAddCard, setModalAddCard, handleAddTodoList } = useTodoContext();

  const [form] = useForm();

  const handleMemberSelectedChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = (values) => {
    form.resetFields();
    handleAddTodoList(values);
    _handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleStatusChange = (value) => {
    console.log(`selected ${value}`);
  };

  function _handleClose() {
    setModalAddCard(prevState => ({
      ...prevState,
      listId: null,
      isOpen: false
    }))
  }

  return (
    <>
      <Modal title="Add Card" open={modalAddCard.isOpen} onOk={form.submit} onCancel={_handleClose}>
        <Form
          name="basic"
          form={form}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            title: '',
            description: '',
            member: undefined,
            status: 'new'
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

          <Form.Item
            name="member"
            label="Member"
            rules={[
              {
                required: true,
                message: 'Please input your member!',
              },
            ]}
          >
              <Select
                mode="multiple"
                size="middle"
                placeholder="Please select"
                onChange={handleMemberSelectedChange}
                style={{
                  width: '100%',
                }}
                options={[
                  {
                    value: 'zung',
                    label: (
                      <>
                        <Space direction="vertical" size={16}>
                          <Space wrap size={16}>
                            <Avatar src="https://img.freepik.com/free-photo/stylish-confident-businesswoman-smiling_176420-19466.jpg?w=2000" />
                          </Space>
                        </Space>
                        <span>Nguyen Thanh Zung</span>
                      </>
                    ),
                  },
                  {
                    value: 'lucy',
                    label: (
                      <>
                        <Space direction="vertical" size={16}>
                          <Space wrap size={16}>
                            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxG7Yll-Mqdj3Ce_9XfWDQ3qqvNTpEX82IeQ&usqp=CAU" />
                          </Space>
                        </Space>
                        <span>Lucy</span>
                      </>
                    ),
                  },
                  {
                    value: 'tom',
                    label: (
                      <>
                        <Space direction="vertical" size={16}>
                          <Space wrap size={16}>
                            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmI2RMfPSRXyXnYQYtF3tdjvwF4x2HnZH29Q-MjH0i3Ly-UAahLK3rq_mIEwcomCFNxk&usqp=CAU" />
                          </Space>
                        </Space>
                        <span>Tom</span>
                      </>
                    ),
                  },
                ]}
              />
            
          </Form.Item>


          <Form.Item
            name="status"
            label="Status" >
            <Select
              style={{ width: 120 }}
              onChange={handleStatusChange}
              options={[
                { value: 'new', label: 'New' },
                { value: 'inprocess', label: 'In process' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </Form.Item>


        </Form>
      </Modal >
    </>
  )
}

export default ModalAddCard