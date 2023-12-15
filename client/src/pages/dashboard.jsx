import { Link } from "react-router-dom";

import { Todo } from "@/components/Todo";
import { useTodo } from "@/context/contextHooks";


export default function Dashboard() {
  const { todos, todosCount, todosDoneCount } = useTodo();

  return (
    <main className="px-3 py-6">
      <div className="max-eye-view">
        <h2>
          <span className="text-prime">Track</span> your Todos: 
        </h2>


        <div className="mb-6">
          {"You've created "}
          <span className="text-prime">{todosCount}</span>
          {" todos and have done "}
          <span className="text-prime">{todosDoneCount}</span> 
          {" of them so far. "} <br /> 
          {"Keep going and "}
          <span className="text-prime">do NOT slack off</span>!
        </div>


        <table><tbody>  
          {todos.map((todo, idx) => (
            <Todo key={idx} idx={idx} {...todo} />
          ))}
        </tbody></table>


        <div className="mt-3">
          <Link to="/todo/add" className="btn btn-second">Add todo</Link>
        </div>
      </div>
    </main>
  )
}
