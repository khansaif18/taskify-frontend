import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import TaskProvider from './context/TaskProvider.jsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <App />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
