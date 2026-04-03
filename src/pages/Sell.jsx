import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SellBanner from '../components/sell/SellBanner'
import StepCounter from '../components/sell/StepCounter'

const Sell = () => {
  return (
    <>
    <Nav/>
    <SellBanner/>
    <StepCounter/>
    <Footer/>
    </>
  )
}

export default Sell