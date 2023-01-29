import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  // </React.StrictMode>,
)
