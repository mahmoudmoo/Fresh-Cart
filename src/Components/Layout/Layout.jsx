import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'

export default function Layout({userData,setuserData}) {
  return <>
  <Navbar userData={userData}setuserData={setuserData}/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
