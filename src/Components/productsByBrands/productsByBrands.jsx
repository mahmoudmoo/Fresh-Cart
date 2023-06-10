import React, { useContext, useEffect, useState } from 'react'
// import styles from './ProductsByBrands.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByBrands } from '../../redux/slices/proudctSlice'
import { addToCart } from '../../redux/slices/cartSlice'


export default function ProductsByBrands() {




  let { id } = useParams()
  let { proudctBrandList, loading } = useSelector((state) => state.productReducer)
  let disbatch = useDispatch()



  useEffect(() => {
 disbatch(getProductsByBrands(id))
  }, [])


  return <>
    <div className="container row mx-auto">
      <h2 className=' text-main mt-5 pt-5 text-center'>Products</h2>
      {loading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> : <>


        {proudctBrandList?.length == 0 ? <>

          <div className='text-center stretshHeight2'>
            <h3 className='fw-bolder mx-auto'>There are no products at the moment and will be available soon</h3>
          </div>
        </> : null}


        {proudctBrandList?.map((ele) => <div className="col-md-3 overflow-hidden" key={ele._id}>

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
            <button onClick={() => {disbatch(addToCart(ele._id)) }} className="btn bg-main w-100">+Add</button>
          </div>
        </div>
        )}</>}


    </div>

  </>
}
