import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider'



export default function Products() {
  const [product, setproduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  let { addToCart } = useContext(cartContext)

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/products')
    setproduct(data.data)
    setisLoading(false)
  }
  useEffect(() => {
    getProducts()
  }, [])


  return <>

    <div className="container row mx-auto">
    <h2 className=' text-main mt-5 pt-5 text-center'>Products</h2>
      {isLoading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> : <>{product.map((ele) => <div className="col-md-4 col-lg-3 col-xl-20 overflow-hidden" key={ele._id}>
        <div className="product py-3 px-2">
          <Link to={'/ProductDetails/' + ele._id}>
            <img src={ele.imageCover} className="w-100" />
            <span className="text-main font-sm fw bold">{ele.category.name}</span>
            <h3 className="h6 bolder">{ele.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{ele.price}EGP</span>
              <span><i className="fa fa-star rating-color"></i>{ele.ratingsAverage}</span>
            </div>
          </Link>
          <button onClick={() => { addToCart(ele._id) }} className="btn bg-main w-100">+Add</button>
        </div>
      </div>
      )}</>}


    </div>
  </>
}