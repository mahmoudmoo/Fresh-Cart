import React, { useContext, useEffect, useState } from 'react'
// import styles from './ProductsByBrands.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { cartContext } from '../../Context/CartContextProvider'


export default function ProductsByBrands() {
  let { addToCart } = useContext(cartContext)



  let { id } = useParams()
  const [product, setproduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  async function getProductsByBrands() {
    setisLoading(true)
    let { data } = await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?brand=${id}`)
    setproduct(data.data)
    setisLoading(false)
  }
  useEffect(() => {
    getProductsByBrands()
  }, [])


  return <>
    <div className="container row mx-auto">
      <h2 className=' text-main mt-5 pt-5 text-center'>Products</h2>
      {isLoading ? <div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div> : <>


        {product.length == 0 ? <>

          <div className='text-center my-5'>
            <h3 className='fw-bolder'>There are no products at the moment and will be available soon</h3>
          </div>
        </> : null}


        {product.map((ele) => <div className="col-md-3 overflow-hidden" key={ele._id}>

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
