import { createContext, useState } from "react";
import {sleep} from "@/tools/functions.js";


export const LoadingContext = createContext();


export const LoadingState = ({ children }) => {
  const initialState = false;
  const [isLoading, setLoading] = useState(initialState);



  const loading = {
    start: () => setLoading(true),

    stop: async (delay = 1000) => {
      await sleep(delay);
      setLoading(false);
    },
  };


  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      
      loading,
    }}>
      {children}
    </LoadingContext.Provider>
  )
}
