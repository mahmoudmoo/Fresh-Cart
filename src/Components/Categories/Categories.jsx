import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Categories() {
  const [cate, setcate] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getCate() {
    setisLoading(true)
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/categories')
    setcate(data.data)
    setisLoading(false)
  }

  useEffect(() => {

    getCate()

  }, [])

return <>
<div className="row g-4 container mx-auto">
<h2 className=' text-main mt-5 pt-5 text-center'>Categoory</h2>
{isLoading?<div className='col-12 text-center my-5 py-5'><i className='fa fa-spin  fa-circle-notch  fa-10x  text-main'></i></div>:cate.map((ele)=><div className='col-md-4' key={ele._id}>
  <Link to={'/productsByCategories/'+ele._id}><div className='rounded-circle overflow-hidden'>
      <img src={ele.image} height={350}className='w-100'alt=''/>
      <h3 className='h6 text-center py-2 text-main'>{ele.name}</h3>
      </div>
      </Link>
    </div>)}</div>
  </>
}
