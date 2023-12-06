import { useContext } from "react";

import { AuthContext } from "./AuthState";
import { ConfirmContext } from "./ConfirmState";
import { TaskContext } from "./TaskState";



/** get the global authentication or login state */
export const useAuth = () => useContext(AuthContext);


/** toggle the confirmation box using the global confirm state */
export const useConfirm = () => useContext(ConfirmContext);


/** get the global state of todos */
export const useTodo = () => useContext(TaskContext);
