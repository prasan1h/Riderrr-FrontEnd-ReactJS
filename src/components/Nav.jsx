import React from 'react'
import logo from '../assets/logo/Reride_Logo.png'

const Nav = () => {
  return (
    <>
        <header class="p-5 bg-primary">
        <nav class="flex justify-between justify-self-center items-center w-full px-20">
            <div class="flex justify-center items-center">
                <img src={logo} alt="logo" width="200px"/>
            </div>
            <div class="">
                <ul class="flex ">
                    <li class="m-1"><a href="/home.html"
                            class="mx-1 p-2 hover:rounded-lg hover:border-b-4 hover:border-b-secondary">Home</a></li>
                    <li class="m-1"><a href="/buy.html"
                            class="mx-1 p-2 hover:rounded-lg hover:border-b-4 hover:border-b-secondary">Buy</a></li>
                    <li class="m-1"><a href="/sell.html"
                            class="mx-1 p-2 hover:rounded-lg hover:border-b-4 hover:border-b-secondary">Sell</a></li>
                    <li class="m-1"><a href="/about.html"
                            class="mx-1 p-2 hover:rounded-lg hover:border-b-4 hover:border-b-secondary">About</a></li>
                    <li class="m-1"><a href="/contact.html"
                            class="mx-1 p-2 hover:rounded-lg hover:border-b-4 hover:border-b-secondary">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    </>
  )
}

export default Nav