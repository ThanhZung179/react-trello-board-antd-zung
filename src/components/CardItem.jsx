import { EditOutlined, DeleteOutlined, FileTextOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Tooltip } from 'antd';

const { Meta } = Card;

function CardItem({ todo }) {
  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Tooltip placement="top" title='View' key='view'>
            <FileTextOutlined key="view" />
          </Tooltip>,

          <Tooltip placement="top" title='Edit' key='edit'>
            <EditOutlined key="edit" />
          </Tooltip>,

          <Tooltip placement="top" title='Delete' key='delete'>
            <DeleteOutlined key="delete" />
          </Tooltip>,
        ]}
      >
        <Meta
          title={todo.title}
          description={todo.description}
        />
        <div className='avatarGroup'>
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="click"
            size="large"
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer',
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Avatar
              style={{
                backgroundColor: '#f56a00',
              }}
            >
              K
            </Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar
                style={{
                  backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
              />
            </Tooltip>
            <Avatar
              style={{
                backgroundColor: '#1677ff',
              }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
        </div>
      </Card>

    </>
  )
}

export default CardItem