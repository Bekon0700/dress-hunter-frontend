import React from 'react'
import { AiFillLinkedin, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white py-12 pb-24 lg:pb-8">
        <div className="w-11/12 lg:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-lg font-semibold flex flex-col gap-3 p-4">
            <p className="text-2xl">© Copyright 2022. All Rights Reserved.</p>
            <p>Technologies are given below and this webpage is fully responsive.</p>
            <p>All design related task was done by <span className="text-yellow-200">Tailwindcss</span></p>
            <div className="font-crimson-text text-xl font-bold text-cyan-400 ">
              <p className=" hover:border-l-4 hover:pl-5 py-2">React</p>
              <p className=" hover:border-l-4 hover:pl-5 py-2">Firebase</p>
              <p className=" hover:border-l-4 hover:pl-5 py-2">Daisy UI</p>
              <p className="inline hover:border-l-4 hover:pl-5 py-2">TailwindCSS</p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-4">
            <p className="text-3xl font-semibold text-green-500">Hire me</p>
            <div className="flex items-center gap-3 text-4xl">
              <a href="https://www.linkedin.com/in/bekon0700/" target='_blank' rel="noopener noreferrer"><AiFillLinkedin /></a>
              <a href="https://www.facebook.com/Bekon070/" target='_blank' rel="noopener noreferrer"><AiFillFacebook /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer