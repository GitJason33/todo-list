import { createContext, useEffect, useReducer } from "react";
import UserService from "@/services/user-service";

import { LOAD_USER, LOGIN, LOGOUT } from "../actions";
import Cookie from "js-cookie";
import { useAlert, useLoading } from "../contextHooks";
import { useNavigate } from "react-router-dom";


const LOGIN_COOKIE = import.meta.env.VITE_LOGIN_COOKIE;
export const AuthContext = createContext();


export function AuthState({ children }){
  const initialState = {
    token: Cookie.get(LOGIN_COOKIE),
    isLoggedIn: false,
    user: null,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { Alert } = useAlert();
  const { loading } = useLoading();
  const redirect = useNavigate();


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
    loading.start();
    const [info, err] = await UserService.register(data);
    loading.stop();


    if(err) Alert.open(err);
    else {
      Cookie.set(LOGIN_COOKIE, info.token, {
        expires: 30,
      });

      Alert.open(null, "Successfully registered!");
      redirect('/dashboard', { replace: true });

      dispatch({ type: LOGIN, payload: info.user });
    }
  }



  /** data = { email, password } :object of strings */
  const loginUser = async (data) => {
    loading.start();
    const [info, err] = await UserService.login(data);
    loading.stop();


    if(err) Alert.open(err);
    else {
      Cookie.set(LOGIN_COOKIE, info.token, {
        expires: 30,
      });
      
      Alert.open(null, "Successfully logged in!");
      redirect('/dashboard', { replace: true });

      dispatch({ type: LOGIN, payload: info.user });
    }
  }



  const logoutUser = () => {
    Cookie.remove(LOGIN_COOKIE);

    Alert.open(null, "Successfully logged out!");
    redirect("/", { replace: true });

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

