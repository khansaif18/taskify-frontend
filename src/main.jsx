import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodoProvider } from './context/TodoProvider.jsx'
import ToastNoti from './components/ToastNoti.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
      <ToastNoti/>
    </TodoProvider>
  </React.StrictMode>,
)
