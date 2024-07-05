import './App.css'
import EditTodo from './components/EditTodo'
import Header from './components/Header'
import Input from './components/Input'
import Todos from './components/Todos'
import { useTodo } from './context/TodoProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Task from './components/Task'


function App() {

  const todo = useTodo()

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Todos />} />
          <Route path='/task/:taskId' element={<Task />} />
        </Routes>
        {todo.showForm && <Input />}
        {todo.editStatus && <EditTodo />}
      </BrowserRouter>
    </div>
  )
}

export default App
