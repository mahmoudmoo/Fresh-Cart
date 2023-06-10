import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import CategoorySlider from '../CategoorySlider/CategoorySlider'
import Products from '../Products/Products'
import axios from 'axios'
import { getCartItems } from '../../redux/slices/cartSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  let headers = { token: localStorage.getItem('token') }

console.log(headers);
let dispatch=useDispatch()
  useEffect(() => {
    dispatch(getCartItems())
  }, [])
  
return <>

  <div className="container pt-5  mt-5">
  <h2 className=' text-main text-center'>Categoory</h2>
  <CategoorySlider/>  
  <Products/>

  </div>
  </>
}
