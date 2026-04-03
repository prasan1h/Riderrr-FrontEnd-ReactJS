import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Buy from '../pages/Buy'
import Sell from '../pages/Sell'
import About from '../pages/About'
import Contact from '../pages/Contact'

const CustomRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/' element={<Buy/>}></Route>
        <Route path='/' element={<Sell/>}></Route>
        <Route path='/' element={<About/>}></Route>
        <Route path='/' element={<Contact/>}></Route>
    </Routes>
  )
}

export default CustomRouter