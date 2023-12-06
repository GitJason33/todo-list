import { createContext, useEffect, useMemo, useReducer } from 'react';
import { 
  CREATE_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
  GET_EXAMPLE_TODOS, 
  GET_TODO, 
  GET_TODOS, 
  MARK_DONE 
} from './actions';
import TaskService from '@/services/task-service';
import { useAuth } from './contextHooks';



export const TaskContext = createContext();



export const TaskState = ({ children }) => {
  const initialState = {
    todos: [],
    currentTodo: null,
    exampleTodos: [],

    // features for later
    filter: 'all',
    sort: 'priority h to l',
  };
  const [state, dispatch] = useReducer(TaskReducer, initialState);
  const { isLoggedIn } = useAuth();


  useEffect(() => {
    getExampleTodos();
  }, []);

  useEffect(() => {
    if(isLoggedIn) getAllTodos();
  }, [isLoggedIn]);


  const getAllTodos = async () => {
    const [todos, err] = await TaskService.getAll();


    if(err) console.error(err);
    else dispatch({ type: GET_TODOS, payload: todos });
  } 


  const getExampleTodos = async () => {
    const [todos, err] = await TaskService.getExamples();


    if(err) console.error(err);
    else dispatch({ type: GET_EXAMPLE_TODOS, payload: todos });
  } 
  
  
  /** checks if the todo is already in the app before requesting it from the server */
  const getOneTodo = async (id) => {
    const [potentiallyHere] = state.todos.filter(todo => todo._id === id);


    if(potentiallyHere){
      dispatch({ type: GET_TODO, payload: potentiallyHere })
    }
    else {
      const [todo, err] = await TaskService.getOne(id);
      

      if(err) console.error(err);
      else dispatch({ type: GET_TODO, payload: todo });
    }
  }
  
  
  
  const createTodo = async (data) => {
    const [todo, err] = await TaskService.create(data);
    

    if(err) {
      alert(`Operation failed: ${err}`);
      return false;
    }
    else {
      dispatch({ type: CREATE_TODO, payload: todo });
      return true;
    }
  }
  
  
  
  const editTodo = async (id, data) => {
    const [, err] = await TaskService.edit(id, data);
    

    if(err) {
      alert(`Operation failed: ${err}`);
      return false;
    }
    else {
      dispatch({ type: EDIT_TODO, payload: { id, data } });
      return true;
    }
  }
  
  
  
  const markTodoDone = async (id) => {
    const [, err] = await TaskService.markAsDone(id);
    

    if(err) alert(`Operation failed: ${err}`);
    else    dispatch({ type: MARK_DONE, payload: id });
  }
  
  
  
  const deleteTodo = async (id) => {
    const [, err] = await TaskService.delete(id);
    

    if(err) {
      alert(`Operation failed: ${err}`);
      return false;
    }
    else {
      dispatch({ type: DELETE_TODO, payload: id });
      return true;
    }
  }



  /** count how many todos there are */
  const todosCount = useMemo(
    () => state.todos.length, 
  [state.todos]);



  /** track how many todos you've done */
  const todosDoneCount = useMemo(() => {
    let count = 0;

    state.todos.forEach(todo => {
      if(todo.done) count++;
    });
    
    return count;
  }, [state.todos]);


  return (
    <TaskContext.Provider
      value={{
        todos: state.todos,
        currentTodo: state.currentTodo,
        exampleTodos: state.exampleTodos,
        todosCount,
        todosDoneCount,

        getOneTodo,
        createTodo,
        editTodo,
        markTodoDone,
        deleteTodo,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};



function TaskReducer(state, action) {
  switch (action.type) {
    // action.payload = todos :object[]
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };


    // action.payload = todos :object[]
    case GET_EXAMPLE_TODOS:
      return {
        ...state,
        exampleTodos: action.payload,
      };


    // action.payload = todo :object
    case GET_TODO:
      return {
        ...state,
        currentTodo: action.payload,
      };


    // action.payload = todo :object
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };


    // action.payload = { _id :int, todo :object }
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo._id == action.payload.id ? {
            ...todo,
            ...action.payload.data,
          } : todo
        )),
      };



    // action.payload = todo_id :int
    case MARK_DONE:
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo._id === action.payload ? {
            ...todo,
            done: true,
          } : todo
        )),
      }


    // action.payload = todo_id :int
    case DELETE_TODO:
      return {
        ...state,
        currentTodo: state.currentTodo?._id === parseInt(action.payload) ? null : state.currentTodo,
        todos: state.todos.filter(todo => todo._id !== parseInt(action.payload)),
      }


    default:
      return state;
  }
}
