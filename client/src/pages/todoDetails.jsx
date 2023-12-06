import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import NotFound from "./notFound";
import { useConfirm, useTodo } from "@/state/contextHooks";


export default function TodoDetails() {
  const { id } = useParams();
  const { currentTodo, getOneTodo, deleteTodo } = useTodo();
  const { openConfirm } = useConfirm();
  const redirect = useNavigate();


  const handleDelete = () => {
    openConfirm("Delete task? Action is permanent!", async () => {
      if(id > 6){ // ignore examples
        const allGood = await deleteTodo(id);
        
        if(allGood) redirect('/dashboard', { replace: true });
      }
    })
  }

  useEffect(() => {
    getOneTodo(id);
  }, [id]);


  return currentTodo ? (
    <main className="py-6 px-3">
      <div className="max-eye-view">
        {currentTodo.done && (
          <div>
            This task is <span className="text-prime">done</span>.
          </div>
        )}

        <div className="overflow-x-auto border-2 border-weak">
          <table className="w-full">
            <tbody className="table-diff-bgs">
              {Object.keys(currentTodo).map(
                (key, idx) => currentTodo[key] && key !== "user_id" && key !== "done" ? (
                  <tr key={idx}>
                    <th className="px-3 py-1.5 text-left text-prime">{key}</th>
                    <td className="whitespace-nowrap px-3 py-1.5">{
                      key === "due_date" || key === "created_at"
                      ? new Date(currentTodo[key]).toString().split("(")[0] 
                      : currentTodo[key]
                    }</td>
                  </tr>
                ) : null
              )}    
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-3">
          {!currentTodo.done && (
            <Link to={`/todo/edit/${id}`} className="btn btn-second">
              <i className="fa-solid fa-pen-to-square"></i>
              {" EDIT"}
            </Link>
          )}

          <button className="btn bg-high text-dark font-bold" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
            {" DELETE"}
          </button>
        </div>
      </div>
    </main>
  ) : (
    <NotFound thing="todo" />
  )
}
