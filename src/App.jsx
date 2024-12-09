import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from "./assets/logo.png"
import { FaMusic } from "react-icons/fa6";
import { IoMdInformation } from "react-icons/io";
import gredupedia5 from "./assets/gredupedia5.png"
import { MdLeaderboard } from "react-icons/md";
import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/home'
import Play from './components/play'

function App() {
  const [count, setCount] = useState(0)

  return (
 <HashRouter>

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/play' element={<Play/>}/>
  </Routes>
 </HashRouter>
  )
}

export default App
