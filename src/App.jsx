import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// components
import ModalAddCard from './components/ModalAddCard';
import TrelloList from './components/TrelloList';

// context
import { useTodoContext } from './context/TodoContext';

export default function App() {
  const { todos, setTodos, onDragEnd, setModalAddCard } = useTodoContext();

  function handleAddList() {

    const newListTitle = window.prompt("Enter the title of the new list:");

    if (newListTitle && newListTitle.trim() !== "") {

      const newListId = `list-${Math.random().toString(36).substr(2, 9)}`;


      const newList = {
        id: newListId,
        title: newListTitle,
        cards: [],
      };


      setTodos((prevState) => ({
        ...prevState,
        columns: [...prevState.columns, newListId],
        lists: {
          ...prevState.lists,
          [newListId]: newList,
        },
      }));
    }
  }

  //DELETE LIST 
  function handleDeleteList(listIdToDelete) {

    const updatedTodos = { ...todos };
    updatedTodos.columns = updatedTodos.columns.filter((id) => id !== listIdToDelete);
    delete updatedTodos.lists[listIdToDelete];
    setTodos(updatedTodos);
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
                          setModalAddCard={setModalAddCard}
                          handleDeleteList={handleDeleteList}
                        />
                      )
                    })}
                  </>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </DragDropContext>


          <Button onClick={handleAddList} icon={<PlusOutlined />} >Add another List</Button>

        </div>
      </main>

      <ModalAddCard />

    </>
  );
}

