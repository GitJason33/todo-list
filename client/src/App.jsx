import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthState } from "./state/AuthState";
import { TaskState } from "./state/TaskState";
import { ConfirmState } from "./state/ConfirmState";

import Header from "./components/layouts/Header";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import ConfirmBox from "./components/ConfirmBox";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import TodoDetails from "./pages/todoDetails";
import { AddTodo, EditTodo } from "./pages/TodoManager";
import NotFound from "./pages/notFound";
import Login from "./pages/acc/login";
import Register from "./pages/acc/register";
import Profile from "./pages/acc/profile";

import "./styles/globals.scss";


function App() {
  return (
    <AuthState>
      <TaskState>

      <BrowserRouter>
        <Header />
        
        <ConfirmState>
          <Navbar />
          <ConfirmBox />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            
            <Route path="/todo/add" element={<AddTodo />} />
            <Route path="/todo/edit/:id" element={<EditTodo />} />
            <Route path="/todo/:id" element={<TodoDetails />}/>

            <Route path="/acc/login" element={<Login />} />
            <Route path="/acc/register" element={<Register />} />
            <Route path="/acc/profile" element={<Profile />} />

            <Route path="/*" element={<NotFound thing="page"/>}/>
          </Routes>

          <Footer />
        </ConfirmState>
      </BrowserRouter>

      </TaskState>
    </AuthState>
  )
}

export default App
