import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { cartContext } from '../../Context/CartContextProvider'

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [isLoading, setisLoading] = useState(false)
  let {addToCart}=useContext(cartContext)
  const [ProductDetails, setProductDetails] = useState({})

let{id}=useParams()

async function getProductDetails(){
  setisLoading(true)
  let {data} =await axios(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
  setProductDetails(data.data)
  setisLoading(false)
}
useEffect(() => {
 getProductDetails()
}, [])


return <>
  <div className="row container mt-5 mx-auto align-items-center g-5">
  {isLoading?<div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div>:<>
    <div className="col-md-4">
      <div>
      <Slider {...settings}>
          {ProductDetails?.images?.map((img)=><img src={img} />)}
        </Slider>
      </div>
    </div>
    <div className="col-md-8">
      <div>
        <h3 className="fw-bolder">{ProductDetails.title}</h3>
        <h6 className='py-2'>{ProductDetails.description}</h6>
        <h6 className='text-main '>{ProductDetails?.category?.name}</h6>
        <h6 className='text-main '>{ProductDetails?.brand?.name}</h6>
        <div className="d-flex justify-content-between py-2">
      <span className="text-muted">{ProductDetails.price}EGP</span>
      <span><i className="fa fa-star rating-color"></i>{ProductDetails.ratingsAverage}</span>
    </div>
    <button onClick={()=>{addToCart(ProductDetails._id)}} className="btn bg-main w-100">+Add</button>
      </div>
    </div>
    </>}
  </div>

  </>
}
