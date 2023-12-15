import { Link } from "react-router-dom";

import styles from "@/styles/todos.module.scss";
import { dropdown } from "@/styles/layouts.module.scss";
import { useConfirm, useTodo } from "@/context/contextHooks";


export function Todo({ 
  _id, 
  title, 
  idx, 
  priority = "low", 
  due_date = null, 
  done = false, 
  // isExample = false,
}) {
  return (
    <tr className={done ? styles.todoIsDone : ""}>
      <td>
        <TodoCheckbox done={done} todo_id={_id} />
      </td>

      <th className={styles.taskNo}>
        <Link to={`/todo/${_id}`}>
          {("" + ++idx).padStart(3, "0")}
        </Link>:
      </th>

      <td className={styles.taskTitle}>{title}</td>

      <td aria-label="due-date" className="relative">
        {due_date && (
          <>
            <i className={`fa-solid fa-clock ${styles.todoDueDate}`}></i>

            <menu className={`${dropdown} dropdown`}>
              <span>
                due until {new Date(due_date).toString().split("GMT")[0]}
              </span>
            </menu>
          </>
        )}
      </td>

      <td>
        <TodoPriority priority={priority}/>
      </td>
    </tr>
  )
}



export function TodoPriority({ priority }){
  let colors;

  if(priority === "high"){
    colors = {
      bg: "bg-high/30",
      text: "text-high"
    }
  }else if(priority === "medium"){
    colors = {
      bg: "bg-medium/30",
      text: "text-medium"
    }
  }else{
    colors = {
      bg: "bg-low/30",
      text: "text-low"
    }
  }


  return (
    <div className={`${colors.bg} rounded-md px-3 text-center`}>
      <span className={`${colors.text}`}>{priority}</span>
    </div>
  )
}



function TodoCheckbox({ done = false, todo_id }){ 
  const { openConfirm } = useConfirm();
  const { markTodoDone } = useTodo();

  const handleUndoneClick = () => {
    openConfirm(
      "Mark this todo complete?", 
      () => markTodoDone(todo_id)
    );
  }

  return (
    <button className={styles.taskCheckbox} onClick={!done ? handleUndoneClick : () => {}}>
      {done && (
        <i className="fa-solid fa-xmark"></i>
      )}
    </button>
  )
}