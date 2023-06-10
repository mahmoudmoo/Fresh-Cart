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
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import MyOrders from './Components/My-orders/My-orders'
import CreatCashOrder from './Components/Creat-cash-order/Creat-cash-order'
import { store } from './redux/store'
import { Provider } from 'react-redux'
export default function App() {
  
  const [userData, setuserData] = useState(null)  
  let headers = { token: localStorage.getItem('token') }
  
  function getToken() {
    setuserData(jwtDecode(localStorage.getItem('token')))
  }
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      getToken()      
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
<Provider store={store}>
      <RouterProvider router={routers}>
      </RouterProvider>
      <Toaster />
</Provider>
  </>
}
