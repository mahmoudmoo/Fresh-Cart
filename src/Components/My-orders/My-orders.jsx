import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
// import styles from './MyOrders.module.css'
import cartEmpty2 from '../../imgs/img.jpg'
import { Link } from 'react-router-dom'

export default function MyOrders() {
  const [orders,setorders]=useState([])

  const [isLoading,setisloading]=useState(false)
let {id}=jwtDecode(localStorage.getItem('token'))
  async function getMyOrders(){
    
    setisloading(true)
    let {data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${id}`)
    console.log(data);
    setorders(data)
    setisloading(false)
  }

  useEffect(() => {
  getMyOrders()
  
  }, [])
  
  
  return <>
  <div className="container">
  <h2 className=' text-main mt-5 pt-5 text-center'>My orders</h2>

    {isLoading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> :
      <>
       
       {orders.length===0 ? <div className='container mt-5 pt-5  text-center '>
           <img src={cartEmpty2} alt="" className='w-50' />
           <div>
             <Link to={'/'} className='btn btn-info w-100'>Shop Now</Link>
           </div>
         </div>:
         <>
          {orders.map((ele,index)=>{
           return <div className='container row mx-auto  py-3 px-2 rounded my-5 shadow justify-content-center align-items-center'>
                <div className="col-md-4 ">
                <h3 className='fw-bolder text-muted'>Order : <span className='text-main'> {index+1}</span></h3>
                 <h3 className='fw-bolder text-muted'>total Price : <span className='text-main'>{ele.totalOrderPrice} EGP</span></h3>
                 <h3 className='fw-bolder text-muted'>order created at : <span  className='text-main'> {ele.createdAt}</span></h3>
                 <h3 className='fw-bolder text-muted'>Payment type : <span className='text-main'>{ele.paymentMethodType}</span></h3>
                </div>
                <div className="col-md-8">
                <div className='row'>
                 {ele.cartItems.map((item)=>{
                   return <div className="col-md-2 text-center mx-auto">
                    <div>
                    <img src={item.product.imageCover} className='w-50 rounded shadow' alt="" />
                     <p className='fw-bolder h6 pt-1 '>{item.product.title.split(' ').slice(0, 2).join(' ')}</p>
                     <span className='text-main'>{item.price} EGP</span>
                     <p className='text-main'>Quantity: {item.count}</p>
                    </div>
                   </div>
                 })}
                </div>
                </div>
           </div>
                 })}
                 </>
               
 
 }
 
      
  
       
       </>}
       </div>
   </>
}
