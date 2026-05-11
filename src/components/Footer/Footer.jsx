import React from 'react'
import { FaGithub, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
      <footer className="w-full bg-white  border-gray-200 mt-5">

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

      
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-gray-800">
            SocialApp
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Connect. Share. Explore.
          </p>
        </div>

        
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Explore</a>
          <a href="#" className="hover:text-blue-500">Messages</a>
          <a href="#" className="hover:text-blue-500">Profile</a>
        </div>

        
        <div className="flex gap-4 text-gray-500 text-lg">
          <FaGithub className="hover:text-black cursor-pointer" />
          <FaTwitter className="hover:text-blue-500 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaFacebook className="hover:text-blue-600 cursor-pointer" />
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
        © {new Date().getFullYear()} Social App . All rights reserved.
      </div>

    </footer>
  )
}
