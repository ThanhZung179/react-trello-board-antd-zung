import { Card, Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModalAddCard from './components/ModalAddCard';
import CardItem from './components/CardItem';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isOpenModalAddCard, setIsOpenModalAddCard] = useState(false);
  const [listCount, setListCount] = useState(2);

  function handleOpenModalAddCard() {
    setIsOpenModalAddCard(true);
  }

  function handleCloseModalAddCard() {
    setIsOpenModalAddCard(false);
  }

  function handleAddTodoList(values) {
    const todoItem = {
      id: Math.random(),
      title: values.title,
      description: values.description,
      member: values.member,
      status: values.status,
    };

    setTodos([...todos, todoItem]);
  }

  function handleAddList() {
    setListCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <div className="header_container">
        <div className="header_logo"></div>
        <div className="header_right">
          <div className="header_avatar">
            <img src="https://th.bing.com/th/id/OIP.JcN63wd82WxNh9duWs6PXwHaLH?pid=ImgDet&rs=1" alt="Avatar" />
          </div>
        </div>
      </div>

      <main>
        <div className="container">
          {Array.from({ length: listCount }, (_, index) => (
            <Card
              key={index}
              title={`List ${index + 1}`}
              extra={
                <>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip placement="top" title="Add a card">
                      <Button shape="circle" icon={<PlusOutlined />} onClick={handleOpenModalAddCard} />
                    </Tooltip>
                    <Tooltip placement="top" title="Delete this list">
                      <Button shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                  </div>
                </>
              }
              style={{
                width: 300,
              }}
              className="cardList"
            >
              {todos.map((todo) => (
                <CardItem key={todo.id} todo={todo} />
              ))}
            </Card>
          ))}

          <Button onClick={handleAddList} icon={<PlusOutlined />} >Add another List</Button>

        </div>
      </main>



      <ModalAddCard
        isOpenModalAddCard={isOpenModalAddCard}
        handleAddTodo={handleAddTodoList}
        handleCloseModalAddCard={handleCloseModalAddCard}
      />
    </>
  );
}
