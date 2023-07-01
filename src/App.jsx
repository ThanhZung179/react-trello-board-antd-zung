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

  function handleOpenModalAddCard() {
    setIsOpenModalAddCard(true);
  }

  function handleAddList() { }

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

  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId, type } = result;

    // If the destination is null or the draggable item is dropped back into its original position, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // List dragging
    if (type === 'LIST') {
      const newListOrder = Array.from(todos.columns);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      setTodos((prevState) => ({
        ...prevState,
        columns: newListOrder,
      }));

      return;
    }

    // Card dragging
    const startList = todos.lists[source.droppableId];
    const endList = todos.lists[destination.droppableId];

    // If the card is dropped in the same list
    if (startList === endList) {
      const newCardOrder = Array.from(startList.cards);
      newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, draggableId);

      const newStartList = {
        ...startList,
        cards: newCardOrder,
      };

      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [newStartList.id]: newStartList,
        },
      }));
    } else {
      // If the card is dropped in a different list
      const startCardOrder = Array.from(startList.cards);
      startCardOrder.splice(source.index, 1);

      const newStartList = {
        ...startList,
        cards: startCardOrder,
      };

      const endCardOrder = Array.from(endList.cards);
      endCardOrder.splice(destination.index, 0, draggableId);

      const newEndList = {
        ...endList,
        cards: endCardOrder,
      };

      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [newStartList.id]: newStartList,
          [newEndList.id]: newEndList,
        },
      }));
    }
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

