import { useContext } from "react";

import { AuthContext } from "./state/AuthState";
import { ConfirmContext } from "./state/ConfirmState";
import { TaskContext } from "./state/TaskState";
import { LoadingContext } from "./state/LoadingState";
import { AlertContext } from "./state/AlertState";



/** get the global authentication or login state */
export const useAuth = () => useContext(AuthContext);


/** toggle the confirmation box using the global confirm state */
export const useConfirm = () => useContext(ConfirmContext);


/** toggle loading screen using the global loading state */
export const useLoading = () => useContext(LoadingContext);


/** toggle loading screen using the global loading state */
export const useAlert = () => useContext(AlertContext);


/** get the global state of todos */
export const useTodo = () => useContext(TaskContext);
