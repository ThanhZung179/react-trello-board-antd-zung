import { useState, useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// components
import ModalAddCard from './components/ModalAddCard';
import TrelloList from './components/TrelloList';

// mocks
import { data } from './mocks/data'

export default function App() {
  const [todos, setTodos] = useState(data);
  const [isOpenModalAddCard, setIsOpenModalAddCard] = useState(false);

  // function handleOpenModalAddCard() {
  //   setIsOpenModalAddCard(true);
  // }

  function handleAddList() {}

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


  const onDragEnd = useCallback((data) => {
    if(!data.destination) return;

    // list
    if(data.type === 'LIST') {
      console.log('list', data)
      return
    }

    // card
    const { destination, source } = data;

    // drop card same list
    if(source.droppableId === destination.droppableId) {
      const droppedIdStart = source.droppableId
      const lists = todos.lists[droppedIdStart]
      const newCards = [...lists.cards];
      [newCards[source.index], newCards[destination.index]] = [newCards[destination.index],newCards[source.index]]

      setTodos(prevState => {
        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [droppedIdStart]: {
              ...lists,
              cards: newCards
            }
          }
        }
      })
      return; 
    }

    // drop card between lists


    // card



    // the only one that is required
  }, [todos]);

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

/*
[1, 2, 3, 4, 5]
-> swap 1, 4, 3, 2, 5 -> [x, y] = [y, x]
-> order: 1 4 2 3 5 -> findIndex -> splice -> add item


*/