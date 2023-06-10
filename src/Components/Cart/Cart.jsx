import React, {useEffect, useState } from 'react'
import styles from './Cart.module.css'
import empty from '../../imgs/img.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllItem, deleteMyItem, getCartItems, updateCount } from '../../redux/slices/cartSlice'

export default function Cart() {

 let {loading,cartList,cartNumber,CartId,cartTotalPrice}=useSelector(store=>store.CartReducer)
  let dispatch=useDispatch()


 console.log(loading,cartList,cartNumber,CartId,cartTotalPrice);
 
  useEffect(() => {
    dispatch(getCartItems())
  }, [])


  return <>
  <div className="container">
  <h2 className=' text-main mt-5 pt-5 text-center'>My Cart</h2>
    {loading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> :
      <>
      {cartList.lenght==0||cartNumber==0? <div className='container text-center stretshHeight2 '>
        <img src={empty} className='w-75 d-block mx-auto ' />
        <Link to={"/"} className='btn btn-outline-info w-50'>Shop Now</Link>
      </div>:
      <div className="container stretshHeight3">
        {cartList?.map((ele) => <div className='row py-3 align-items-center justify-content-center shadow-lg my-3 ' key={ele.product._id}>
          <div className="col-md-4">
            <div className='text-center'>
              <img src={ele.product.imageCover} className='w-50' />
            </div>
          </div>
          <div className="col-md-6">
            <span className='text-main font-sm fw-bold'>{ele.product.category.name}</span>
            <h3 className='fw-bolder h6'>{ele.product.title.split(' ').slice(0, 2).join(' ')}</h3>

            <div className='d-flex justify-content-between'>
              <span className='text-muted'>{ele.price * ele.count} EGP</span>

              <span>
                <i className='fa fa-star rating-color'></i>
                {ele.product.ratingsAverage}
              </span>
            </div>
            
            <div className='w-100 text-center bg-main text-info  py-1 px-3 my-2'>{ele.count} count</div>


          </div>
          <div className="col-md-2">
            <div>
              <button onClick={()=>{dispatch(updateCount({id:ele.product.id,hamada:ele.count+1}))}} className='btn btn-outline-success w-100' >+</button>
              <button onClick={()=>{
                if(ele.count==1){
                  dispatch(deleteMyItem(ele.product.id))
                }else{
                
                dispatch(updateCount({id:ele.product.id,hamada:ele.count-1}))}}} className='btn btn-outline-success my-3 w-100' >-</button>
            </div>
            <button className='btn btn-outline-danger w-100'onClick={()=>{dispatch(deleteMyItem(ele.product.id))}} >del</button>
          </div>
        </div>)}
        <span className='btn w-100 bg-main text-white'>Total Price {cartTotalPrice} EGP</span>
        <Link to={'CreatCashOrder/'+CartId} className='btn my-3 btn-outline-success w-100 '>creat cash order</Link>
        <button className='btn btn-outline-danger w-100'onClick={()=>{dispatch(deleteAllItem())}} >Clear Cart</button>
      </div>
      }
      </>
    }
</div>
  </>
}
