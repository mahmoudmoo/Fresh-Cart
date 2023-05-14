import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import SignUp from './Components/SignUp/SignUp'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import LogIn from './Components/LogIn/LogIn'
import NotFound from './Components/NotFound/NotFound'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import jwtDecode from 'jwt-decode'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import ProductsByCategories from './Components/productsByCategories/productsByCategories'
import ProductsByBrands from './Components/productsByBrands/productsByBrands'
import CartContextProvider from './Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios'
import MyOrders from './Components/My-orders/My-orders'
import CreatCashOrder from './Components/Creat-cash-order/Creat-cash-order'

export default function App() {
  const [cartnumber, setcartnumber] = useState(0)
  const [userData, setuserData] = useState(null)  
  let headers = { token: localStorage.getItem('token') }

  async function getNumOnFirst() {
    let res =await axios('https://route-ecommerce.onrender.com/api/v1/cart', { headers })
    if (res.name === "AxiosError") {
      setcartnumber(0)
    } else {
        setcartnumber(res?.data?.numOfCartItems)
    }
  }

  function getToken() {
    setuserData(jwtDecode(localStorage.getItem('token')))
  }

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      getToken()
      getNumOnFirst()
      // getcart()
    }
  }, [])
  let routers = createHashRouter([
    {
      path: '', element: <Layout setuserData={setuserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'signup', element: <SignUp /> },
        { path: 'login', element: <LogIn getToken={getToken} /> },
        { path: 'productDetails/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: 'ProductsByCategories/:id', element: <ProtectedRoutes><ProductsByCategories /></ProtectedRoutes> },
        { path: 'ProductsByBrands/:id', element: <ProtectedRoutes><ProductsByBrands /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'MyOrders', element: <ProtectedRoutes><MyOrders/></ProtectedRoutes> },
        { path: 'cart/CreatCashOrder/:id', element: <ProtectedRoutes><CreatCashOrder /></ProtectedRoutes> },
        { path: '*', element: <NotFound /> },


      ]
    }
  ])

  return <>

    <CartContextProvider cartnumber={cartnumber} setcartnumber={setcartnumber}>
      <RouterProvider router={routers}>
      </RouterProvider>
      <Toaster />
    </CartContextProvider>



  </>

}
