import { createContext, useState } from "react";


export const LoadingContext = createContext();


export const LoadingState = ({ children }) => {
  const initialState = false;
  const [isLoading, setLoading] = useState(initialState);



  const loading = {
    start: () => setLoading(true),

    stop: () => setLoading(false),
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
