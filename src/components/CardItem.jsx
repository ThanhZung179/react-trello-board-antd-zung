import { EditOutlined, DeleteOutlined, FileTextOutlined  } from '@ant-design/icons';
import { Avatar, Card, Tooltip } from 'antd';

const { Meta } = Card;

function CardItem() {
  return (
    <>
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
        <Tooltip placement="top" title= 'View' key='view'>
            <FileTextOutlined key="view" />
        </Tooltip>,
      
      <Tooltip placement="top" title= 'Edit' key='edit'>
        <EditOutlined key="edit" />
      </Tooltip>,

    <Tooltip placement="top" title= 'Delete' key='delete'>
      <DeleteOutlined key="delete" />
    </Tooltip>,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
  </Card>

    </>
  )
}

export default CardItem