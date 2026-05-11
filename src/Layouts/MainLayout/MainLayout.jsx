import React from 'react'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router'
import NavbarComponent from '../../components/Navbar/Navbar'

export default function MainLayout() {
  return (
   <>
   <NavbarComponent/>
   <Outlet/>
   <Footer/>
   </>
  )
}
