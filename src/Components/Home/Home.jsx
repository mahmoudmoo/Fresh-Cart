import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import CategoorySlider from '../CategoorySlider/CategoorySlider'
import Products from '../Products/Products'
import { cartContext } from '../../Context/CartContextProvider'
import axios from 'axios'

export default function Home() {
  let headers = { token: localStorage.getItem('token') }
let {setcartnumber}=useContext(cartContext)

 async function getNumOnFirst() {
    let res =await axios('https://route-ecommerce-app.vercel.app/api/v1/cart', { headers })
    if (res.name === "AxiosError") {
      setcartnumber(0)
    } else {
        setcartnumber(res?.data?.numOfCartItems)
    }
  }

  useEffect(() => {
    getNumOnFirst()
  }, [])
  
return <>

  <div className="container pt-5  mt-5">
  <h2 className=' text-main text-center'>Categoory</h2>
  <CategoorySlider/>  
  <Products/>

  </div>
  </>
}
