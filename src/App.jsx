import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Api2 from './Components/Pages/Api2'
import Login from './Components/Pages/Login'
// import Api from './Components/Pages/Api'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Api/> */}
      <ToastContainer/>

      <Api2/>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <Login/>
      
    </>
  )
}

export default App
