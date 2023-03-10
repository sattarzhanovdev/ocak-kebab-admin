import React from 'react'
import { MainComponents } from './components/mainComponents'
import Routes from './routes'
import './App.scss'

function App() {
  return (
    <div>
      <MainComponents.Sidebar />  
      <Routes />
    </div>
  )
}

export default App