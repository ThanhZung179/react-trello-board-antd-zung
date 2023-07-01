import React from 'react';

// mocks
import { data } from '../mocks/data'

const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = React.useState(data);

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

  const onDragEnd = React.useCallback((data) => {
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
    <TodoContext.Provider 
      value={{
        // states
        todos,

        // actions
        handleAddTodoList,
        onDragEnd
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => React.useContext(TodoContext);