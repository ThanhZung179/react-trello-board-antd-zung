import { Card, Button, Tooltip } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ModalAddCard from './components/ModalAddCard'

function App() {

  const [todos, setTodos] = useState([])
  
  const [isOpenModalAddCard, setIsOpenModalAddCard] = useState(false);

  function handleOpenModalAddCard() {
    setIsOpenModalAddCard(true);
  }
 
  function handleCloseModalAddCard() {
    setIsOpenModalAddCard(false);
  }

  function handleAddTodo(values) {
    const todoItemn = {
      id: Math.random(),
      title: values.title,
      description: values.description,
    }
    setTodos([...todos, todoItemn]); // add item
  }

  return (
    <>
      <div className="header_container">
        <div className="header_logo" >
        </div>
          <div className="header_right">
            <div className="header_avatar">
              <img src='https://th.bing.com/th/id/OIP.JcN63wd82WxNh9duWs6PXwHaLH?pid=ImgDet&rs=1' />
            </div>
          </div>
        </div>

      <main>
        <div className="container">
        <Card
        title="List 1" 
        extra= {
          <>
          <div style={{ display: 'flex', gap: '10px'}}>
            <Tooltip placement="top" title= 'Add a card'>
              <Button shape='circle' icon={<PlusOutlined />} onClick={handleOpenModalAddCard}></Button>
            </Tooltip>
            <Tooltip placement="top" title= 'Delete this list'>
              <Button shape='circle' icon={<DeleteOutlined />}></Button>
            </Tooltip>
          </div>
          </>
        }
        style={{
          width: 300
        }}
        className= 'cardList'
        >
        </Card>
        </div>
      </main>
      <ModalAddCard 
        isOpenModalAddCard={isOpenModalAddCard} 
        handleAddTodo={handleAddTodo} 
        handleCloseModalAddCard={handleCloseModalAddCard} 
      />

      
    </>
  )
}

export default App
