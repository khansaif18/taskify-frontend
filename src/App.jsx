import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Task from './pages/Task'
import Tasks from './pages/Tasks.jsx'


function App() {

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Tasks />} />
        <Route path='/:taskId' element={<Task />} />
      </Routes>
    </div>
  )
}

export default App
