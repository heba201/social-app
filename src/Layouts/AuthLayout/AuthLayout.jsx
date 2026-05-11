import React from 'react'
import authImg from '../../assets/auth/download.png'
import { Outlet } from 'react-router'
export default function AuthLayout() {
  return (
    <div className="mx-auto min-h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 shrink-0 h-48  md:h-screen">
          <img src={authImg} alt="auth" className='w-full h-full object-cover' />
         </div>
        <div className="w-full md:w-2/3 flex-1 flex items-center justify-center overflow-auto px-4 sm:px-6 lg:px-8 py-6 md:py-0">
        <Outlet/>
        </div>
    </div>
  )
}
