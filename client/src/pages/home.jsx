import { Todo } from "@/components/Todo";
import { useTodo } from "@/context/contextHooks";
import styles from "@/styles/home.module.scss";
import { AddTodo } from "./TodoManager";
import { Link } from "react-router-dom";


export default function Home() {


  return (
    <main className='pb-6'>
      <HomeEntry />

      <TodoShowcase />

      <CustomizeSection /> 

      <SignUpSection />
    </main>
  );
}



function HomeEntry() {
  return (
    <section className={styles.homeEntry}>
      {/* b is second color, span is prime */}
      <h1>
        Must have been a <span>rough</span> journey managing your precious <span>time</span> and <span>tasks</span>!
      </h1>

      <div className={styles.entryBgOverlay}></div>
    </section>
  )
}



function TodoShowcase(){
  const { exampleTodos: todos } = useTodo();


  return (
    <section className="p-3">
      <h2 className="max-eye-view">
        <span className="text-prime">Manage </span> 
        your tasks
      </h2>

      <table className="space-y-1.5 max-eye-view"><tbody>
        {todos.map((todo, idx) => (
          <Todo key={idx} {...todo} idx={idx} isExample />
        ))}
      </tbody></table>
    </section>
  )
}



function CustomizeSection() {
  return (
    <section className="p-3">
      <h2 className="max-eye-view">
        <span className="text-prime">Customize</span>
        {" them as you like"}
      </h2>

      <AddTodo className="!p-0" isExample />
    </section>
  )
}



function SignUpSection() {

  return (
    <section className="p-3">
      <h2 className="max-eye-view">
        What are you waiting {"for? "}
        <span className="text-prime">Try it for free</span>!
      </h2>

      <div className="max-eye-view mt-3">
        <Link to="/acc/register" className="btn btn-second">
          <i className="fa-solid fa-right-to-bracket"></i>
          {" REGISTER"}
        </Link>
      </div>
    </section>
  )
}