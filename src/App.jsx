import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import Tarjeta from './layouts/Tarjeta'
import Personas from './layouts/Personas'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/tarjeta' element={<Tarjeta/>}/>
        <Route path='/tarjeta/:id' element={<Tarjeta/>}/>
        <Route path='/personas' element={<Personas/>}/>
      </Routes>
    </>
  )
}

export default App
