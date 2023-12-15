import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthState } from "./context/state/AuthState";
import { TaskState } from "./context/state/TaskState";
import { ConfirmState } from "./context/state/ConfirmState";
import { LoadingState } from "./context/state/LoadingState";

import Header from "./components/layouts/Header";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import ConfirmBox from "./components/widgets/ConfirmBox";
import Loader from "./components/widgets/Loader";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import TodoDetails from "./pages/todoDetails";
import { AddTodo, EditTodo } from "./pages/TodoManager";
import NotFound from "./pages/notFound";
import Login from "./pages/acc/login";
import Register from "./pages/acc/register";
import Profile from "./pages/acc/profile";

import "./styles/globals.scss";
import AlertState from "./context/state/AlertState";
import Alert from "./components/widgets/Alert";
import ScrollToTop from "./components/widgets/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <AlertState><LoadingState><AuthState><TaskState>
        <Header />
        <Loader />
        
        <ConfirmState>
          <ConfirmBox />
          <Navbar />
          <Alert />

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

      </TaskState></AuthState></LoadingState></AlertState>
    </BrowserRouter>
  )
}

export default App
