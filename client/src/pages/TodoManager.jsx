import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm, useTodo } from "@/state/contextHooks";

import TodoForm from "@/components/TodoForm";
import { evalDueDate, extractDate, extractTime } from "@/tools/dateUtils";


export function AddTodo({ className, isExample = false }) {
  const { createTodo } = useTodo();
  const { openConfirm } = useConfirm();
  const redirect = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    due_date: "",
    due_time: "",
  });


  const handleAddSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      ...formData,
      description: formData.description ? formData.description : null,
      due_date: evalDueDate(formData.due_date, formData.due_time), 
    }
    delete todoData.due_time;

    openConfirm("Add new todo?", async () => {
      if(!isExample){
        const allGood = await createTodo(todoData);
        
        if(allGood) redirect('/dashboard', { replace: true });
      }
    });
  }


  return (
    <TodoForm
      handleSubmit={handleAddSubmit}
      btnLabel="Add Todo"
      state={formData}
      setState={setFormData}
      className={className}
    />
  )
}



export function EditTodo() {
  const { id } = useParams();
  const redirect = useNavigate();

  const { editTodo, getOneTodo, currentTodo } = useTodo();
  const { openConfirm } = useConfirm();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    due_date: "",
    due_time: "",
  });


  useEffect(() => {
    setFormData({
      title: currentTodo?.title ?? "",
      description: currentTodo?.description ?? "",
      priority: currentTodo?.priority ?? "low",
      due_date: extractDate(currentTodo?.due_date) ?? "",
      due_time: extractTime(currentTodo?.due_date) ?? "",
    });
  }, [currentTodo]);

  useEffect(() => {
    getOneTodo(id);
  }, [id]);


  const handleEditSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      ...formData,
      description: formData.description ? formData.description : null,
      due_date: evalDueDate(formData.due_date, formData.due_time), 
    }
    delete todoData.due_time;

    openConfirm("Confirm Edit?", async () => {
      if(id > 6){
        const allGood = await editTodo(id, todoData);
  
        if(allGood) redirect('/dashboard', { replace: true });
      }
    })
  }


  return (
    <TodoForm
      handleSubmit={handleEditSubmit}
      btnLabel="Edit Todo"
      state={formData}
      setState={setFormData}
    />
  )
}
