import React from 'react';

// mocks
import { data } from '../mocks/data'

const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
  const { columns, lists, cards } = data;
  const [todos, setTodos] = React.useState({ columns, lists, cards });

  console.log('data:', data)

  function handleAddCard(listId, newCard) {
    setTodos((prevState) => {
      const updatedLists = {
        ...prevState.lists,
        [listId]: {
          ...prevState.lists[listId],
          cards: [...prevState.lists[listId].cards, newCard.id],
        },
      };

      const updatedCards = {
        ...prevState.cards,
        [newCard.id]: newCard,
      };

      return {
        ...prevState,
        lists: updatedLists,
        cards: updatedCards,
      };
    });
  }

  const onDragEnd = React.useCallback((result) => {
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
    <TodoContext.Provider
      value={{
        // states
        todos,
        setTodos,

        // actions
        handleAddCard,
        onDragEnd
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => React.useContext(TodoContext);