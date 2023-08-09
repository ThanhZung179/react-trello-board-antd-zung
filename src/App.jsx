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
    // Prompt the user to enter the title of the new list
    const newListTitle = window.prompt("Enter the title of the new list:");

    if (newListTitle && newListTitle.trim() !== "") {
      // Generate a unique ID for the new list
      const newListId = `list-${Math.random().toString(36).substr(2, 9)}`;

      // Create a new list object
      const newList = {
        id: newListId,
        title: newListTitle,
        cards: [], // Initialize the new list with an empty array of cards
      };

      // Update the todos state with the new list
      setTodos((prevState) => ({
        ...prevState,
        columns: [...prevState.columns, newListId], // Add the new list ID to the columns array
        lists: {
          ...prevState.lists,
          [newListId]: newList, // Add the new list to the lists object with its ID as the key
        },
      }));
    }
  }

  //DELETE LIST 
  function handleDeleteList(listIdToDelete) {
    // Create a copy of the state
    const updatedTodos = { ...todos };

    // Remove the list from the columns array
    updatedTodos.columns = updatedTodos.columns.filter((id) => id !== listIdToDelete);

    // Delete the list from the lists object
    delete updatedTodos.lists[listIdToDelete];

    // Update the state with the modified data
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

            {/* <TrelloList /> */}
          </DragDropContext>


          <Button onClick={handleAddList} icon={<PlusOutlined />} >Add another List</Button>

        </div>
      </main>

      <ModalAddCard />

    </>
  );
}

