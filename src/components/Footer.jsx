import React from 'react'
import logo from '../assets/logo/logo_white.png'

const Footer = () => {
  return (
    <>
        <footer class="bg-white">
        <section class="bg-secondary py-10">
            <article class="bg-white max-w-6xl mx-auto rounded-[30px] flex flex-col py-10 ">
                <div class="text-center text-secondary text-5xl font-semibold py-3">
                    <p>Ready for Ride ?</p>
                </div>
                <div class="text-center text-secondary text-md pb-6">
                    <p>Whether you are upgrading or selling, we make it simple.</p>
                </div>
                <div class="flex flex-row justify-center items-center gap-5">
                    <a href="/buy.html"
                        class="border-2 border-secondary rounded-full bg-white text-secondary px-7 py-2 text-xl text-center align-middle font-bold">Buy
                        a Bike</a>
                    <a href="/sell.html"
                        class="border-2 border-primary bg-secondary text-white rounded-full px-7 py-2 text-xl text-center align-middle font-bold">Sell
                        Your Bike</a>
                </div>
            </article>
            <article>
                <div class="flex flex-col max-w-6xl mx-auto gap-5 py-10">
                    <div class="flex flex-row justify-center">
                        <div class="w-1/3"><img src={logo} alt="logo" width="200px"/></div>
                        <div class="w-1/3 text-white text-2xl font-bold pl-20">
                            <p>Quick Links</p>
                        </div>
                        <div class="w-1/3 text-white text-2xl font-bold pl-20">
                            <p>Reach Us</p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center">
                        <div class="w-1/3 text-white">
                            <p>Trusted by thousands of riders in Bengaluru.
                                The safest way to buy and sell used two-wheelers.</p>
                        </div>
                        <div class="w-1/3 text-white pl-20">
                            <ul class="flex flex-col gap-3">
                                <li><a href="/about.html">About Us</a></li>
                                <li><a href="/contact.html">Contact Us</a></li>
                                <li><a href="#">Privacy Policies</a></li>
                            </ul>
                        </div>
                        <div class="w-1/3 text-white flex flex-col gap-5  pl-20">
                            <div class="flex flex-col ">
                                <p>Jalahalli, Bengaluru, KA 560003</p>
                                <p>support@reride.com</p>
                            </div>
                            <div class="flex gap-8">
                                <a href="https://www.facebook.com/" target="_blank"><i data-lucide="facebook"></i></a>
                                <a href="https://www.instagram.com/?hl=en" target="_blank"><i data-lucide="instagram"></i></a>
                                <a href="https://x.com/" target="_blank"><i data-lucide="twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <div class="bg-secondary flex justify-center text-white text-center pb-[35px]">
            <p> &copy; 2026 ReRide Bikes. design and developed by thincnext</p>
        </div>
    </footer>
    </>
  )
}

export default Footer