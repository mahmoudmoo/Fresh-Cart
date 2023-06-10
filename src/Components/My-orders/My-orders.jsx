import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
// import styles from './MyOrders.module.css'
import cartEmpty2 from '../../imgs/img.jpg'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../../redux/slices/myOrderSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function MyOrders() {
  

  let { myOrderList, loading } = useSelector((state) => state.myorderReducer)
  let disbatch = useDispatch()



  useEffect(() => {
 disbatch(getMyOrders())
  }, [])
  
  return <>
  <div className="container ">
  <h2 className=' text-main mt-5 pt-5 text-center'>My orders</h2>

    {loading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> :
      <>
       
       {myOrderList.length===0 ? <div className='container   text-center stretshHeight2'>
           <img src={cartEmpty2} alt="" className='w-75 d-block mx-auto ' />
           
             <Link to={'/'} className='btn btn-outline-info w-50'>Shop Now</Link>
           
         </div>:
         <>
          {myOrderList.map((ele,index)=>{
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
