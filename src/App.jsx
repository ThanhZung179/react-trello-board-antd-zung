import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// components
import ModalAddCard from './components/ModalAddCard';
import TrelloList from './components/TrelloList';

// context
import { useTodoContext } from './context/TodoContext';

export default function App() {
  const { todos, handleAddTodoList, onDragEnd } = useTodoContext();
  const [isOpenModalAddCard, setIsOpenModalAddCard] = useState(false);

  function handleOpenModalAddCard() {
    setIsOpenModalAddCard(true);
  }

  function handleAddList() { }

  function handleCloseModalAddCard() {
    setIsOpenModalAddCard(false);
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
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="droppable" type="LIST" direction='vertical'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    // backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                    display: 'flex'
                  }}
                  {...provided.droppableProps}
                  className="listContainer"
                >
                  <>
                    {todos.columns.map((listId, listIndex) => {
                      const listItem = todos.lists[listId];
                      const cards = listItem.cards.map(cardId => todos.cards[cardId])
                      return (
                        <TrelloList
                          key={listItem.id}
                          index={listIndex}
                          title={listItem.title}
                          cards={cards}
                          listId={listItem.id}
                          handleOpenModalAddCard={handleOpenModalAddCard}
                        />
                      )
                    })}
                  </>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* <TrelloList /> */}
          </DragDropContext>


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

