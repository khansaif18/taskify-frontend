import { useEffect } from 'react'
import './App.css'
import EditTodo from './components/EditTodo'
import Header from './components/Header'
import Input from './components/Input'
import PlusIcon from './components/PlusIcon'
import Todos from './components/Todos'
import { useTodo } from './context/TodoProvider'
import toast from 'react-hot-toast'

function App() {

  const todo = useTodo()

  useEffect(() => {
    const timer = setTimeout(() => {
      toast('Welcome to Taskify', {
        icon: '🥱'
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className='app'>
      <Header />
      <Todos />
      <PlusIcon />
      {todo.showForm && <Input />}
      {todo.editStatus && <EditTodo />}
    </div>
  )
}

export default App
