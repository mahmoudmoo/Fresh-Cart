import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import empty from '../../imgs/img.jpg'
import { cartContext } from '../../Context/CartContextProvider'
import { Link } from 'react-router-dom'

export default function Cart() {

  const [isLoading, setisLoading] = useState(false)
  
  let { getCart,cartnumber,setcartnumber, updateCount, deleteItem, deleteAllItem,cartPrice, setcartPrice } = useContext(cartContext)
  const [cart, setcart] = useState([])
  const [cartId, setCartId] = useState(null)
  async function getmycart() {
    setisLoading(true)
    let res = await getCart()
    if(res.name==="AxiosError"){
      setcart(null)
      setcartnumber(0)
      setcartPrice(0)
      setisLoading(false)
    }else{
      let {data}=res
      setCartId(data.data._id)
      
      setcart(data.data.products)
      setcartnumber(data.numOfCartItems)
      setcartPrice(data.data.totalCartPrice)
      setisLoading(false)
    }
  }
  async function updatmycart(x, y) {
    let { data } = await updateCount(x, y)
    setcart(data.data.products)
    setcartnumber(data.numOfCartItems)
    setcartPrice(data.data.totalCartPrice)
  }
  async function deleteMyItem(x) {
    let { data } = await deleteItem(x)
    setcart(data.data.products)
    setcartnumber(data.numOfCartItems)
    setcartPrice(data.data.totalCartPrice)
  }

  async function deleteMyAllItem(x) {
    let { data } = await deleteAllItem(x)
    setcart(null)
    setcartnumber(0)
    setcartPrice(0)
  }
  useEffect(() => {
    getmycart()
  }, [])


  return <>
  <div className="container">
  <h2 className=' text-main mt-5 pt-5 text-center'>My Cart</h2>
    {isLoading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> :
      <>
      {cart===null||cartnumber==0? <div className='container text-center '>
        <img src={empty} className='w-50 d-block mx-auto ' />
        <Link to={"/"} className='btn btn-outline-info w-50'>Shop Now</Link>
      </div>:
      <div className="container">
        {cart?.map((ele) => <div className='row py-3 align-items-center justify-content-center shadow-lg my-3' key={ele.product._id}>
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

            <div className='w-100 text-center bg-main text-white  py-1 px-3 my-2'>{ele.count} count</div>


          </div>
          <div className="col-md-2">
            <div>
              <button className='btn btn-outline-success w-100' onClick={() => updatmycart(ele.product._id, ele.count + 1)}>+</button>
              <button className='btn btn-outline-success my-3 w-100' onClick={() => {
                if (ele.count == 1) {
                  deleteMyItem(ele.product._id)
                } else {
                  updatmycart(ele.product._id, ele.count - 1)
                }

              }}>-</button>
            </div>
            <button className='btn btn-outline-danger w-100' onClick={() => deleteMyItem(ele.product._id)}>del</button>
          </div>
        </div>)}
        <span className='btn w-100 bg-main text-white'>Total Price {cartPrice} EGP</span>
        <Link to={'CreatCashOrder/'+cartId} className='btn my-3 btn-outline-success w-100 '>creat cash order</Link>
        <button className='btn btn-outline-danger w-100' onClick={() => deleteMyAllItem()}>Clear Cart</button>
      </div>
      }
      </>
    }
</div>
  </>
}
