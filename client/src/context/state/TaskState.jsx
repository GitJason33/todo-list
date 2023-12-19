import { createContext, useEffect, useMemo, useReducer } from 'react';
import { 
  CREATE_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
  GET_EXAMPLE_TODOS, 
  GET_TODO, 
  GET_TODOS, 
  MARK_DONE 
} from '../actions';
import TaskService from '@/services/task-service';
import { useAlert, useAuth, useLoading } from '../contextHooks';
import { useNavigate } from 'react-router-dom';
import {cacheExamples, getCachedExamples} from "@/tools/caching.js";



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

  const { isLoggedIn, user } = useAuth();
  const { Alert } = useAlert();
  const { loading } = useLoading();
  const redirect = useNavigate();


  useEffect(() => {
    getExampleTodos();
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [isLoggedIn, user]);


  const getAllTodos = async () => {
    if(!isLoggedIn) {
      dispatch({ type: GET_TODOS, payload: [] });
      return;
    }
    if(window.location.pathname === "/dashboard") loading.start();
    const [todos, err] = await TaskService.getAll();
    loading.stop();


    if(err) console.error("🚀 ~ file: TaskState.jsx:57 ~ getAllTodos ~ err:", err)
    else dispatch({ type: GET_TODOS, payload: todos });
  }


  const getExampleTodos = async () => {
    let todos = getCachedExamples();

    if(!todos){
      const [todos, err] = await TaskService.getExamples();


      if(err) console.error("🚀 ~ file: TaskState.jsx:68 ~ getExampleTodos ~ err:", err);
      else {
        cacheExamples(todos);
        dispatch({type: GET_EXAMPLE_TODOS, payload: todos});
      }
    } else{
      dispatch({ type: GET_EXAMPLE_TODOS, payload: todos });
    }
  }
    
  
  
  /** checks if the todo is already in the app before requesting it from the server */
  const getOneTodo = async (id) => {
    // case if target is the currentTodo already
    if(state.currentTodo !== null && state.currentTodo._id == id)
      return;

    // case if it's an example
    if(id <= 6){
      const [example] = state.exampleTodos.filter((todo) => todo._id == id);

      if(example) {
        dispatch({type: GET_TODO, payload: example});
        return;
      }
    }

    // case if it's already in the todos array
    const [potentiallyHere] = state.todos.filter(todo => todo._id == id);

    if(potentiallyHere){
      dispatch({ type: GET_TODO, payload: potentiallyHere })
    }
    else {
      // default case to fetch from server
      if(window.location.pathname.startsWith("/todo/")) loading.start();
      const [todo, err] = await TaskService.getOne(id);
      loading.stop();


      if(err) console.error("🚀 ~ file: TaskState.jsx:83 ~ getOneTodo ~ err:", err)
      else dispatch({ type: GET_TODO, payload: todo });
    }
  }
  
  
  
  const createTodo = async (data) => {
    loading.start();
    const [todo, err] = await TaskService.create(data);
    loading.stop();

    if(err) Alert.open(`Operation failed - ${err}`);
    else {
      dispatch({ type: CREATE_TODO, payload: todo });
      redirect('/dashboard', { replace: true });
    }
  }
  
  
  
  const editTodo = async (id, data) => {
    loading.start();
    const [, err] = await TaskService.edit(id, data);
    loading.stop();
    

    if(err) Alert.open(`Operation failed - ${err}`);
    else {
      dispatch({ type: EDIT_TODO, payload: { id, data } });
      redirect('/dashboard', { replace: true });
    }
  }
  
  
  
  const markTodoDone = async (id) => {
    loading.start();
    const [, err] = await TaskService.markAsDone(id);    
    loading.stop();
    

    if(err) Alert.open(`Operation failed - ${err}`);
    else {
      dispatch({ type: MARK_DONE, payload: id });
    }
  }
  
  
  
  const deleteTodo = async (id) => {
    loading.start();
    const [, err] = await TaskService.delete(id);
    loading.stop();


    if(err) Alert.open(`Operation failed - ${err}`);
    else {
      dispatch({ type: DELETE_TODO, payload: id });
      redirect('/dashboard', { replace: true });
    }
  }



  /** count how many todos there are */
  const todosCount = useMemo(
    () => state.todos.length, [state.todos]
  );



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
