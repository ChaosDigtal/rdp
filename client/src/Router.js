import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./Pages/Signin/Signin"
import Signup from "./Pages/Signup/Signup"
import Dashboard from "./Pages/Dashboard/Dashboard"

export default function Routers() {
    return (
      <Router basename='/rdp'>
        <Routes>
          <Route exact path='/' element={<Signin />}></Route>
        
          <Route path='/Signin' element={<Signin />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    )
  }
