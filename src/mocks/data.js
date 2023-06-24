// hash map (object)
export const data = {
  columns: ['list-1', 'list-2'],
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'List 1',
      cards: ['card-1', 'card-2', 'card-3', 'card-4']
    },
    'list-2': {
      id: 'list-2',
      title: 'List 2',
      cards: ['card-2-1']
    }
  },
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Card 1',
      description: 'Description 1',
    },
    'card-2': {
      id: 'card-2',
      title: 'Card 2',
      description: 'Description 2',
    },
    'card-3': {
      id: 'card-3',
      title: 'Card 3',
      description: 'Description 3',
    },
    'card-4': {
      id: 'card-4',
      title: 'Card 4',
      description: 'Description 4',
    },
    'card-2-1': {
      id: 'card-2-1',
      title: 'Card 2-1',
      description: 'Description 2-1',
    },
    'card-2-2': {
      id: 'card-2-2',
      title: 'Card 2-2',
      description: 'Description 2-2',
    }
  }
}

// const todos = [
//   { id: 1, title: 'Do homework', completed: false },
//   { id: 2, title: 'Do homework 2', completed: false },
// ]

// const todoObj = {
//   1: { id: 1, title: 'Do homework', completed: false },
//   2: { id: 2, title: 'Do homework 2', completed: false },
// }

// const idFromBE = 1

// // array
// //  change item in array
// const todoIndex = todos.findIndex(todo => todo.id === idFromBE)
// todos[todoIndex].title = '123'

// // delete item in array
// const todoIndexA = todos.findIndex(todo => todo.id === idFromBE)
// todos.splice(todoIndexA, 1)

// // object
// todoObj[idFromBE].title = '123'
// delete todoObj[idFromBE]