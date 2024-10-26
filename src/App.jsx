import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Task from './pages/Task'
import { serviceWorker } from './service/serviceWorker.js'
import { useEffect } from 'react'


function App() {
  // useEffect(() => { serviceWorker() }, [])
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:taskId' element={<Task />} />
      </Routes>
    </div>
  )
}

export default App
