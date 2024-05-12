import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import HomePage from './components/HomePage'
import ScanPage from './components/ScanPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/scan' exact element={<ScanPage />}/>
      </Routes>
    </Router>
  );
}

export default App
