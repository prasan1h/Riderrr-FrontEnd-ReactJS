import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'

const CustomRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
    </Routes>
  )
}

export default CustomRouter