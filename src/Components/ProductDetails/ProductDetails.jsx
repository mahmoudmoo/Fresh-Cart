import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import { getProductData } from '../../redux/slices/proudctSlice'
import { addToCart } from '../../redux/slices/cartSlice'

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let { id } = useParams()
  let { productDataList, loading } = useSelector((state) => state.productReducer)
  let disbatch = useDispatch()



  useEffect(() => {
 disbatch(getProductData(id))
  }, [])



  return <>
    <div className="row container mt-5 mx-auto align-items-center g-5">
      {loading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> : <>
        <div className="col-md-4">
          <div>
            <Slider {...settings}>
              {productDataList?.images?.map((img) => <img src={img} />)}
            </Slider>
          </div>
        </div>
        <div className="col-md-8">
          <div>
            <h3 className="fw-bolder">{productDataList.title}</h3>
            <h6 className='py-2'>{productDataList.description}</h6>
            <h6 className='text-main '>{productDataList?.category?.name}</h6>
            <h6 className='text-main '>{productDataList?.brand?.name}</h6>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted">{productDataList.price}EGP</span>
              <span><i className="fa fa-star rating-color"></i>{productDataList.ratingsAverage}</span>
            </div>
            <button onClick={() => { disbatch(addToCart(productDataList._id)) }} className="btn bg-main w-100">+Add</button>
          </div>
        </div>
      </>}
    </div>

  </>
}
