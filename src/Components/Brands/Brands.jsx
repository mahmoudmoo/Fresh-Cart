import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Brands() {
  const [brands, setbrands] = useState([])
  const [isLoading, setisLoading] = useState(false)
  


  async function getbrands() {
    setisLoading(true)
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/brands')
    setbrands(data.data)
    setisLoading(false)
  }

  useEffect(() => {

    getbrands()

  }, [])

return <>
<div className="row g-4 container mx-auto">
<h2 className=' text-main mt-5 pt-5 text-center'>brands</h2>

{isLoading?<div className='col-12 text-center my-5 py-5'
><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i>
</div>:brands.map((ele)=><div className='col-md-4 col-6 col-lg-3 col-xl-2' key={ele._id}>
  <Link to={'/ProductsByBrands/'+ele._id}><div className='rounded-circle overflow-hidden'>
      <img src={ele.image} height={150}className='w-100'alt=''/>
      <h3 className='h6 text-center py-2 text-main'>{ele.name}</h3>
      </div>
      </Link>
    </div>)}</div>
  </>
}
