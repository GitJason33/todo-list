import { createContext, useEffect, useReducer } from "react";
import UserService from "@/services/user-service";

import { LOAD_USER, LOGIN, LOGOUT } from "./actions";
import Cookie from "js-cookie";


const LOGIN_COOKIE = import.meta.env.VITE_LOGIN_COOKIE;
export const AuthContext = createContext();


export function AuthState({ children }){
  const initialState = {
    token: Cookie.get(LOGIN_COOKIE),
    isLoggedIn: false,
    user: null,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);


  // load the user on login, register and start of page
  useEffect(() => {
    if(state.token) loadUser();
  }, []);


  const loadUser = async () => {
    const [data, err] = await UserService.getInfo();
    
    if(err) console.error(err);
    else    dispatch({ type: LOAD_USER, payload: data });
  }



  /** data = { name, email, password } :object of strings */
  const registerUser = async (data) => {
    const [info, err] = await UserService.register(data);


    if(err){
      alert(err);
      return false;
    }
    else {
      Cookie.set(LOGIN_COOKIE, info.token, {
        expires: 30,
      });
      alert("Successfully registered!");

      dispatch({ type: LOGIN, payload: info.user });
      return true;
    }
  }



  /** data = { email, password } :object of strings */
  const loginUser = async (data) => {
    const [info, err] = await UserService.login(data);


    if(err){
      alert(err);
      return false;
    }
    else {
      Cookie.set(LOGIN_COOKIE, info.token, {
        expires: 30,
      });
      alert("Successfully logged in!");

      dispatch({ type: LOGIN, payload: info.user });
      return true;
    }
  }



  const logoutUser = () => {
    Cookie.remove(LOGIN_COOKIE);

    alert("Successfully logged out!");
    dispatch({ type: LOGOUT });
  }


  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: state.isLoggedIn,
      user: state.user,

      loginUser,
      registerUser,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}



function AuthReducer(state, action){
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    
    case LOAD_USER:
      return {
        ...state,
        isLoggedIn: !!Cookie.get(LOGIN_COOKIE),
        user: action.payload,
      }


    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };


    default:
      return state;
  }
}

